const INSIDE_ANXIETY_BUTTONS = require("../keyboards/insideAnxiety");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {checkChoice} = require("../external");
const {updateResult} = require("../repository/ResultRepository");
const {determineSanity} = require("../external");
const {checkAnxiety} = require("../external");
const {determineAnxietyResponse} = require("../external");
const Scene = require('node-vk-bot-api/lib/scene');

let counter = 0, counter_direct = 0, counter_reverse = 0;

const anxienty1 = new Scene('anxiety1',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для анализа ситуативной тревожности' + '\n' +
        'В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
        'В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Нет, это не так' + '\n' +
            '2 – Пожалуй так' + '\n' +
            '3 – Верно' + '\n' +
            '4 - Совершенно верно' + '\n' +
            '\n' +
            'Как Вы себя чувствуете в данный момент?' + '\n' +
            'Вопрос №1:' + '\n' + 'Я спокоен', null, INSIDE_ANXIETY_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Мне ничто не угрожает', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Я нахожусь в напряжении', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Я испытываю сожаление', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Я чувствую себя свободно', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Я расстроен', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Меня волнуют возможные неудачи', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Я чувствую себя отдохнувшим', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Я встревожен', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Я испытываю чувство внутреннего удовлетворения', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Я уверен в себе', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Я нервничаю', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Я не нахожу себе места', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Я взвинчен', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Я не чувствую скованности', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Я доволен', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Я озабочен', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Я слишком возбужден и мне не по себе', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Мне радостно', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Мне приятно', null, INSIDE_ANXIETY_BUTTONS
        );
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        counter_reverse += determineAnxietyResponse(ctx.message.body);
        var result = counter_direct - counter_reverse + 50;
        var choice = checkAnxiety(result);
        var sanity = determineSanity('anxiety1', choice);
        let checkedRes = checkChoice(2, choice)
        updateResult(ctx.message.user_id, 'anxiety1', result, sanity);
        ctx.reply('Вы набрали: ' + result + "\n" + checkedRes + "\n" +
            'Рекомендуем к просмотру видео "Прогрессивная мышечная релаксация по Э. Джекобсону": video-192832710_456239034' +
            "\n" +
            'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter_direct = 0;
        counter_reverse = 0;
        counter = 0;
    }
);

module.exports = anxienty1