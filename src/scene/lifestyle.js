const Scene = require('node-vk-bot-api/lib/scene');
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const YES_NO_BUTTONS = require("../keyboards/yes-no");
const {determineSanity} = require("../external");
const {checkChoice} = require("../external");
const {checkLifeStyle} = require("../external");
const {updateResult} = require("../repository/ResultRepository");

let counter = 0;

const lifestyle = new Scene('lifestyle',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики вашего образа жизни.'  + '\n' +
        'В тесте 25 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов.'  + '\n' +
        'Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны'  + '\n' +
        '\n' +
        'Вопрос №1:' + '\n' + 'Регулярно ли Вы едите свежие фрукты и овощи?', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Ограничиваете ли Вы себя в употреблении животных жиров?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 3;
        }

    },//
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Регулярно ли Вы едите волокнистую пищу, хлеб грубого помола или из отрубей?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 5;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Ограничиваете ли Вы себя в употреблении сахара?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Умеете ли Вы отдыхать и расслабляться?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 3;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Есть ли у Вас развлечения, помимо работы?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 5;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Нравится ли Вам Ваша работа?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 4;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Есть ли у Вас друг, которому Вы полностью доверяете?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 4;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Есть ли у Вас любимый человек?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 3;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Считаете ли Вы, что должны быть более ответственны на работе?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 4;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Вы считаете, что должны брать на себя меньше обязательств?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Часто ли Вы испытываете скуку?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Вы курите?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Вы курите меньше полпачки в день?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 6;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Употребляете ли Вы алкоголь?' + '\n' +
            'Введите 1, если не употребляете' + '\n' +
            'Введите 2, если употребляете иногда' + '\n' +
            'Введите 3, если употребляете каждый день');
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Сколько Вы весите?' + '\n' +
            'Введите 1, если ваш вес в норме' + '\n' +
            'Введите 2, если ваш вес выше нормы не более, чем на 6 кг' + '\n' +
            'Введите 3, если ваш вес выше нормы не менее, чем на 6 кг и менее, чем на 12 кг' + '\n' +
            'Введите 4, если ваш вес выше нормы на более, чем 12 кг');
        if (ctx.message.body == '1') {
            counter += 3;
        } else if (ctx.message.body == '2') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Регулярно ли Вы делаете зарядку?', null, YES_NO_BUTTONS);
        if (ctx.message.body == '1') {
            counter += 5;
        } else if (ctx.message.body == '2') {
            counter += 4;
        } else if (ctx.message.body == '3') {
            counter += 2;
        }
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Вы занимаетесь зарядкой, пока не заболят мышцы?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Нужно ли Вам снотворное, чтобы уснуть?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Всегда ли Вы застегиваете ремень безопасности в машине?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Часто ли Вы вынуждены покупать лекарства?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'Проверяете ли Вы хоть иногда свое артериальное давление?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 2;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Бывают ли у Вас постоянные болезненные симптомы и ' +
            'Вы при этом не обращаетесь к врачу?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Занимаетесь ли Вы опасными видами спорта?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 5;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №25:' + '\n' + 'Часто ли Вы беспокоитесь или волнуетесь?', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 3;
        }

    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 5;
        }

        var choice = checkLifeStyle(counter);
        var sanity = determineSanity('lifestyle', choice);
        updateResult(ctx.message.user_id, 'lifestyle', counter, sanity);
        ctx.reply('Вы набрали: ' + counter + '\n' +
        checkChoice(10, choice) + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

module.exports = lifestyle
