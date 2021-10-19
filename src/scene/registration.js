const Scene = require('node-vk-bot-api/lib/scene');
const AGREEMENT_BUTTONS = require("../keyboards/agreement");
const SEX_BUTTONS = require("../keyboards/sex");
const YES_NO_BUTTONS = require("../keyboards/yes-no");
const {createUser} = require("../repository/UserRepository");
const {formatDate} = require("../external");

let age, eduLevel, maritalStatus, socialStatus, approval, sex;

const registration = new Scene('registration',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали пункт меню регистрации.' + '\n' +
            'Последовательно ответьте на все вопросы, вводя запрашиваемую информацию.' + '\n' +
            'Укажите свой пол: ' + '\n' +
            'Если вы мужчина – введите М' + '\n' +
            'Если вы женщина – введите Ж', null, SEX_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите свой возраст: ', null, null);
        if (ctx.message.body == 'M' || ctx.message.body == 'М') {
            sex = 'male';
        }
        if (ctx.message.body == 'Ж') {
            sex = 'female';
        }
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите уровень своего образования: ' + '\n' +
            'С – Среднее образование (окончена школа)' + '\n' + 'СС – Среднее Специальное (окончен колледж)' + '\n' +
            'В – Высшее образование' + '\n' + 'М – Магистратура' + '\n' + 'А – Аспирантура' + '\n' +
            'К – Кандидат наук' + '\n' + 'Д – Доктор наук');
        age = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите семейное положение: ');
        eduLevel = ctx.message.body;
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Укажите социальный статус: ');
        maritalStatus = ctx.message.body;
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Информированное добровольное согласие клиента г. Тольятти' + '\n' +
            'Настоящее добровольное согласие составлено в соответствии со статьей 20. ' +
            'Федеральный закон от 21.11.2011 N 323-ФЗ (ред. от 29.05.2019) ' +
            'Об основах охраны здоровья граждан в Российской Федерации. ' +
            'И соответствует Этическому кодексу психолога принят “14” ' +
            'февраля 2012 года V съездом Российского психологического общества.' +
            'На страничке БОТ-психолога под названием Doctor Calm, которая размещена в социальной сети ' +
            'ВКонтакте, проводится анонимная психологическая диагностика, без раскрытия личных данных и ' +
            'идентичности пользователя соответствующей программы. ' + '\n' +
            '1. Настоящим я доверяю провести психологическую диагностику. ' + '\n' +
            '2. Содержание указанных выше психологических действий, связанный с ними риск и последствия мне известны. ' +
            'Я хорошо понял(а) все разъяснения.' + '\n' +
            '3. Мне известно, что 100% гарантии хороших результатов психокоррекции в целом дано быть не может.' + '\n' +
            '4. Я согласен на исследование данных моего исследования в научных целях.' + '\n' +
            'Содержание настоящего документа мною прочитано, свое согласие с его содержанием я удостоверяю.' + '\n' +
            formatDate() + '\n' +
            'Если согласны на проведение диагностики – введите \'Да\', если нет – введите \'Нет\'', null, YES_NO_BUTTONS);
        socialStatus = ctx.message.body;
    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body == 'Да' ||ctx.message.body == 'да') {
            approval = true;
        } else approval = false;
        createUser(ctx.message.user_id, sex, age, eduLevel, maritalStatus, socialStatus, approval);
        ctx.reply('Спасибо за регистрацию!', null, AGREEMENT_BUTTONS);
        sex = 0, age = 0;
    }
);

module.exports = registration