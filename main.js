const express = require('express');
const bodyParser = require('body-parser');
const VkBot = require('node-vk-bot-api');
const mongoose = require("mongoose");
const {createResult} = require("./src/repository/ResultRepository");
const Scene = require('node-vk-bot-api/lib/scene')
const Stage = require('node-vk-bot-api/lib/stage')
const YES_NO_BUTTONS = require("./src/keyboards/yes-no");
const Session = require('node-vk-bot-api/lib/session');
const INSIDE_ANXIETY_BUTTONS = require("./src/keyboards/insideAnxiety");
const INSIDE_TEST_BUTTONS = require("./src/keyboards/insideTest");
const SEX_BUTTONS = require("./src/keyboards/sex");
const BURNOUT_BUTTONS = require("./src/keyboards/burnout");
const INCLINATION_BUTTONS = require("./src/keyboards/inclination");
const TEMPER_BUTTONS = require("./src/keyboards/temper");
const TEST_BUTTONS = require("./src/keyboards/test");
const ADMIN_BUTTONS = require("./src/keyboards/admin");
const SHRINKS_BUTTONS = require("./src/keyboards/shrinks");
const DEFECTS_BUTTONS = require("./src/keyboards/defects");
const STAFF_BUTTONS = require("./src/keyboards/staff");
const ANXIETY_BUTTONS = require("./src/keyboards/anxienty");
const DEFAULT_BUTTONS = require("./src/keyboards/default");
const registration = require("./src/scene/registration");
const contacts = require("./src/contacts");
const depression = require("./src/scene/depression");
const anxienty1 = require("./src/scene/anxienty1");
const {checkLifeStyle} = require("./src/external");
const {updateEysenck} = require("./src/repository/ResultRepository");
const {updateTemper} = require("./src/repository/ResultRepository");
const {updateBurnout} = require("./src/repository/ResultRepository");
const {addFeedback} = require("./src/repository/FeedbackRepository");
const {updateResult} = require("./src/repository/ResultRepository");

let counter = 0, counter_direct = 0, counter_reverse = 0;
let sex, userId, exhaustion = 0, depersonalization = 0, reduction = 0;
let arr = [], feedback_records = [];

const {checkAnxiety, checkStress, checkChoice, checkMotiv} = require("./src/external");
const {checkExhaustion, checkDepersonalization, checkReduction, checkInclination} = require("./src/external");
const {determineInclination, determineSanity, determineTemper, checkAggression} = require('./src/external');
const {checkEyseckCircle, detInclination, checkTemper, checkTemperType} = require('./src/external');
const {determineAnxietyResponse, determineSex} = require('./src/external');
const {determineStressResponse, determineBurnoutResponse} = require('./src/external');

let bot;
if (process.env.VK_TOKEN) {
    bot = new VkBot({
        token: process.env.VK_TOKEN,
        confirmation: process.env.CONFIRM_KEY
    });

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB was connected'))
        .catch((err) => console.log(err));

} else {
    const config = require('./src/config.json');
    bot = new VkBot({
        token: config.VK_TOKEN,
        confirmation: config.CONFIRM_KEY
    });

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB was connected'))
        .catch((err) => console.log(err));

}

const app = express();

const anxienty2 = new Scene('anxiety2',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для анализа личностной тревожности' +
            'В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' +
            'В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Нет, это не так' + '\n' +
            '2 – Пожалуй так' + '\n' +
            '3 – Верно' + '\n' +
            '4 - Совершенно верно' +
            'КАК ВЫ СЕБЯ ОБЫЧНО ЧУВСТВУЕТЕ?' +
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
        let recomend = checkChoice(3, choice)[0];
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

const stress = new Scene('stress',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест на проверку уровня психологического стресса')
        ctx.reply('В тесте 7 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
            '1 – Да, согласен' + '\n' +
            '2 – Скорее, согласен' + '\n' +
            '3 – Скорее, не согласен' + '\n' +
            '4 - Нет, не согласен');
        ctx.reply('Перед началом тестирования, укажите свой пол:', null, SEX_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №1:' + '\n' + 'Пожалуй, я человек нервный', null, SEX_BUTTONS);
        sex = determineSex(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Я очень беспокоюсь о своей работе', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Я часто ощущаю нервное напряжение', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Моя повседневная деятельность вызывает большое напряжение', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Общаясь с людьми, я часто ощущаю нервное напряжение', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'К концу дня я совершенно истощен физически и психически', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'В моей семье часто возникают напряженные отношения', null, SEX_BUTTONS);
        counter += determineStressResponse(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        counter += determineStressResponse(ctx.message.body);
        var result = (counter / 7).toFixed(2);
        var choice = checkStress(sex, result);
        var sanity = determineSanity('stress', choice);
        updateResult(ctx.message.user_id, 'stress', result, sanity);
        ctx.reply('Вы набрали: ' + result);
        ctx.reply(checkChoice(4, choice));
        ctx.reply('Рекомендуем к просмотру видео "Прогрессивная мышечная релаксация по Э. Джекобсону":', 'video-192832710_456239034');
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

const motivation = new Scene('motivation',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики вашей личности на мотивацию к успеху')
        ctx.reply('В тесте 41 вопрос. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны');
        ctx.reply('Вопрос №1:' + '\n' + 'Когда имеется выбор между двумя вариантами, ' +
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
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Когда возникает проблемная ситуация, ' +
            'я чаще всего принимаю решение одним из последних.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Когда у меня 2 дня подряд нет дела, я теряю покой.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'В некоторые дни, мои успехи ниже средних.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'По отношению к себе я более строг, чем по отношению к другим.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Я более доброжелателен, чем другие.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Когда я отказываюсь от трудного задания, ' +
            'я потом сурово осуждаю себя, так как знаю, что в нем я бы добился успеха.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В процессе работы я нуждаюсь в небольших паузах для отдыха.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Усердие – это не основная моя черта.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
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
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Препятствия делают мои решения более твердыми.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'У меня легко вызвать чувство тщеславия.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Когда я работаю без вдохновения, это обычно заметно.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'При выполнении работы я не рассчитываю на помощь других.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Иногда я откладываю то, что могу сделать прямо сейчас.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Нужно полагаться только на самого себя.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'В жизни мало вещей, более важных, чем деньги.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Всегда, когда мне предстоит выполнить ' +
            'важное задание, я ни о чем другом не думаю.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
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
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №26:' + '\n' + 'Когда я расположен к работе, ' +
            'я делаю ее лучше и квалифицированней, чем другие.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №27:' + '\n' + 'Мне проще и легче общаться с людьми, ' +
            'которые могут упорно работать.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №28:' + '\n' + 'Когда у меня нет дел, я чувствую, что мне не по себе.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №29:' + '\n' + 'Мне приходится выполнять ответственную ' +
            'работу чаще, чем другим.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №30:' + '\n' + 'Когда мне приходится принимать решение, ' +
            'я стараюсь делать это как можно лучше.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №31:' + '\n' + 'Мои друзья иногда считают меня ленивым.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №32:' + '\n' + 'Мои успехи в какой-то мере зависят от моих коллег.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №33:' + '\n' + 'Бессмысленно противодействовать воле руководителя.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
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
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №38:' + '\n' + 'Многое, за что я берусь, я не довожу до конца.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №39:' + '\n' + 'Я завидую людям, которые не загружены работой.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            counter += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №40:' + '\n' + 'Я не завидую тем, кто стремится к власти и положению.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
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
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            counter += 1;
        }

        var choice = checkMotiv(counter);
        var sanity = determineSanity('motivation', choice);
        updateResult(ctx.message.user_id, 'motivation', counter, sanity);
        ctx.reply('Вы набрали: ' + counter);
        ctx.reply(checkChoice(5, choice));
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

const burnout = new Scene('burnout',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест на проверку признаков профессионального выгорания')
        ctx.reply('В тесте 22 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Введите ответ, соответствующий частоте ваших мыслей и переживаний:' + '\n' +
            '0 - никогда' + '\n' +
            '1 - очень редко' + '\n' +
            '2 - редко' + '\n' +
            '3 - иногда' + '\n' +
            '4 - часто' + '\n' +
            '5 - очень часто' + '\n' +
            '6 - каждый день');
        ctx.reply('Вопрос №1:' + '\n' + 'Я чувствую себя эмоционально опустошенным.', null, BURNOUT_BUTTONS);
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
        ctx.reply('Эмоциональное истощение:' + '\n' + checkChoice(6, checkExhaustion(exhaustion)));
        ctx.reply('Деперсонализация:' + '\n' + checkChoice(7, checkDepersonalization(depersonalization)));
        ctx.reply('Редукция личных достижений:' + '\n' + checkChoice(8, checkReduction(reduction)));
        //reply('Общая тяжесть выгорания: ' + total_burnout);
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        updateBurnout(ctx.message.user_id, exhaustion, reduction, depersonalization, total_burnout);
        exhaustion = 0;
        depersonalization = 0;
        reduction = 0;
    }
);

const inclination = new Scene('inclination',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для определения профессиональных склонностей')
        ctx.reply('В тесте 24 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе будет по 3 варианта ответа. Введите 1, 2 или 3.');
        ctx.reply('Вопрос №1:' + '\n' + 'Мне хотелось бы в своей профессиональной деятельности:' + '\n' +
            '1) Общаться с самыми разными людьми' + '\n' +
            '2) Cнимать фильмы, писать книги, рисовать, выступать на сцене и т.д.' + '\n' +
            '3) Заниматься расчетами, вести документацию.', null, INCLINATION_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'В книге или кинофильме меня больше всего привлекает:' + '\n' +
            '1) Bозможность следить за ходом мыслей автора' + '\n' +
            '2) Художественная форма, мастерство писателя или режиссера' + '\n' +
            '3) Сюжет, действия героев.', null, INCLINATION_BUTTONS);
        arr[0] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Меня больше обрадует Нобелевская премия:' + '\n' +
            '1) За общественную деятельность' + '\n' +
            '2) В области науки' + '\n' +
            '3) В области искусства', null, INCLINATION_BUTTONS);
        arr[1] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Я скорее соглашусь стать:' + '\n' +
            '1) Главным механиком' + '\n' +
            '2) Начальником экспедиции' + '\n' +
            '3) Главным бухгалтером', null, INCLINATION_BUTTONS);
        arr[2] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Будущее людей определяют:' + '\n' +
            '1) Взаимопонимание между людьми' + '\n' +
            '2) Научные открытия' + '\n' +
            '3) Развитие производства', null, INCLINATION_BUTTONS);
        arr[3] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Если я стану руководителем, то в первую очередь займусь:' + '\n' +
            '1) Созданием дружного, сплоченного коллектива' + '\n' +
            '2) Разработкой новых технологий обучения' + '\n' +
            '3) Работой с документами', null, INCLINATION_BUTTONS);
        arr[4] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'На технической выставке меня больше привлечет:' + '\n' +
            '1) Внутреннее устройство экспонатов' + '\n' +
            '2) Их практическое применение' + '\n' +
            '3) Внешний вид экспонатов (цвет, форма)', null, INCLINATION_BUTTONS);
        arr[5] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'В людях я ценю, прежде всего:' + '\n' +
            '1) Дружелюбие и отзывчивость' + '\n' +
            '2) Смелость и выносливость' + '\n' +
            '3) Обязательность и аккуратность', null, INCLINATION_BUTTONS);
        arr[6] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'В свободное время мне хотелось бы:' + '\n' +
            '1) Ставить различные опыты, эксперименты' + '\n' +
            '2) Писать стихи, сочинять музыку или рисовать' + '\n' +
            '3) Тренироваться', null, INCLINATION_BUTTONS);
        arr[7] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В заграничных поездках меня скорее заинтересует:' + '\n' +
            '1) Возможность знакомства с историей и культурой другой страны' + '\n' +
            '2) Экстремальный туризм (альпинизм, виндсерфинг, горные лыжи)' + '\n' +
            '3) Деловое общение', null, INCLINATION_BUTTONS);
        arr[8] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Мне интереснее беседовать о:' + '\n' +
            '1) Человеческих взаимоотношениях' + '\n' +
            '2) Новой научной гипотезе' + '\n' +
            '3) Технических характеристиках новой модели машины, компьютера', null, INCLINATION_BUTTONS);
        arr[9] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Если бы в моей школе было всего три кружка, я бы выбрал(а):' + '\n' +
            '1) Технический' + '\n' +
            '2) Музыкальный' + '\n' +
            '3) Спортивный', null, INCLINATION_BUTTONS);
        arr[10] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'В школе следует обратить особое внимание на:' + '\n' +
            '1) Улучшение взаимопонимания между учителями и учениками' + '\n' +
            '2) Поддержание здоровья учащихся, занятия спортом' + '\n' +
            '3) Укрепление дисциплины', null, INCLINATION_BUTTONS);
        arr[11] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'Я с большим удовольствием смотрю:' + '\n' +
            '1) Научно-популярные фильмы' + '\n' +
            '2) Программы о культуре и искусстве' + '\n' +
            '3) Спортивные программы', null, INCLINATION_BUTTONS);
        arr[12] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Мне хотелось бы работать:' + '\n' +
            '1) С детьми или сверстниками' + '\n' +
            '2) С машинами, механизмами' + '\n' +
            '3) С объектами природы', null, INCLINATION_BUTTONS);
        arr[13] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Школа в первую очередь должна:' + '\n' +
            '1) Учить общению с другими людьми' + '\n' +
            '2) Давать знания' + '\n' +
            '3) Обучать навыкам работы', null, INCLINATION_BUTTONS);
        arr[14] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'Главное в жизни:' + '\n' +
            '1) Иметь возможность заниматься творчеством' + '\n' +
            '2) Вести здоровый образ жизни' + '\n' +
            '3) Тщательно планировать свои дела', null, INCLINATION_BUTTONS);
        arr[15] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'Государство должно в первую очередь заботиться о:' + '\n' +
            '1) Защите интересов и прав граждан' + '\n' +
            '2) Достижениях в области науки и техники' + '\n' +
            '3) Материальном благополучии граждан', null, INCLINATION_BUTTONS);
        arr[16] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Мне больше всего нравятся уроки:' + '\n' +
            '1) Труда' + '\n' +
            '2) Физкультуры' + '\n' +
            '3) Математики', null, INCLINATION_BUTTONS);
        arr[17] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Мне интереснее было бы:' + '\n' +
            '1) Заниматься сбытом товаров' + '\n' +
            '2) Изготавливать изделия' + '\n' +
            '3) Планировать производство товаров', null, INCLINATION_BUTTONS);
        arr[18] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Я предпочитаю читать статьи о:' + '\n' +
            '1) Выдающихся ученых и их открытиях' + '\n' +
            '2) Интересных изобретениях' + '\n' +
            '3) Жизни и творчестве писателей, художников, музыкантов', null, INCLINATION_BUTTONS);
        arr[19] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'В свободное время я люблю:' + '\n' +
            '1) Читать, думать, рассуждать' + '\n' +
            '2) Что-нибудь мастерить, шить, ухаживать за животными, растениями' + '\n' +
            '3) Ходить на выставки, концерты, в музеи', null, INCLINATION_BUTTONS);
        arr[20] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Больший интерес у меня вызовет сообщение о:' + '\n' +
            '1) Научном открытии' + '\n' +
            '2) Художественной выставке' + '\n' +
            '3) Экономической ситуации', null, INCLINATION_BUTTONS);
        arr[21] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Я предпочту работать:' + '\n' +
            '1) В помещении, где много людей' + '\n' +
            '2) В необычных условиях' + '\n' +
            '3) В обычном кабинете', null, INCLINATION_BUTTONS);
        arr[22] = parseInt(ctx.message.body);
    },
    (ctx) => {
        ctx.scene.leave();
        arr[23] = parseInt(ctx.message.body);
        var arr_res = checkInclination(...arr);
        var max = Math.max(...arr_res);
        var inclinations = determineInclination(max, ...arr_res);
        var type = detInclination(...arr_res);
        updateTemper(ctx.message.user_id, 'inclination', type, max);
        ctx.reply('Ваш результат:');
        ctx.reply(inclinations);
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        arr = [];
    }
);

let verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0;

const aggression = new Scene('aggression',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики агрессивного поведения.')
        ctx.reply('В тесте 40 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны');
        ctx.reply('Вопрос №1:' + '\n' + 'Во время спора я часто повышаю голос.', null, YES_NO_BUTTONS);
    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №2:' + '\n' + 'Если меня кто-то раздражает, я могу сказать ему все, что о нем думаю.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №3:' + '\n' + 'Если мне необходимо будет прибегнуть к физической силе ' +
            'для защиты своих прав, я, не раздумывая, сделаю это.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №4:' + '\n' + 'Когда я встречаю неприятного мне человека, ' +
            'я могу позволить себе незаметно ущипнуть или толкнуть его.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №5:' + '\n' + 'Увлекшись спором с другим человеком, я могу ' +
            'стукнуть кулаком по столу, чтобы привлечь к себе внимание или доказать свою правоту.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №6:' + '\n' + 'Я постоянно чувствую, что другие не уважают мои права.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №7:' + '\n' + 'Вспоминая прошлое, порой мне бывает обидно за себя.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №8:' + '\n' + 'Хотя я и не подаю вида, иногда меня гложет зависть.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №9:' + '\n' + 'Если я не одобряю поведение своих знакомых, то я прямо ' +
            'говорю им об этом.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №10:' + '\n' + 'В сильном гневе я употребляю крепкие выражения, сквернословлю.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №11:' + '\n' + 'Если кто-нибудь поднимет на меня руку, я постараюсь ' +
            'ударить его первым.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №12:' + '\n' + 'Я бываю настолько взбешен, что швыряю разные предметы.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №13:' + '\n' + 'У меня часто возникает потребность переставить ' +
            'в квартире мебель или полностью сменить ее.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №14:' + '\n' + 'В общении с людьми я часто чувствую себя «пороховой бочкой», ' +
            'которая постоянно готова взорваться.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №15:' + '\n' + 'Порой у меня появляется желание зло пошутить над другим человеком.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №16:' + '\n' + 'Когда я сердит, то обычно мрачнею.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №17:' + '\n' + 'В разговоре с человеком я стараюсь его внимательно выслушать, не перебивая.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №18:' + '\n' + 'В молодости у меня часто «чесались кулаки» и я всегда был готов пустить их в ход.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №19:' + '\n' + 'Если я знаю, что человек намеренно меня толкнул, то дело может дойти до драки.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №20:' + '\n' + 'Творческий беспорядок на моем рабочем столе позволяет мне эффективно работать.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №21:' + '\n' + 'Я помню, что бывал настолько сердитым, что хватал все, что попадало под руку, и ломал.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №22:' + '\n' + 'Иногда люди раздражают меня только одним своим присутствием.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №23:' + '\n' + 'Я часто удивляюсь, какие скрытые причины заставляют другого человека ' +
            'делать мне что-нибудь хорошее.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №24:' + '\n' + 'Если мне нанесут обиду, то у меня пропадет желание разговаривать ' +
            'с кем бы, то ни было.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №25:' + '\n' + 'Иногда я намеренно говорю гадости о человеке, которого не люблю.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №26:' + '\n' + 'Когда я взбешен, я кричу самое злобное ругательство.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №27:' + '\n' + 'В детстве я избегал драться.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №28:' + '\n' + 'Я знаю, по какой причине и когда можно кого-нибудь ударить.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №29:' + '\n' + 'Когда я взбешен, то могу хлопнуть дверью.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №30:' + '\n' + 'Мне кажется, что окружающие люди меня не любят.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №31:' + '\n' + 'Я постоянно делюсь с другими своими чувствами и переживаниями.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №32:' + '\n' + 'Очень часто своими словами и действиями я сам себе приношу вред.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Нет' || ctx.message.body == 'нет') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №33:' + '\n' + 'Когда люди орут на меня, я отвечаю тем же.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №34:' + '\n' + 'Если кто-нибудь ударит меня первым, я в ответ ударю его.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            verbalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №35:' + '\n' + 'Меня раздражает, когда предметы лежат не на своем месте.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            physicalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №36:' + '\n' + 'Если мне не удается починить сломавшийся или порвавшийся ' +
            'предмет, то я в гневе ломаю или рву его окончательно.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №37:' + '\n' + 'Другие люди мне всегда кажутся преуспевающими.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            objectiveAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №38:' + '\n' + 'Когда я думаю об очень неприятном мне человеке, я могу прийти ' +
            'в возбуждение от желания причинить ему зло.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №39:' + '\n' + 'Иногда мне кажется, что судьба сыграла со мной злую шутку.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            emotionalAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вопрос №40:' + '\n' + 'Если кто-нибудь обращается со мной не так, как следует, ' +
            'я очень расстраиваюсь по этому поводу.', null, YES_NO_BUTTONS);
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

    },
    (ctx) => {
        ctx.scene.leave();
        if (ctx.message.body == 'Да' || ctx.message.body == 'да') {
            selfAgg += 1;
        }

        var total = verbalAgg + physicalAgg + objectiveAgg + emotionalAgg + selfAgg;
        var choice = checkAggression(total);
        var sanity = determineSanity('aggression', choice);
        updateResult(ctx.message.user_id, 'aggression', total, sanity);
        ctx.reply('Общий уровень агрессии: ' + total);
        ctx.reply(checkChoice(9, choice));
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0;
        total = 0;
    }
);

const lifestyle = new Scene('lifestyle',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для диагностики вашего образа жизни.')
        ctx.reply('В тесте 25 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны');
        ctx.reply('Вопрос №1:' + '\n' + 'Регулярно ли Вы едите свежие фрукты и овощи?', null, YES_NO_BUTTONS);
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
        ctx.reply('Вы набрали: ' + counter);
        ctx.reply(checkChoice(10, choice));
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

const temper = new Scene('temper',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для определения типа характера.')
        ctx.reply('В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе по 2 варианта ответа. Вводите 1 или 2.');
        ctx.reply('Вопрос №1:' + '\n' + 'Что Вы предпочитаете?' + '\n' +
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
        ctx.reply('Вы набрали: ' + result);
        ctx.reply(checkChoice(11, choice));
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        counter = 0;
    }
);

let neuroticism = 0, lie = 0, introversion = 0;

const eysenck = new Scene('eysenck',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест Айзенка')
        ctx.reply('В тесте 57 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов')
        ctx.reply('Введите:' + '\n' +
            '\'Да\', если согласны с утверждением' + '\n' +
            '\'Нет\', если не согласны');
        ctx.reply('Вопрос №1:' + '\n' + 'Тебе нравится находиться в шумной и веселой компании?', null, YES_NO_BUTTONS);
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
            'Достоверность: ' + lie);
        ctx.reply('Круг Айзенка:', 'photo-192832710_457239178');
        ctx.reply(checkChoice(12, choice));
        ctx.reply('Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        introversion = 0, neuroticism = 0, lie = 0;
    }
);

const feedback = new Scene('feedback',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Оставьте свое сообщение с пожеланием об исправлении ошибки или ' +
            'добавлении новой функции в программе:');
    },
    (ctx) => {
        ctx.scene.leave();
        addFeedback(ctx.message.user_id, ctx.message.body);
        ctx.reply('Спасибо, мы вас услышали!');
    }
);

const session = new Session();

const stage = new Stage(
    registration,
    depression,
    anxienty1,
    anxienty2,
    stress,
    motivation,
    burnout,
    inclination,
    aggression,
    lifestyle,
    temper,
    eysenck,
    feedback
);

bot.use(session.middleware())
bot.use(stage.middleware())

bot.command('Регистрация', (ctx) => ctx.scene.enter('registration'));
bot.command('Депрессия', (ctx) => ctx.scene.enter('depression'));
bot.command('Реактивная', (ctx) => ctx.scene.enter('anxiety1'));
bot.command('Личностная', (ctx) => ctx.scene.enter('anxiety2'));
bot.command('Стресс', (ctx) => ctx.scene.enter('stress'));
bot.command('Мотивация', (ctx) => ctx.scene.enter('motivation'));
bot.command('Выгорание', (ctx) => ctx.scene.enter('burnout'));
bot.command('Склонность', (ctx) => ctx.scene.enter('inclination'));
bot.command('Агрессия', (ctx) => ctx.scene.enter('aggression'));
bot.command('Образ жизни', (ctx) => ctx.scene.enter('lifestyle'));
bot.command('Темперамент', (ctx) => ctx.scene.enter('temper'));
bot.command('Тест Айзенка', (ctx) => ctx.scene.enter('eysenck'));
bot.command('feedback', (ctx) => ctx.scene.enter('feedback'));
bot.command('Feedback', (ctx) => ctx.scene.enter('feedback'));

bot.event('group_join', (msg) => {
    msg.reply('Спасибо, что стали пользователем нашего бота. Мы постараемся вам помочь!');
});

bot.command(['help', 'Help'], (ctx) => {
    bot.sendMessage(ctx.message.user_id, 'Список доступных команд: ' + '\n' +
        'start – начать взаимодействие с ботом' + '\n' +
        'feedback – оставить пожелание для модификации');
});

bot.command(['Помощь', 'помощь'], (ctx) => {
    bot.sendMessage(ctx.message.user_id, 'Список доступных команд: ' + '\n' +
        'start – начать взаимодействие с ботом' + '\n' +
        'feedback – оставить пожелание для модификации');
});

bot.command('Отмена', (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
});

bot.command('Главное меню', (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
});

bot.command(['Start', 'start', 'старт', 'Старт'], (ctx) => {
    ctx.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, DEFAULT_BUTTONS);
    createResult(ctx.message.user_id);
});

bot.command('admin', (ctx) => {
    ctx.reply('Приветствуем вас в админ панеле:', null, ADMIN_BUTTONS);
});

bot.command('Психологи', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, SHRINKS_BUTTONS);
});

bot.command('Дефектологи', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, DEFECTS_BUTTONS);
});

bot.command(['Другой тест', 'Тест', 'test', 'Test', 'тестирование', 'Тестирование', 'Пройти тест'], (ctx) => {
    ctx.reply('Выберите тест: ', null, TEST_BUTTONS);
});


bot.command('Получить помощь', (ctx) => {
    ctx.reply('Список контактов доступных специалистов:', null, STAFF_BUTTONS);
});

bot.command('Тревожность', (ctx) => {
    ctx.reply('Сделайте более конкретный выбор:' + '\n' +
        'Реактивная тревожность – тревожность, как состояние' + '\n' +
        'Личностная тревожность – тревожность, как свойство личности', null, ANXIETY_BUTTONS);
});

bot.command('Пожелания', (ctx) => {
    if (feedback_records === undefined || feedback_records.length == 0) {
        ctx.reply('Список пожеланий пуст ...');
    } else ctx.reply(feedback_records);
    // тут нужно будет вытащить все содержимое коллекции feedback из mongodb
});

bot.command('Татьяна Чапала', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[0][0]);
});
bot.command('Мария Илич', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[1][0]);
});
bot.command('Юлия Петрова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[2][0]);
});
bot.command('Оксана Зотова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[3][0]);
});
bot.command('Алина Гельметдинова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[4][0]);
});

bot.command('Юлия Галимова', (ctx) => {
    bot.sendMessage(ctx.message.user_id, contacts[5][0]);
});

bot.startPolling()

app.use(bodyParser.json());

app.post('/', bot.webhookCallback);

app.listen(process.env.PORT || 5000, () => console.log('Server is running ... '));
setInterval(function () { app.get('http://bot-antidep.herokuapp.com/'); }, 300000);