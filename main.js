const express = require('express');
const bodyParser = require('body-parser');
const VkBot = require('node-vk-bot-api');
const mongoose = require("mongoose");
const REGISRATION_BUTTONS = require("./src/keyboards/registration");
const {createUser} = require("./src/repository/UserRepository");
const {createResult} = require("./src/repository/ResultRepository");
const Scene = require('node-vk-bot-api/lib/scene')
const Stage = require('node-vk-bot-api/lib/stage')
const YES_NO_BUTTONS = require("./src/keyboards/yes-no");
const AGREEMENT_BUTTONS = require("./src/keyboards/agreement");
const Session = require('node-vk-bot-api/lib/session');
const {formatDate} = require("./src/external");

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
    // const config = require('./src/config.json');
    bot = new VkBot({
        token: 'f620ea2962ed9f96d77233eb5873a345f3810851d3fb42b169b891b86f3eb2ea6658f6b0a82ed7f5483e7',
        confirmation: '4087ffd8',
    });
    // bot = new VkBot({
    //     token: config.VK_TOKEN,
    //     confirmation: config.CONFIRM_KEY
    // });

    // mongoose.connect(process.env.DB_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }).then(() => console.log('MongoDB was connected'))
    //     .catch((err) => console.log(err));

    mongoose.connect('mongodb+srv://dazzle:Hbjifvfyrbyu18@antidepression.dkdvm.mongodb.net/bot-antidepression-db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB was connected'))
        .catch((err) => console.log(err));
}
;

const app = express();

bot.command('start', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, REGISRATION_BUTTONS);
    userId = msg.user_id;
    createResult(userId);
});

var age, eduLevel, maritalStatus, socialStatus, approval;
var sex, userId, exhaustion = 0, depersonalization = 0, reduction = 0;

const scene = new Scene('registration',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали пункт меню регистрации.' + '\n' +
            'Последовательно ответьте на все вопросы, вводя запрашиваемую информацию.' +
            'Укажите свой пол: ' + '\n' +
            'Если вы мужчина – введите М' + '\n' +
            'Если вы женщина – введите Ж');
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите свой возраст: ');
        if (ctx.message.text == 'M' || ctx.message.text == 'М') {
            sex = 'male';
        }
        if (ctx.message.text == 'Ж') {
            sex = 'female';
        }
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите уровень своего образования: ' + '\n' +
            'С – Среднее образование (окончена школа)' + '\n' + 'СС – Среднее Специальное (окончен колледж)' + '\n' +
            'В – Высшее образование' + '\n' + 'М – Магистратура' + '\n' + 'А – Аспирантура' + '\n' +
            'К – Кандидат наук' + '\n' + 'Д – Доктор наук');
        age = parseInt(ctx.message.text);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите семейное положение: ');
        eduLevel = ctx.message.text;
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите социальный статус: ');
        maritalStatus = ctx.message.text;
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Информированное добровольное согласие клиента г. Тольятти' + '\n' +
            'Настоящее добровольное согласие составлено в соответствии со статьей 20. ' +
            'Федеральный закон от 21.11.2011 N 323-ФЗ (ред. от 29.05.2019) ' +
            'Об основах охраны здоровья граждан в Российской Федерации. ' +
            'И соответствует Этическому кодексу психолога принят “14” ' +
            'февраля 2012 года V съездом Российского психологического общества.' +
            'На страничке БОТ-психолога под названием Doctor Calm, которая размещена в социальной сети ' +
            'ВКонтакте, проводится анонимная психологическая диагностика, без раскрытия личных данных и ' +
            'идентичности пользователя соответствующей программы. ' + '\n' +
            '1. Настоящим я доверяю провести психологическую диагностику. ' + '\n' +
            '2. Содержание указанных выше психологических действий, связанный с ними риск и последствия мне известны. ' +
            'Я хорошо понял(а) все разъяснения.' + '\n' +
            '3. Мне известно, что 100% гарантии хороших результатов психокоррекции в целом дано быть не может.' + '\n' +
            '4. Я согласен на исследование данных моего исследования в научных целях.' + '\n' +
            'Содержание настоящего документа мною прочитано, свое согласие с его содержанием я удостоверяю.' + '\n' +
            formatDate() + '\n' +
            'Если согласны на проведение диагностики – введите \'Да\', если нет – введите \'Нет\'', null, YES_NO_BUTTONS);
        socialStatus = ctx.message.text;
    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.text == 'Да' || ctx.message.text == 'да') {
            approval = true;
        } else approval = false;
        createUser(userId, sex, age, eduLevel, maritalStatus, socialStatus, approval);
        ctx.reply('Спасибо за регистрацию!', null, AGREEMENT_BUTTONS);
        sex = 0, age = 0;
    }
);

const session = new Session();

const stage = new Stage(scene);

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('Регистрация', ({scene: {enter}}) => {
    enter('registration')
});

bot.startPolling()

app.use(bodyParser.json());

app.post('/', bot.webhookCallback);

app.listen(3000, () => console.log('Started!'));