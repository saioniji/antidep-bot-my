const TEMPER_BUTTONS = require("../keyboards/temper");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {checkChoice} = require("../external");
const {updateTemper} = require("../repository/ResultRepository");
const {checkTemper} = require("../external");
const {determineTemper} = require("../external");
const Scene = require('node-vk-bot-api/lib/scene');

let counter = 0;

const temper = new Scene('temper',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для определения типа характера.' + '\n' +
            'В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
            'Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе по 2 варианта ответа. Вводите 1 или 2.' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Что Вы предпочитаете?' + '\n' +
            '1) Немного близких друзей' + '\n' +
            '2) Большую товарищескую компанию', null, TEMPER_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Какие книги Вы предпочитаете читать?' + '\n' +
            '1) С занимательным сюжетом' + '\n' +
            '2) С раскрытием переживаний другого', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Что вы скорее можете допустить в работе?' + '\n' +
            '1) Опоздание' + '\n' +
            '2) Ошибки', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Если Вы совершаете дурной поступок, то:' + '\n' +
            '1) Остро переживаете' + '\n' +
            '2) Острых переживаний нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Как Вы сходитесь с людьми?' + '\n' +
            '1) Быстро, легко' + '\n' +
            '2) Медленно, осторожно', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Считаете ли Вы себя обидчивым?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Склонны ли Вы смеяться от души?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Вы считаете себя:' + '\n' +
            '1) Молчаливым' + '\n' +
            '2) Разговорчивым', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Откровенны ли Вы или скрытны?' + '\n' +
            '1) Откровенен' + '\n' +
            '2) Скрытен', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'Любите ли Вы заниматься анализом своих переживаний?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Находясь в обществе, Вы предпочитаете:' + '\n' +
            '1) Говорить' + '\n' +
            '2) Слушать', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Часто ли Вы переживаете недовольство собой?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'Любите ли Вы что-нибудь организовывать?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Хотелось бы Вам вести интимный дневник?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Быстро ли Вы переходите от решения к выполнению?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Легко ли меняется Ваше настроение?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Любите ли Вы убеждать других, навязывать свои взгляды?' + '\n' +
            '1) Да' + '\n' +
            '2) Нет', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Ваши движения:' + '\n' +
            '1) Быстры' + '\n' +
            '2) Медленны', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Вы беспокоитесь о возможных неприятностях?' + '\n' +
            '1) Часто' + '\n' +
            '2) Редко', null, TEMPER_BUTTONS);
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'В затруднительных случаях Вы:' + '\n' +
            '1) Спешите обратиться за помощью' + '\n' +
            '2) Не обращаетесь', null, TEMPER_BUTTONS);
        if (ctx.message.body == '2') {
            counter += (parseInt(ctx.message.body) - 1);
        }

    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body == '1') {
            counter += parseInt(ctx.message.body);
        }

        var result = counter * 5;
        var choice = determineTemper(result);
        var type = checkTemper(choice);
        updateTemper(ctx.message.user_id, 'temper', type, result)
        ctx.reply('Вы набрали: ' + result + '\n' +
        checkChoice(11, choice) + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

module.exports = temper