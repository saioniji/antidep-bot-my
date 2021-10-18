const Scene = require('node-vk-bot-api/lib/scene');
const YES_NO_BUTTONS = require("../keyboards/yes-no");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {updateEysenck} = require("../repository/ResultRepository");
const {checkTemperType} = require("../external");
const {checkEyseckCircle} = require("../external");
const {checkChoice} = require("../external");

let neuroticism = 0, lie = 0, introversion = 0;

const eysenck = new Scene('eysenck',
    (ctx) => {
        ctx.scene.next();
            ctx.reply('Вы выбрали тест Айзенка' + '\n' +
            'В тесте 57 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
            'Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Тебе нравится находиться в шумной и веселой компании?', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Часто ли ты нуждаешься в помощи других ребят?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Когда тебя о чем-либо спрашивают, ты чаще всего быстро находишь ответ?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Бываешь ли ты очень сердитым, раздражительным?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Часто ли у тебя меняется настроение?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Бывает ли такое, что тебе иногда больше нравится быть одному, ' +
            'чем встречаться с другими ребятами?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Тебе иногда мешают уснуть разные мысли?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Ты всегда выполняешь все сразу, так, как тебе говорят?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Любишь ли ты подшучивать над кем-нибудь?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Было ли когда-нибудь так, что тебе становится грустно без особой причины?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Можешь ли ты сказать о себе, что ты вообще веселый человек?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Ты когда-нибудь нарушал правила поведения в школе?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Бывает ли так, что иногда тебя почти все раздражает?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Тебе нравилась бы такая работа, где все надо делать очень быстро?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Было ли когда-нибудь так, что тебе доверили тайну, ' +
            'а ты по каким-либо причинам не смог ее сохранить?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Ты можешь без особого труда развеселить компанию скучающих ребят?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Бывает ли так, что твое сердце начинает сильно биться, ' +
            'даже если ты почти не волнуешься?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Если ты хочешь познакомиться с другим мальчиком или девочкой, ' +
            'то ты всегда первым начинаешь разговор?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Ты когда-нибудь говорил неправду?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Ты очень расстраиваешься, когда тебя ругают за что-нибудь?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Тебе нравится шутить и рассказывать веселые истории своим друзьям?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'Ты иногда чувствуешь себя усталым без особой причины?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Ты всегда выполняешь то, что тебе говорят старшие?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Ты, как правило, всегда бываешь всем доволен?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №25:' + '\n' + 'Можешь ли ты сказать, что ты чуть-чуть более обидчивый человек, чем другие?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №26:' + '\n' + 'Тебе всегда нравится играть с другими ребятами?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №27:' + '\n' + 'Было ли когда-нибудь так, что тебя попросили дома помочь по хозяйству, ' +
            'а ты по какой-то причине не смог этого сделать?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №28:' + '\n' + 'Бывает ли, что у тебя без особой причины кружится голова?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №29:' + '\n' + 'У тебя временами бывает такое чувство, что тебе все надоело?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №30:' + '\n' + 'Ты любишь иногда похвастать?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №31:' + '\n' + 'Бывает ли такое, что, находясь в обществе других ребят, ' +
            'ты чаще всего молчишь?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №32:' + '\n' + 'Ты обычно быстро принимаешь решения?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №33:' + '\n' + 'Ты шутишь иногда в классе, особенно если там нет учителя?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №34:' + '\n' + 'Тебе временами снятся страшные сны?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №35:' + '\n' + 'Можешь ли ты веселиться, не сдерживая себя, в компании других ребят?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №36:' + '\n' + 'Бывает ли, что ты так волнуешься, что не можешь усидеть на месте?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №37:' + '\n' + 'Тебя вообще легко обидеть или огорчить?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №38:' + '\n' + 'Случалось ли тебе говорить о ком-либо плохо?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №39:' + '\n' + 'Можешь ли ты сказать о себе, что ты беззаботный человек?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №40:' + '\n' + 'Если ты оказываешься в глупом положении, то ты потом долго расстраиваешься?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №41:' + '\n' + 'Ты всегда ешь все, что тебе дают?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },//
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №42:' + '\n' + 'Когда тебя о чем-то просят, тебе всегда трудно отказывать?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №43:' + '\n' + 'Ты любишь часто ходить в гости?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №44:' + '\n' + 'Был ли хотя бы раз в твоей жизни случай, когда тебе было очень плохо?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №45:' + '\n' + 'Бывало ли такое, чтобы ты когда-нибудь грубо разговаривал с родителями?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №46:' + '\n' + 'Как ты думаешь, тебя считают веселым человеком?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            lie += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №47:' + '\n' + 'Ты часто отвлекаешься, когда делаешь уроки?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №48:' + '\n' + 'Бывает ли такое, что тебе не хочется принимать участие в общем веселье?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №49:' + '\n' + 'Говоришь ли ты иногда первое, что приходит в голову?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №50:' + '\n' + 'Ты почти всегда уверен, что справишься с делом, за которое взялся?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №51:' + '\n' + 'Бывает, что ты чувствуешь себя одиноким?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №52:' + '\n' + 'Ты обычно стесняешься заговаривать первым с незнакомыми людьми?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №53:' + '\n' + 'Ты часто спохватываешься, когда уже поздно?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №54:' + '\n' + 'Когда кто-либо кричит на тебя, ты тоже кричишь в ответ?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №55:' + '\n' + 'Бывает ли, что ты становишься очень веселым или печальным, ' +
            'без особой причины?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            introversion += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №56:' + '\n' + 'Тебе иногда кажется, что трудно получить настоящее ' +
            'удовольствие от компании ребят?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            neuroticism += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №57:' + '\n' + 'На тебя влияет погода?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            introversion += 1;
        }
    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            neuroticism += 1;
        }

        var choice = checkEyseckCircle(introversion, neuroticism);
        var type = checkTemperType(choice);
        updateEysenck(ctx.message.user_id, type, neuroticism, lie);
        ctx.reply('Ваш результат:' + '\n' +
            'Интроверсия: ' + introversion + '\n' +
            'Стабильность: ' + neuroticism + '\n' +
            'Достоверность: ' + lie + '\n' +
        'Круг Айзенка:', 'photo-192832710_457239178' + '\n' +
        checkChoice(12, choice) + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        introversion = 0; neuroticism = 0; lie = 0;
    }
);

module.exports = eysenck