const BURNOUT_BUTTONS = require("../keyboards/burnout");
const Scene = require('node-vk-bot-api/lib/scene');
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {updateBurnout} = require("../repository/ResultRepository");
const {determineBurnoutResponse} = require("../external");
const {checkDepersonalization} = require("../external");
const {checkExhaustion} = require("../external");
const {checkChoice} = require("../external");
const {checkReduction} = require("../external");

let exhaustion = 0;
let depersonalization = 0;
let reduction = 0;

const burnout = new Scene('burnout',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест на проверку признаков профессионального выгорания' + '\n' +
        'В тесте 22 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
        'Введите ответ, соответствующий частоте ваших мыслей и переживаний:' + '\n' +
            '0 - никогда' + '\n' +
            '1 - очень редко' + '\n' +
            '2 - редко' + '\n' +
            '3 - иногда' + '\n' +
            '4 - часто' + '\n' +
            '5 - очень часто' + '\n' +
            '6 - каждый день' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Я чувствую себя эмоционально опустошенным.', null, BURNOUT_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'После работы я чувствую себя, как «выжатый лимон».', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Утром я чувствую усталость и нежелание идти на работу.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Я хорошо понимаю, что чувствуют мои ' +
            'подчинённые и коллеги, и стараюсь учитывать это в интересах дела.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Я чувствую, что общаюсь с некоторыми ' +
            'подчинёнными и коллегами как с предметами (без теплоты и расположения к ним).', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'После работы на некоторое время хочется уединиться от всех и всего.', null, BURNOUT_BUTTONS
        );
        depersonalization += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Я умею находить правильное решение ' +
            'в конфликтных ситуациях, возникающих при общении с коллегами.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Я чувствую угнетённость и апатию.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Я уверен, что моя работа нужна людям.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В последнее время я стал более «чёрствым» ' +
            'по отношению к тем, с кем работаю.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Я замечаю, что моя работа ожесточает меня.', null, BURNOUT_BUTTONS
        );
        depersonalization += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'У меня много планов на будущее, и я верю в их осуществление.', null, BURNOUT_BUTTONS
        );
        depersonalization += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Моя работа всё больше меня разочаровывает.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Мне кажется, что я слишком много работаю.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Бывает, что мне действительно безразлично то, ' +
            'что происходит с некоторыми моими подчиненными и коллегами.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Мне хочется уединиться и отдохнуть от всего и всех.', null, BURNOUT_BUTTONS
        );
        depersonalization += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Я легко могу создать атмосферу доброжелательности и ' +
            'сотрудничества в коллективе.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Во время работы я чувствую приятное оживление.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Благодаря своей работе я уже сделал в жизни много ' +
            'действительно ценного.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Я чувствую равнодушие и потерю интереса ко многому, ' +
            'что радовало меня в моей работе.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'На работе я спокойно справляюсь с эмоциональными проблемами.', null, BURNOUT_BUTTONS
        );
        exhaustion += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'В последнее время мне кажется, что коллеги и подчинённые ' +
            'всё чаще перекладывают на меня груз своих проблем и обязанностей.', null, BURNOUT_BUTTONS
        );
        reduction += determineBurnoutResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        depersonalization += determineBurnoutResponse(ctx.message.body);
        var total_burnout = exhaustion + depersonalization + reduction;
        ctx.reply('Эмоциональное истощение:' + '\n' + checkChoice(6, checkExhaustion(exhaustion)) + '\n' +
        'Деперсонализация:' + '\n' + checkChoice(7, checkDepersonalization(depersonalization)) + '\n' +
        'Редукция личных достижений:' + '\n' + checkChoice(8, checkReduction(reduction)) + '\n' +
        //reply('Общая тяжесть выгорания: ' + total_burnout);
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        updateBurnout(ctx.message.user_id, exhaustion, reduction, depersonalization, total_burnout);
        exhaustion = 0;
        depersonalization = 0;
        reduction = 0;
    }
);

module.exports = burnout