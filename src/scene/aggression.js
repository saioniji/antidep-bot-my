const Scene = require('node-vk-bot-api/lib/scene');
const YES_NO_BUTTONS = require("../keyboards/yes-no");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {updateResult} = require("../repository/ResultRepository");
const {checkChoice} = require("../external");
const {determineSanity} = require("../external");
const {checkAggression} = require("../external");

let verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0, total = 0;

const aggression = new Scene('aggression',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики агрессивного поведения.' + '\n' +
            'В тесте 40 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
            'Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Во время спора я часто повышаю голос.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Если меня кто-то раздражает, я могу сказать ему все, что о нем думаю.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Если мне необходимо будет прибегнуть к физической силе ' +
            'для защиты своих прав, я, не раздумывая, сделаю это.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Когда я встречаю неприятного мне человека, ' +
            'я могу позволить себе незаметно ущипнуть или толкнуть его.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Увлекшись спором с другим человеком, я могу ' +
            'стукнуть кулаком по столу, чтобы привлечь к себе внимание или доказать свою правоту.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Я постоянно чувствую, что другие не уважают мои права.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Вспоминая прошлое, порой мне бывает обидно за себя.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Хотя я и не подаю вида, иногда меня гложет зависть.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Если я не одобряю поведение своих знакомых, то я прямо ' +
            'говорю им об этом.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В сильном гневе я употребляю крепкие выражения, сквернословлю.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Если кто-нибудь поднимет на меня руку, я постараюсь ' +
            'ударить его первым.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Я бываю настолько взбешен, что швыряю разные предметы.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'У меня часто возникает потребность переставить ' +
            'в квартире мебель или полностью сменить ее.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'В общении с людьми я часто чувствую себя «пороховой бочкой», ' +
            'которая постоянно готова взорваться.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Порой у меня появляется желание зло пошутить над другим человеком.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Когда я сердит, то обычно мрачнею.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'В разговоре с человеком я стараюсь его внимательно выслушать, не перебивая.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'В молодости у меня часто «чесались кулаки» и я всегда был готов пустить их в ход.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Если я знаю, что человек намеренно меня толкнул, то дело может дойти до драки.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Творческий беспорядок на моем рабочем столе позволяет мне эффективно работать.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Я помню, что бывал настолько сердитым, что хватал все, что попадало под руку, и ломал.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'Иногда люди раздражают меня только одним своим присутствием.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Я часто удивляюсь, какие скрытые причины заставляют другого человека ' +
            'делать мне что-нибудь хорошее.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Если мне нанесут обиду, то у меня пропадет желание разговаривать ' +
            'с кем бы, то ни было.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №25:' + '\n' + 'Иногда я намеренно говорю гадости о человеке, которого не люблю.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №26:' + '\n' + 'Когда я взбешен, я кричу самое злобное ругательство.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №27:' + '\n' + 'В детстве я избегал драться.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №28:' + '\n' + 'Я знаю, по какой причине и когда можно кого-нибудь ударить.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №29:' + '\n' + 'Когда я взбешен, то могу хлопнуть дверью.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №30:' + '\n' + 'Мне кажется, что окружающие люди меня не любят.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №31:' + '\n' + 'Я постоянно делюсь с другими своими чувствами и переживаниями.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №32:' + '\n' + 'Очень часто своими словами и действиями я сам себе приношу вред.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №33:' + '\n' + 'Когда люди орут на меня, я отвечаю тем же.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №34:' + '\n' + 'Если кто-нибудь ударит меня первым, я в ответ ударю его.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №35:' + '\n' + 'Меня раздражает, когда предметы лежат не на своем месте.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №36:' + '\n' + 'Если мне не удается починить сломавшийся или порвавшийся ' +
            'предмет, то я в гневе ломаю или рву его окончательно.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №37:' + '\n' + 'Другие люди мне всегда кажутся преуспевающими.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №38:' + '\n' + 'Когда я думаю об очень неприятном мне человеке, я могу прийти ' +
            'в возбуждение от желания причинить ему зло.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №39:' + '\n' + 'Иногда мне кажется, что судьба сыграла со мной злую шутку.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №40:' + '\n' + 'Если кто-нибудь обращается со мной не так, как следует, ' +
            'я очень расстраиваюсь по этому поводу.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            selfAgg += 1;
        }

        var total = verbalAgg + physicalAgg + objectiveAgg + emotionalAgg + selfAgg;
        var choice = checkAggression(total);
        var sanity = determineSanity('aggression', choice);
        updateResult(ctx.message.user_id, 'aggression', total, sanity);
        ctx.reply('Общий уровень агрессии: ' + total + '\n' +
        checkChoice(9, choice) + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0,
        total = 0;
    }
);

module.exports = aggression