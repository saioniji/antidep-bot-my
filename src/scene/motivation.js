const Scene = require('node-vk-bot-api/lib/scene');
const YES_NO_BUTTONS = require("../keyboards/yes-no");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {checkChoice} = require("../external");
const {updateResult} = require("../repository/ResultRepository");
const {determineSanity} = require("../external");
const {checkMotiv} = require("../external");

let counter = 0;

const motivation = new Scene('motivation',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики вашей личности на мотивацию к успеху'  + '\n' +
        'В тесте 41 вопрос. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов'  + '\n' +
        'Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны'  + '\n' +
            '\n' + 'Вопрос №1:' + '\n' + 'Когда имеется выбор между двумя вариантами, ' +
            'его лучше сделать быстрее, чем отложить на определенное время.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Я легко раздражаюсь, когда замечаю, ' +
            'что не могу выполнить задание на все 100%.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Когда я работаю, это выглядит так, ' +
            'будто я все ставлю на карту.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Когда возникает проблемная ситуация, ' +
            'я чаще всего принимаю решение одним из последних.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Когда у меня 2 дня подряд нет дела, я теряю покой.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'В некоторые дни, мои успехи ниже средних.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'По отношению к себе я более строг, чем по отношению к другим.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Я более доброжелателен, чем другие.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Когда я отказываюсь от трудного задания, ' +
            'я потом сурово осуждаю себя, так как знаю, что в нем я бы добился успеха.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В процессе работы я нуждаюсь в небольших паузах для отдыха.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Усердие – это не основная моя черта.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Мои достижения в труде не всегда одинаковы.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Меня больше привлекает другая работа, ' +
            'чем та, которой я занят.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Порицание стимулирует меня сильнее, чем похвала.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Я знаю, что мои коллеги считают меня полезным для дела человеком.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Препятствия делают мои решения более твердыми.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'У меня легко вызвать чувство тщеславия.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Когда я работаю без вдохновения, это обычно заметно.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'При выполнении работы я не рассчитываю на помощь других.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Иногда я откладываю то, что могу сделать прямо сейчас.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Нужно полагаться только на самого себя.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'В жизни мало вещей, более важных, чем деньги.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Всегда, когда мне предстоит выполнить ' +
            'важное задание, я ни о чем другом не думаю.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Я менее тщеславен, чем многие другие.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №25:' + '\n' + 'В конце отпуска я обычно радуюсь, что скоро выйду на работу.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №26:' + '\n' + 'Когда я расположен к работе, ' +
            'я делаю ее лучше и квалифицированней, чем другие.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №27:' + '\n' + 'Мне проще и легче общаться с людьми, ' +
            'которые могут упорно работать.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №28:' + '\n' + 'Когда у меня нет дел, я чувствую, что мне не по себе.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №29:' + '\n' + 'Мне приходится выполнять ответственную ' +
            'работу чаще, чем другим.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №30:' + '\n' + 'Когда мне приходится принимать решение, ' +
            'я стараюсь делать это как можно лучше.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №31:' + '\n' + 'Мои друзья иногда считают меня ленивым.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №32:' + '\n' + 'Мои успехи в какой-то мере зависят от моих коллег.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №33:' + '\n' + 'Бессмысленно противодействовать воле руководителя.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №34:' + '\n' + 'Иногда не знаешь, какую работу придется выполнять.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №35:' + '\n' + 'Когда что-то не ладится, я нетерпелив.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №36:' + '\n' + 'Я обычно обращаю мало внимания на свои достижения.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №37:' + '\n' + 'Когда я работаю вместе с другими, ' +
            'моя работа дает большие результаты, чем работы других.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №38:' + '\n' + 'Многое, за что я берусь, я не довожу до конца.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №39:' + '\n' + 'Я завидую людям, которые не загружены работой.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №40:' + '\n' + 'Я не завидую тем, кто стремится к власти и положению.', null, YES_NO_BUTTONS);
        if (ctx.message.body === 'Нет' || ctx.message.body === 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №41:' + '\n' + 'Когда я уверен, что стою на правильном пути, ' +
            'для доказательства своей правоты я иду вплоть до крайних мер.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body === 'Да' || ctx.message.body === 'да') {
            counter += 1;
        }

        var choice = checkMotiv(counter);
        var sanity = determineSanity('motivation', choice);
        updateResult(ctx.message.user_id, 'motivation', counter, sanity);
        ctx.reply('Вы набрали: ' + counter + '\n' +
        checkChoice(5, choice) + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

module.exports = motivation