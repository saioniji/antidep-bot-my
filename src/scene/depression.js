const Scene = require('node-vk-bot-api/lib/scene');
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const DEPRESSION_BUTTONS = require("../keyboards/depression");
const {checkChoice} = require("../external");
const {determineDepressionResponse} = require("../external");
const {reverseScore} = require("../external");
const {checkDepression} = require("../external");
const {determineSanity} = require("../external");
const {updateResult} = require("../repository/ResultRepository");

let counter = 0

const depression = new Scene('depression',
    (ctx) => {
        ctx.scene.next();
        //TODO
        ctx.reply('Вы выбрали тест для определения уровня депрессии' + '\n' +
        'В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
        'В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Никогда или изредка' + '\n' +
            '2 – Иногда' + '\n' +
            '3 – Часто' + '\n' +
            '4 - Почти всегда или постоянно' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Я чувствую подавленность', null, DEPRESSION_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Утром я чувствую себя лучше всего.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'У меня бывают периоды плача или близости к слезам.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'У меня плохой ночной сон.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Аппетит у меня не хуже обычного.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Мне приятно смотреть на привлекательных девушек/парней, разговаривать с ними, находиться рядом.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Я замечаю, что теряю вес.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Меня беспокоят запоры.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Сердце бьется быстрее, чем обычно.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Я устаю без всяких причин.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Я мыслю так же ясно, как всегда.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Мне легко делать то, что я умею.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Чувствую беспокойство и не могу усидеть на месте.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'У меня есть надежды на будущее.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Я более раздражителен, чем обычно.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Мне легко принимать решения.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Я чувствую, что полезен и необходим.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Я живу достаточно полной жизнью.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Я чувствую, что другим людям станет лучше, если я умру.', null, DEPRESSION_BUTTONS);
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Меня до сих пор радует то, что радовало всегда.', null, DEPRESSION_BUTTONS);
        counter += determineDepressionResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        counter += reverseScore(determineDepressionResponse(ctx.message.body));
        var choice = checkDepression(counter);
        var sanity = determineSanity('depression', choice);
        let checkedChoice = checkChoice(1, choice);
        ctx.reply('Вы набрали: ' + counter + " " + checkedChoice +
            "\n" +
            'Рекомендуем к просмотру видео "Прогрессивная мышечная релаксация по Э. Джекобсону": video-192832710_456239034' +
            "\n" +
            'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        updateResult(ctx.message.user_id, 'depression', counter, sanity);
        counter = 0;
    }
);

module.exports = depression