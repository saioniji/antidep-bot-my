const INSIDE_ANXIETY_BUTTONS = require("../keyboards/insideAnxiety");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {checkChoice} = require("../external");
const {updateResult} = require("../repository/ResultRepository");
const {determineSanity} = require("../external");
const {checkAnxiety} = require("../external");
const {determineAnxietyResponse} = require("../external");
const Scene = require('node-vk-bot-api/lib/scene');

let counter = 0, counter_direct = 0, counter_reverse = 0;

const anxienty2 = new Scene('anxiety2',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для анализа личностной тревожности' + '\n' +
            'В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов.' + '\n' +
            'В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Нет, это не так' + '\n' +
            '2 – Пожалуй так' + '\n' +
            '3 – Верно' + '\n' +
            '4 - Совершенно верно' + '\n' +
            '\n' +
            'Как Вы себя обычно чувствуете?' + '\n' +
            'Вопрос №1:' + '\n' + 'Я испытываю удовольствие', null, INSIDE_ANXIETY_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Я обычно быстро устаю', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Я легко могу заплакать', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Я хотел бы быть таким же счастливым, как и другие', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Нередко я проигрываю из-за того, ' +
            'что недостаточно быстро принимаю решения', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Обычно я чувствую себя бодрым', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Я спокоен, хладнокровен и собран', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Ожидаемые трудности обычно очень тревожат меня', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Я слишком переживаю из-за пустяков', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Я вполне счастлив', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Я принимаю все слишком близко к сердцу', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Мне не хватает уверенности в себе', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Обычно я чувствую себя в безопасности', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Я стараюсь избегать критических ситуаций ' +
            'и трудностей', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'У меня бывает хандра', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Я доволен', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Всякие пустяки отвлекают и волнуют меня', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Я так сильно переживаю свои разочарования, ' +
            'что потом долго не могу о них забыть', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Я уравновешенный человек', null, INSIDE_ANXIETY_BUTTONS);
        counter_direct += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Меня охватывает беспокойство, когда я ' +
            'думаю о своих делах и заботах', null, INSIDE_ANXIETY_BUTTONS);
        counter_reverse += determineAnxietyResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        counter_direct += determineAnxietyResponse(ctx.message.body);
        var result = counter_direct - counter_reverse + 35;
        var choice = checkAnxiety(result);
        var sanity = determineSanity('anxiety2', choice);
        updateResult(ctx.message.user_id, 'anxiety2', result, sanity);
        let recomend = checkChoice(3, choice);
        ctx.reply('Вы набрали: ' + result +
            "\n" +
            recomend +
            "\n" +
            'Рекомендуем к просмотру видео "Прогрессивная мышечная релаксация по Э. Джекобсону": video-192832710_456239034' +
            "\n" + 'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter_direct = 0;
        counter_reverse = 0;
        counter = 0;
    }
);

module.exports = anxienty2