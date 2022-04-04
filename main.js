const express = require('express');
const bodyParser = require('body-parser');
const VkBot = require('node-vk-bot-api');
const mongoose = require("mongoose");
const {createResult} = require("./src/repository/ResultRepository");
const Stage = require('node-vk-bot-api/lib/stage')
const Session = require('node-vk-bot-api/lib/session');
const TEST_BUTTONS = require("./src/keyboards/test");
const ADMIN_BUTTONS = require("./src/keyboards/admin");
const SHRINKS_BUTTONS = require("./src/keyboards/shrinks");
const DEFECTS_BUTTONS = require("./src/keyboards/defects");
const STAFF_BUTTONS = require("./src/keyboards/staff");
const ANXIETY_BUTTONS = require("./src/keyboards/anxienty");
const DEFAULT_BUTTONS = require("./src/keyboards/default");
const newAnketa = require("./src/scene/createanketa");
const registration = require("./src/scene/registration");
const contacts = require("./src/contacts");
const depression = require("./src/scene/depression");
const anxienty1 = require("./src/scene/anxienty1");
const anxienty2 = require("./src/scene/anxienty2");
const stress = require("./src/scene/stress");
const motivation = require("./src/scene/motivation");
const burnout = require("./src/scene/burnout");
const inclination = require("./src/scene/inclination");
const aggression = require("./src/scene/aggression");
const lifestyle = require("./src/scene/lifestyle");
const temper = require("./src/scene/temper");
const eysenck = require("./src/scene/eysenck");
const feedback = require("./src/scene/feedback");
let feedback_records = [];

let bot;
if (process.env.VK_TOKEN) {
    bot = new VkBot({
        token: process.env.VK_TOKEN,
        confirmation: process.env.CONFIRM_KEY
    });

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB was connected'))
        .catch((err) => console.log(err));

} else {
    const config = require('./src/config.json');
    bot = new VkBot({
        token: config.VK_TOKEN,
        confirmation: config.CONFIRM_KEY
    });

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB was connected'))
        .catch((err) => console.log(err));

}

const app = express();

const session = new Session();

const stage = new Stage(
    registration,
    newAnketa,
    depression,
    anxienty1,
    anxienty2,
    stress,
    motivation,
    burnout,
    inclination,
    aggression,
    lifestyle,
    temper,
    eysenck,
    feedback,
);

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('Регистрация', (ctx) => ctx.scene.enter('registration'));
bot.command('Анкета', (ctx) => ctx.scene.enter('newAnketa'));
bot.command('Депрессия', (ctx) => ctx.scene.enter('depression'));
bot.command('Реактивная', (ctx) => ctx.scene.enter('anxiety1'));
bot.command('Личностная', (ctx) => ctx.scene.enter('anxiety2'));
bot.command('Стресс', (ctx) => ctx.scene.enter('stress'));
bot.command('Мотивация', (ctx) => ctx.scene.enter('motivation'));
bot.command('Выгорание', (ctx) => ctx.scene.enter('burnout'));
bot.command('Склонность', (ctx) => ctx.scene.enter('inclination'));
bot.command('Агрессия', (ctx) => ctx.scene.enter('aggression'));
bot.command('Образ жизни', (ctx) => ctx.scene.enter('lifestyle'));
bot.command('Темперамент', (ctx) => ctx.scene.enter('temper'));
bot.command('Тест Айзенка', (ctx) => ctx.scene.enter('eysenck'));
bot.command('feedback', (ctx) => ctx.scene.enter('feedback'));
bot.command('Feedback', (ctx) => ctx.scene.enter('feedback'));

bot.event('group_join', (msg) => {
    msg.reply('Спасибо, что стали пользователем нашего бота. Мы постараемся вам помочь!');
});

bot.command(['help', 'Help'], (ctx) => {
    bot.sendMessage(ctx.message.user_id, 'Список доступных команд: ' + '\n' +
        'start – начать взаимодействие с ботом' + '\n' +
        'feedback – оставить пожелание для модификации');
});

bot.command(['Помощь', 'помощь'], (ctx) => {
    bot.sendMessage(ctx.message.user_id, 'Список доступных команд: ' + '\n' +
        'start – начать взаимодействие с ботом' + '\n' +
        'feedback – оставить пожелание для модификации');
});

bot.command('Отмена', (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
});

bot.command('Главное меню', (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
});

bot.command(['Start', 'start', 'старт', 'Старт'], (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
    createResult(ctx.message.user_id);
});

bot.command('admin', (ctx) => {
    ctx.reply('Приветствуем вас в админ панеле:', null, ADMIN_BUTTONS);
});

bot.command('Психологи', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, SHRINKS_BUTTONS);
});

bot.command('Дефектологи', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, DEFECTS_BUTTONS);
});

bot.command(['Другой тест', 'Тест', 'test', 'Test', 'тестирование', 'Тестирование', 'Пройти тест'], (ctx) => {
    ctx.reply('Выберите тест: ', null, TEST_BUTTONS);
});


bot.command('Получить помощь', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, STAFF_BUTTONS);
});

bot.command('Тревожность', (ctx) => {
    ctx.reply('Сделайте более конкретный выбор:' + '\n' +
        'Реактивная тревожность – тревожность, как состояние' + '\n' +
        'Личностная тревожность – тревожность, как свойство личности', null, ANXIETY_BUTTONS);
});

bot.command('Пожелания', (ctx) => {
    if (feedback_records === undefined || feedback_records.length === 0) {
        ctx.reply('Список пожеланий пуст ...');
    } else ctx.reply(feedback_records);
    // тут нужно будет вытащить все содержимое коллекции feedback из mongodb
});

bot.command('Татьяна Чапала', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[0][0]);
});
bot.command('Мария Илич', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[1][0]);
});
bot.command('Юлия Петрова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[2][0]);
});
bot.command('Оксана Зотова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[3][0]);
});
bot.command('Алина Гельметдинова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[4][0]);
});

bot.command('Юлия Галимова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[5][0]);
});

//bot.startPolling() //Для локального запуска

app.use(bodyParser.json());

app.post('/', bot.webhookCallback);

app.listen(process.env.PORT || 5000, () => console.log('Server is running ... '));
setInterval(function () { app.get('https://git.heroku.com/bor-antidep.git'); }, 300000);