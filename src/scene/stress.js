const SEX_BUTTONS = require("../keyboards/sex");
const STRESS_BUTTONS = require("../keyboards/stress");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {updateResult} = require("../repository/ResultRepository");
const {checkChoice} = require("../external");
const {determineSanity} = require("../external");
const {checkStress} = require("../external");
const {determineStressResponse} = require("../external");
const {determineSex} = require("../external");
const Scene = require('node-vk-bot-api/lib/scene');

let sex; let counter = 0;

const stress = new Scene('stress',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест на проверку уровня психологического стресса' + '\n' +
        'В тесте 7 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
        'В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Да, согласен' + '\n' +
            '2 – Скорее, согласен' + '\n' +
            '3 – Скорее, не согласен' + '\n' +
            '4 - Нет, не согласен' + '\n' +
            '\n' +
        'Перед началом тестирования, укажите свой пол:', null, SEX_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №1:' + '\n' + 'Пожалуй, я человек нервный', null, STRESS_BUTTONS);
        sex = determineSex(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Я очень беспокоюсь о своей работе', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Я часто ощущаю нервное напряжение', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Моя повседневная деятельность вызывает большое напряжение', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Общаясь с людьми, я часто ощущаю нервное напряжение', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'К концу дня я совершенно истощен физически и психически', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'В моей семье часто возникают напряженные отношения', null, STRESS_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        counter += determineStressResponse(ctx.message.body);
        var result = (counter / 7).toFixed(2);
        var choice = checkStress(sex, result);
        var sanity = determineSanity('stress', choice);
        updateResult(ctx.message.user_id, 'stress', result, sanity);
        ctx.reply('Вы набрали: ' + result + '\n' +
        checkChoice(4, choice) + '\n' +
            '\n' +
        'Рекомендуем к просмотру видео "Прогрессивная мышечная релаксация по Э. Джекобсону":', 'video-192832710_456239034' + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

module.exports = stress