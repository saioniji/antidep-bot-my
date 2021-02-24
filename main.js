const { logStart, checkLifeStyle } = require('./src/external');
const express = require('express');
const bodyParser = require('body-parser');
const { Botact } = require('botact');
const mongoose = require('mongoose');

const server = express();

var bot;
if (process.env.VK_TOKEN) {
    var redis = require('url').parse(process.env.REDIS_URL);
    bot = new Botact({
        token: process.env.VK_TOKEN,
        confirmation: process.env.CONFIRM_KEY,
        redis: true,
        flowTimeout: 120,
        redisConfig: {
            host: redis.hostname,
            port: redis.port,
            auth_pass: redis.auth.split(':')[1]
        }
    });
    mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => console.log('MongoDB was connected'))
	  .catch((err) => console.log(err));
}
else {
    const config = require('./src/config.json');
    bot = new Botact({
        token: config.VK_TOKEN,
        confirmation: config.CONFIRM_KEY,
        redis: true,
        flowTimeout: 120,
        redisConfig: {
            host: '127.0.0.1',
            port: 6379
        }
    });
    mongoose.connect(config.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => console.log('MongoDB was connected'))
	  .catch((err) => console.log(err));
};

logStart();
const { createUser } = require('./src/repository/UserRepository');
const { createResult, updateResult, updateBurnout, updateTemper, updateEysenck } = require('./src/repository/ResultRepository');
const { addFeedback } = require('./src/repository/FeedbackRepository');

const keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button1' 
                    },
                    label: 'Регистрация'
                },
                color: 'secondary'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button2' 
                    },
                    label: 'Пройти тест'
                },
                color: 'negative'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button3'
                    },
                    label: 'Получить помощь'
                },
                color: 'secondary'
            }  
        ]
    ]
};

const test_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button4' 
                    },
                    label: 'Депрессия'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button5'
                    },
                    label: 'Тревожность'
                },
                color: 'positive'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button6'
                    },
                    label: 'Стресс'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button7'
                    },
                    label: 'Мотивация'
                },
                color: 'positive'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button8'
                    },
                    label: 'Выгорание'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button9'
                    },
                    label: 'Склонность'
                },
                color: 'positive'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button10'
                    },
                    label: 'Агрессия'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button11'
                    },
                    label: 'Образ жизни'
                },
                color: 'positive'
            }
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button12'
                    },
                    label: 'Темперамент'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button13'
                    },
                    label: 'Тест Айзенка'
                },
                color: 'positive'
            }
        ]
    ]
};

const anxiety_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button14' 
                    },
                    label: 'Реактивная'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button15'
                    },
                    label: 'Личностная'
                },
                color: 'positive'
            },
        ]
    ]
};

const admin_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button16' 
                    },
                    label: 'Пожелания'
                },
                color: 'primary'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button17'
                    },
                    label: 'Пользователи'
                },
                color: 'primary'
            }  
        ]
    ]
};

const staff_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button18' 
                    },
                    label: 'Психологи'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button19'
                    },
                    label: 'Дефектологи'
                },
                color: 'positive'
            }  
        ]
    ]
};

const shrinks_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button20' 
                    },
                    label: 'Татьяна Чапала'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button21'
                    },
                    label: 'Мария Илич'
                },
                color: 'positive'
            }  
        ],
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button22' 
                    },
                    label: 'Юлия Петрова'
                },
                color: 'positive'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button23'
                    },
                    label: 'Оксана Зотова'
                },
                color: 'positive'
            }  
        ]
    ]
};

const defects_keyboard = {
    one_time: true,
    buttons: [
        [
            {
                action: {
                    type: 'text',
                    payload: { 
                        button: 'button24' 
                    },
                    label: 'Алина Гельметдинова'
                },
                color: 'positive'
            }
        ]
    ]
};

var counter = 0, counter_direct = 0, counter_reverse = 0;
var sex, userId, exhaustion = 0, depersonalization = 0, reduction = 0;
var arr = [], feedback_records =[];

const { reverseScore, checkDepression, checkAnxiety, checkStress, checkChoice, checkMotiv } = require("./src/external");
const { checkExhaustion, checkDepersonalization, checkReduction, checkInclination } = require("./src/external");
const { determineInclination, determineSanity, determineTemper, checkAggression } = require('./src/external');
const { checkEyseckCircle, detInclination, checkTemper, checkTemperType } = require('./src/external');

const contacts = [
    ['Татьяна Владимировна Чапала' + '\n' + 'https://vk.com/id625482513' + '\n' + '89371837900'],
    ['Мария Илич' + '\n' + 'https://vk.com/mariailich'],
    ['Юлия Петрова' + '\n' + 'https://vk.com/id6037251'],
    ['Оксана Зотова' + '\n' + 'https://vk.com/id128316097'],
    ['Алина Гельметдинова' + '\n' + 'https://vk.com/id73431394']
];

var age, eduLevel, maritalStatus, socialStatus, approval;

bot.addScene('registration',
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали пункт меню регистрации.' + '\n' +
        'Последовательно ответьте на все вопросы, вводя запрашиваемую информацию.');
        reply('Укажите свой пол: ' + '\n' +
        'Если вы мужчина – введите М' + '\n' +
        'Если вы женщина – введите Ж');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Укажите свой возраст: ');
        if (body == 'M' || body == 'М') { sex = 'male'; }
        if (body == 'Ж') { sex = 'female'; }
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Укажите уровень своего образования: ' + '\n' +
        'С – Среднее образование (окончена школа)' + '\n' + 'СС – Среднее Специальное (окончен колледж)' + '\n' +
        'В – Высшее образование' + '\n' + 'М – Магистратура' + '\n' + 'А – Аспирантура' + '\n' +
        'К – Кандидат наук' + '\n' + 'Д – Доктор наук');
        age = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Укажите семейное положение: ');
        eduLevel = body;
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Укажите социальный статус: ');
        maritalStatus = body;
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Согласны ли вы пройти тестирование для диагностики вашего психического здоровья?' + '\n' +
            'Если согласны – введите 1, если нет – введите 2');
        socialStatus = body;
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '1') { approval = true; }
        else approval = false;
        createUser(userId, sex, age, eduLevel, maritalStatus, socialStatus, approval);
        reply('Спасибо за регистрацию!');
        sex = 0, age = 0;
    }
);

bot.addScene('depression',
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для определения уровня депрессии')
        reply('В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
              '1 – Никогда или изредка' + '\n' +
              '2 – Иногда' + '\n' + 
              '3 – Часто' + '\n' + 
              '4 - Почти всегда или постоянно');
        reply('Вопрос №1:' + '\n' + 'Я чувствую подавленность');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Утром я чувствую себя лучше всего.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'У меня бывают периоды плача или близости к слезам.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'У меня плохой ночной сон.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Аппетит у меня не хуже обычного.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Мне приятно смотреть на привлекательных женщин, разговаривать с ними, находиться рядом.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Я замечаю, что теряю вес.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Меня беспокоят запоры.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Сердце бьется быстрее, чем обычно.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Я устаю без всяких причин.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Я мыслю так же ясно, как всегда.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Мне легко делать то, что я умею.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Чувствую беспокойство и не могу усидеть на месте.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'У меня есть надежды на будущее.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Я более раздражителен, чем обычно.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Мне легко принимать решения.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Я чувствую, что полезен и необходим.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Я живу достаточно полной жизнью.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Я чувствую, что другим людям станет лучше, если я умру.');
        counter += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Меня до сих пор радует то, что радовало всегда.');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter += reverseScore(parseInt(body));
        var choice = checkDepression(counter);
        var sanity = determineSanity('depression', choice);
        reply('Вы набрали: ' + counter);
        reply(checkChoice(1, choice));
        updateResult(userId, 'depression', counter, sanity);
        counter = 0;
    }
);

bot.addScene('anxiety1',
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для анализа ситуативной тревожности')
        reply('В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
              '1 – Нет, это не так' + '\n' +
              '2 – Пожалуй так' + '\n' + 
              '3 – Верно' + '\n' + 
              '4 - Совершенно верно');
        reply('КАК ВЫ ЧУВСТВУЕТЕ СЕБЯ В ДАННЫЙ МОМЕНТ?');
        reply('Вопрос №1:' + '\n' + 'Я спокоен');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Мне ничто не угрожает');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Я нахожусь в напряжении');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Я испытываю сожаление');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Я чувствую себя свободно');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Я расстроен');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Меня волнуют возможные неудачи');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Я чувствую себя отдохнувшим');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Я встревожен');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Я испытываю чувство внутреннего удовлетворения');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Я уверен в себе');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Я нервничаю');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Я не нахожу себе места');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Я взвинчен');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Я не чувствую скованности');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Я доволен');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Я озабочен');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Я слишком возбужден и мне не по себе');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Мне радостно');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Мне приятно');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter_reverse += parseInt(body);
        var result = counter_direct - counter_reverse + 50;
        var choice = checkAnxiety(result);
        var sanity = determineSanity('anxiety1', choice);
        updateResult(userId, 'anxiety1', result, sanity);
        reply('Вы набрали: ' + result);
        reply(checkChoice(2, choice));
        counter_direct = 0;
        counter_reverse = 0;
        counter = 0;
    }
);

bot.addScene('anxiety2',
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для анализа личностной тревожности')
        reply('В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
              '1 – Нет, это не так' + '\n' +
              '2 – Пожалуй так' + '\n' + 
              '3 – Верно' + '\n' + 
              '4 - Совершенно верно');
        reply('КАК ВЫ СЕБЯ ОБЫЧНО ЧУВСТВУЕТЕ?');
        reply('Вопрос №1:' + '\n' + 'Я испытываю удовольствие');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Я обычно быстро устаю');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Я легко могу заплакать');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Я хотел бы быть таким же счастливым, как и другие');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Нередко я проигрываю из-за того, ' +
              'что недостаточно быстро принимаю решения');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Обычно я чувствую себя бодрым');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Я спокоен, хладнокровен и собран');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Ожидаемые трудности обычно очень тревожат меня');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Я слишком переживаю из-за пустяков');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Я вполне счастлив');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Я принимаю все слишком близко к сердцу');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Мне не хватает уверенности в себе');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Обычно я чувствую себя в безопасности');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Я стараюсь избегать критических ситуаций ' +
            'и трудностей');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'У меня бывает хандра');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Я доволен');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Всякие пустяки отвлекают и волнуют меня');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Я так сильно переживаю свои разочарования, ' +
            'что потом долго не могу о них забыть');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Я уравновешенный человек');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Меня охватывает беспокойство, когда я ' + 
            'думаю о своих делах и заботах');
        counter_reverse += parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter_direct += parseInt(body);
        var result = counter_direct - counter_reverse + 35;
        var choice = checkAnxiety(result);
        var sanity = determineSanity('anxiety2', choice);
        updateResult(userId, 'anxiety2', result, sanity);
        reply('Вы набрали: ' + result);
        reply(checkChoice(3, choice));
        counter_direct = 0;
        counter_reverse = 0;
        counter = 0;
    }
);

bot.addScene('stress',
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест на проверку уровня психологического стресса')
        reply('В тесте 7 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
              '1 – Да, согласен' + '\n' +
              '2 – Скорее, согласен' + '\n' + 
              '3 – Скорее, не согласен' + '\n' + 
              '4 - Нет, не согласен');
        reply('Перед началом тестирования, укажите свой пол:' + '\n' + 
              'Если вы мужчина, введите 1' + '\n' +
              'Если вы женщина, введите 2');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №1:' + '\n' + 'Пожалуй, я человек нервный');
        sex = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Я очень беспокоюсь о своей работе');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Я часто ощущаю нервное напряжение');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Моя повседневная деятельность вызывает большое напряжение');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Общаясь с людьми, я часто ощущаю нервное напряжение');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'К концу дня я совершенно истощен физически и психически');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'В моей семье часто возникают напряженные отношения');
        counter += parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter += parseInt(body);
        var result = (counter/7).toFixed(2);
        var choice = checkStress(sex, result);
        var sanity = determineSanity('stress', choice);
        updateResult(userId, 'stress', result, sanity);
        reply('Вы набрали: ' + result);
        reply(checkChoice(4, choice));
        counter = 0;
    }
);

bot.addScene('motivation', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для диагностики вашей личности на мотивацию к успеху')
        reply('В тесте 41 вопрос. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Введите:' + '\n' +
            '1, если согласны с утверждением' + '\n' +
            '2, если не согласны');
        reply('Вопрос №1:' + '\n' + 'Когда имеется выбор между двумя вариантами, ' + 
        'его лучше сделать быстрее, чем отложить на определенное время.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Я легко раздражаюсь, когда замечаю, ' + 
            'что не могу на все 100% выполнить задание.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Когда я работаю, это выглядит так, ' +
            'будто я все ставлю на карту.');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Когда возникает проблемная ситуация, ' +
            'я чаще всего принимаю решение одним из последних.');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Когда у меня два дня подряд нет дела, я теряю покой.');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'В некоторые дни мои успехи ниже средних.');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'По отношению к себе я более строг, чем по отношению к другим.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Я более доброжелателен, чем другие.');
        if (body == '1') { counter += parseInt(body); };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Когда я отказываюсь от трудного задания, ' +
        'я потом сурово осуждаю себя, так как знаю, что в нем я добился бы успеха.');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'В процессе работы я нуждаюсь в небольших паузах для отдыха.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Усердие – это не основная моя черта.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Мои достижения в труде не всегда одинаковы.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Меня больше привлекает другая работа, ' +
            'чем та, которой я занят.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Порицание стимулирует меня сильнее, чем похвала.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Я знаю, что мои коллеги считают меня дельным человеком.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Препятствия делают мои решения более твердыми.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'У меня легко вызвать честолюбие.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Когда я работаю без вдохновения, это обычно заметно.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'При выполнении работы я не рассчитываю на помощь других.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Иногда я откладываю то, что должен был сделать сейчас.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'Нужно полагаться только на самого себя.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'В жизни мало вещей, более важных, чем деньги.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №23:' + '\n' + 'Всегда, когда мне предстоит выполнить ' +
            'важное задание, я ни о чем другом не думаю.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №24:' + '\n' + 'Я менее честолюбив, чем многие другие.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №25:' + '\n' + 'В конце отпуска я обычно радуюсь, что скоро выйду на работу.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №26:' + '\n' + 'Когда я расположен к работе, ' + 
            'я делаю ее лучше и квалифицированнее, чем другие.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №27:' + '\n' + 'Мне проще и легче общаться с людьми, ' +
            'которые могут упорно работать.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №28:' + '\n' + 'Когда у меня нет дел, я чувствую, что мне не по себе.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №29:' + '\n' + 'Мне приходится выполнять ответственную ' +
            'работу чаще, чем другим.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №30:' + '\n' + 'Когда мне приходится принимать решение, ' +
            'я стараюсь делать это как можно лучше.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №31:' + '\n' + 'Мои друзья иногда считают меня ленивым.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №32:' + '\n' + 'Мои успехи в какой-то мере зависят от моих коллег.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №33:' + '\n' + 'Бессмысленно противодействовать воле руководителя.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №34:' + '\n' + 'Иногда не знаешь, какую работу придется выполнять.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №35:' + '\n' + 'Когда что-то не ладиться, я нетерпелив.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №36:' + '\n' + 'Я обычно обращаю мало внимания на свои достижения.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №37:' + '\n' + 'Когда я работаю вместе с другими, ' +
            'моя работа дает большие результаты, чем работы других.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №38:' + '\n' + 'Многое, за что я берусь, я не довожу до конца.');
        if (body == '1') { counter += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №39:' + '\n' + 'Я завидую людям, которые но загружены работой.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №40:' + '\n' + 'Я не завидую тем, кто стремится к власти и положению.');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №41:' + '\n' + 'Когда я уверен, что стою на правильном пути, ' +
            'для доказательства своей правоты я иду вплоть до крайних мер.');
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '1') { counter += parseInt(body); };
        var choice = checkMotiv(counter);
        var sanity = determineSanity('motivation', choice);
        updateResult(userId, 'motivation', counter, sanity);
        reply('Вы набрали: ' + counter);
        reply(checkChoice(5, choice));
        counter = 0;
    }
);

bot.addScene('burnout', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест на проверку признаков профессионального выгорания')
        reply('В тесте 22 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Введите ответ, соответствующий частоте ваших мыслей и переживаний:' + '\n' +
            '0 - никогда' + '\n' +
            '1 - очень редко' + '\n' +
            '2 - редко' + '\n' +
            '3 - иногда' + '\n' +
            '4 - часто' + '\n' +
            '5 - очень часто' + '\n' +
            '6 - каждый день');
        reply('Вопрос №1:' + '\n' + 'Я чувствую себя эмоционально опустошенным.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'После работы я чувствую себя, как «выжатый лимон».');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Утром я чувствую усталость и нежелание идти на работу.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Я хорошо понимаю, что чувствуют мои ' + 
            'подчинённые и коллеги, и стараюсь учитывать это в интересах дела.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Я чувствую, что общаюсь с некоторыми ' + 
            'подчинёнными и коллегами как с предметами (без теплоты и расположения к ним).');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'После работы на некоторое время хочется уединиться от всех и всего.');
        depersonalization += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Я умею находить правильное решение ' + 
            'в конфликтных ситуациях, возникающих при общении с коллегами.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Я чувствую угнетённость и апатию.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Я уверен, что моя работа нужна людям.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'В последнее время я стал более «чёрствым» ' +
            'по отношению к тем, с кем работаю.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Я замечаю, что моя работа ожесточает меня.');
        depersonalization += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'У меня много планов на будущее, и я верю в их осуществление.');
        depersonalization += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Моя работа всё больше меня разочаровывает.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Мне кажется, что я слишком много работаю.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Бывает, что мне действительно безразлично то, ' + 
            'что происходит с некоторыми моими подчиненными и коллегами.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Мне хочется уединиться и отдохнуть от всего и всех.');
        depersonalization += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Я легко могу создать атмосферу доброжелательности и ' +
            'сотрудничества в коллективе.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Во время работы я чувствую приятное оживление.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Благодаря своей работе я уже сделал в жизни много ' +
            'действительно ценного.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Я чувствую равнодушие и потерю интереса ко многому, ' +
            'что радовало меня в моей работе.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'На работе я спокойно справляюсь с эмоциональными проблемами.');
        exhaustion += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'В последнее время мне кажется, что коллеги и подчинённые ' +
        'всё чаще перекладывают на меня груз своих проблем и обязанностей.');
        reduction += parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        depersonalization += parseInt(body);
        var total_burnout = exhaustion + depersonalization + reduction;
        reply('Эмоциональное истощение:' + '\n' + checkChoice(6, checkExhaustion(exhaustion)));
        reply('Деперсонализация:' + '\n' + checkChoice(7, checkDepersonalization(depersonalization)));
        reply('Редукция личных достижений:' + '\n' + checkChoice(8, checkReduction(reduction)));
        reply('Общая тяжесть выгорания: ' + total_burnout);
        updateBurnout(userId, exhaustion, reduction, depersonalization, total_burnout);
        exhaustion = 0;
        depersonalization = 0;
        reduction = 0;
    }
);

bot.addScene('inclination', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для определения профессиональных склонностей')
        reply('В тесте 24 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе будет по 3 варианта ответа. Введите 1, 2 или 3.');
        reply('Вопрос №1:' + '\n' + 'Мне хотелось бы в своей профессиональной деятельности:' + '\n' +
            '1) Общаться с самыми разными людьми' + '\n' +
            '2) Cнимать фильмы, писать книги, рисовать, выступать на сцене и т.д.' + '\n' +
            '3) Заниматься расчетами, вести документацию.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'В книге или кинофильме меня больше всего привлекает:' + '\n' +
            '1) Bозможность следить за ходом мыслей автора' + '\n' +
            '2) Художественная форма, мастерство писателя или режиссера' + '\n' +
            '3) Сюжет, действия героев.');
        arr[0] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Меня больше обрадует Нобелевская премия:' + '\n' +
            '1) За общественную деятельность' + '\n' +
            '2) В области науки' + '\n' +
            '3) В области искусства');
        arr[1] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Я скорее соглашусь стать:' + '\n' +
            '1) Главным механиком' + '\n' +
            '2) Начальником экспедиции' + '\n' +
            '3) Главным бухгалтером');
        arr[2] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Будущее людей определяют:' + '\n' +
            '1) Взаимопонимание между людьми' + '\n' +
            '2) Научные открытия' + '\n' +
            '3) Развитие производства');
        arr[3] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Если я стану руководителем, то в первую очередь займусь:' + '\n' +
            '1) Созданием дружного, сплоченного коллектива' + '\n' +
            '2) Разработкой новых технологий обучения' + '\n' +
            '3) Работой с документами');
        arr[4] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'На технической выставке меня больше привлечет:' + '\n' +
            '1) Внутреннее устройство экспонатов' + '\n' +
            '2) Их практическое применение' + '\n' +
            '3) Внешний вид экспонатов (цвет, форма)');
        arr[5] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'В людях я ценю, прежде всего:' + '\n' +
            '1) Дружелюбие и отзывчивость' + '\n' +
            '2) Смелость и выносливость' + '\n' +
            '3) Обязательность и аккуратность');
        arr[6] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'В свободное время мне хотелось бы:' + '\n' +
            '1) Ставить различные опыты, эксперименты' + '\n' +
            '2) Писать стихи, сочинять музыку или рисовать' + '\n' +
            '3) Тренироваться');
        arr[7] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'В заграничных поездках меня скорее заинтересует:' + '\n' +
            '1) Возможность знакомства с историей и культурой другой страны' + '\n' +
            '2) Экстремальный туризм (альпинизм, виндсерфинг, горные лыжи)' + '\n' +
            '3) Деловое общение');
        arr[8] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Мне интереснее беседовать о:' + '\n' +
            '1) Человеческих взаимоотношениях' + '\n' +
            '2) Новой научной гипотезе' + '\n' +
            '3) Технических характеристиках новой модели машины, компьютера');
        arr[9] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Если бы в моей школе было всего три кружка, я бы выбрал(а):' + '\n' +
            '1) Технический' + '\n' +
            '2) Музыкальный' + '\n' +
            '3) Спортивный');
        arr[10] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'В школе следует обратить особое внимание на:' + '\n' +
            '1) Улучшение взаимопонимания между учителями и учениками' + '\n' +
            '2) Поддержание здоровья учащихся, занятия спортом' + '\n' +
            '3) Укрепление дисциплины');
        arr[11] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Я с большим удовольствием смотрю:' + '\n' +
            '1) Научно-популярные фильмы' + '\n' +
            '2) Программы о культуре и искусстве' + '\n' +
            '3) Спортивные программы');
        arr[12] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Мне хотелось бы работать:' + '\n' +
            '1) С детьми или сверстниками' + '\n' +
            '2) С машинами, механизмами' + '\n' +
            '3) С объектами природы');
        arr[13] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Школа в первую очередь должна:' + '\n' +
            '1) Учить общению с другими людьми' + '\n' +
            '2) Давать знания' + '\n' +
            '3) Обучать навыкам работы');
        arr[14] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Главное в жизни:' + '\n' +
            '1) Иметь возможность заниматься творчеством' + '\n' +
            '2) Вести здоровый образ жизни' + '\n' +
            '3) Тщательно планировать свои дела');
        arr[15] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Государство должно в первую очередь заботиться о:' + '\n' +
            '1) Защите интересов и прав граждан' + '\n' +
            '2) Достижениях в области науки и техники' + '\n' +
            '3) Материальном благополучии граждан');
        arr[16] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Мне больше всего нравятся уроки:' + '\n' +
            '1) Труда' + '\n' +
            '2) Физкультуры' + '\n' +
            '3) Математики');
        arr[17] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Мне интереснее было бы:' + '\n' +
            '1) Заниматься сбытом товаров' + '\n' +
            '2) Изготавливать изделия' + '\n' +
            '3) Планировать производство товаров');
        arr[18] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'Я предпочитаю читать статьи о:' + '\n' +
            '1) Выдающихся ученых и их открытиях' + '\n' +
            '2) Интересных изобретениях' + '\n' +
            '3) Жизни и творчестве писателей, художников, музыкантов');
        arr[19] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'В свободное время я люблю:' + '\n' +
            '1) Читать, думать, рассуждать' + '\n' +
            '2) Что-нибудь мастерить, шить, ухаживать за животными, растениями' + '\n' +
            '3) Ходить на выставки, концерты, в музеи');
        arr[20] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №23:' + '\n' + 'Больший интерес у меня вызовет сообщение о:' + '\n' +
            '1) Научном открытии' + '\n' +
            '2) Художественной выставке' + '\n' +
            '3) Экономической ситуации');
        arr[21] = parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №24:' + '\n' + 'Я предпочту работать:' + '\n' +
            '1) В помещении, где много людей' + '\n' +
            '2) В необычных условиях' + '\n' +
            '3) В обычном кабинете');
        arr[22] = parseInt(body);
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        arr[23] = parseInt(body);
        var arr_res = checkInclination(...arr);
        var max = Math.max(...arr_res);
        var inclinations = determineInclination(max, ...arr_res);
        var type = detInclination(...arr_res);
        updateTemper(userId, 'inclination', type, max);
        reply('Ваш результат:');
        reply(inclinations);
        arr = [];
    }
);

var verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0;

bot.addScene('aggression', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для диагностики агрессивного поведения.')
        reply('В тесте 40 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Введите:' + '\n' +
              '1, если согласны с утверждением' + '\n' +
              '2, если не согласны');
        reply('Вопрос №1:' + '\n' + 'Во время спора я часто повышаю голос.');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Если меня кто-то раздражает, я могу сказать ему все, что о нем думаю.');
        if (body == '1') { verbalAgg += parseInt(body); };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Если мне необходимо будет прибегнуть к физической силе ' + 
        'для защиты своих прав, я, не раздумывая, сделаю это.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Когда я встречаю неприятного мне человека, ' +
        'я могу позволить себе незаметно ущипнуть или толкнуть его.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Увлекшись спором с другим человеком, я могу ' +
        'стукнуть кулаком по столу, чтобы привлечь к себе внимание или доказать свою правоту.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Я постоянно чувствую, что другие не уважают мои права.');
        if (body == '1') { objectiveAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Вспоминая прошлое, порой мне бывает обидно за себя.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Хотя я и не подаю вида, иногда меня гложет зависть.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Если я не одобряю поведение своих знакомых, то я прямо ' +
        'говорю им об этом.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'В сильном гневе я употребляю крепкие выражения, сквернословлю.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Если кто-нибудь поднимет на меня руку, я постараюсь ' + 
        'ударить его первым.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Я бываю настолько взбешен, что швыряю разные предметы.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'У меня часто возникает потребность переставить ' +
        'в квартире мебель или полностью сменить ее.');
        if (body == '1') { objectiveAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'В общении с людьми я часто чувствую себя «пороховой бочкой», ' +
        'которая постоянно готова взорваться.');
        if (body == '1') { objectiveAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Порой у меня появляется желание зло пошутить над другим человеком.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Когда я сердит, то обычно мрачнею.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'В разговоре с человеком я стараюсь его внимательно выслушать, не перебивая.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'В молодости у меня часто «чесались кулаки» и я всегда был готов пустить их в ход.');
        if (body == '2') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Если я знаю, что человек намеренно меня толкнул, то дело может дойти до драки.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Творческий беспорядок на моем рабочем столе позволяет мне эффективно работать.');
        if (body == '1') { physicalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'Я помню, что бывал настолько сердитым, что хватал все, что попадало под руку, и ломал.');
        if (body == '2') { objectiveAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'Иногда люди раздражают меня только одним своим присутствием.');
        if (body == '1') { objectiveAgg += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №23:' + '\n' + 'Я часто удивляюсь, какие скрытые причины заставляют другого человека ' +
        'делать мне что-нибудь хорошее.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №24:' + '\n' + 'Если мне нанесут обиду, то у меня пропадет желание разговаривать ' +
        'с кем бы, то ни было.');
        if (body == '2') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №25:' + '\n' + 'Иногда я намеренно говорю гадости о человеке, которого не люблю.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №26:' + '\n' + 'Когда я взбешен, я кричу самое злобное ругательство.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №27:' + '\n' + 'В детстве я избегал драться.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №28:' + '\n' + 'Я знаю, по какой причине и когда можно кого-нибудь ударить.');
        if (body == '2') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №29:' + '\n' + 'Когда я взбешен, то могу хлопнуть дверью.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №30:' + '\n' + 'Мне кажется, что окружающие люди меня не любят.');
        if (body == '1') { objectiveAgg += parseInt(body); };    
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №31:' + '\n' + 'Я постоянно делюсь с другими своими чувствами и переживаниями.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №32:' + '\n' + 'Очень часто своими словами и действиями я сам себе приношу вред.');
        if (body == '2') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №33:' + '\n' + 'Когда люди орут на меня, я отвечаю тем же.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №34:' + '\n' + 'Если кто-нибудь ударит меня первым, я в ответ ударю его.');
        if (body == '1') { verbalAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №35:' + '\n' + 'Меня раздражает, когда предметы лежат не на своем месте.');
        if (body == '1') { physicalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №36:' + '\n' + 'Если мне не удается починить сломавшийся или порвавшийся ' +
        'предмет, то я в гневе ломаю или рву его окончательно.');
        if (body == '1') { objectiveAgg += parseInt(body); }; 
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №37:' + '\n' + 'Другие люди мне всегда кажутся преуспевающими.');
        if (body == '1') { objectiveAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №38:' + '\n' + 'Когда я думаю об очень неприятном мне человеке, я могу прийти ' +
        'в возбуждение от желания причинить ему зло.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №39:' + '\n' + 'Иногда мне кажется, что судьба сыграла со мной злую шутку.');
        if (body == '1') { emotionalAgg += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №40:' + '\n' + 'Если кто-нибудь обращается со мной не так, как следует, ' +
        'я очень расстраиваюсь по этому поводу.');
        if (body == '1') { selfAgg += parseInt(body); };
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '1') { selfAgg += parseInt(body); };
        var total = verbalAgg + physicalAgg + objectiveAgg + emotionalAgg + selfAgg;
        var choice = checkAggression(total);
        var sanity = determineSanity('aggression', choice);
        updateResult(userId, 'aggression', total, sanity);
        reply('Общий уровень агрессии: ' + total);
        reply(checkChoice(9, choice));
        verbalAgg = 0, physicalAgg = 0, objectiveAgg = 0, emotionalAgg = 0, selfAgg = 0;
        total = 0;
    }
);

bot.addScene('lifestyle', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для диагностики вашего образа жизни.')
        reply('В тесте 25 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Введите:' + '\n' +
              '1, если согласны с утверждением' + '\n' +
              '2, если не согласны');
        reply('Вопрос №1:' + '\n' + 'Регулярно ли Вы едите свежие фрукты и овощи?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Ограничиваете ли Вы себя в употреблении животных жиров?');
        if (body == '1') { counter += 3; };  
    },//
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Регулярно ли Вы едите волокнистую пищу, хлеб грубого помола или из отрубей?');
        if (body == '1') { counter += 5; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Ограничиваете ли Вы себя в употреблении сахара?');
        if (body == '1') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Умеете ли Вы отдыхать и расслабляться?');
        if (body == '1') { counter += 3; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Есть ли у Вас развлечения, помимо работы?');
        if (body == '1') { counter += 5; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Нравится ли Вам Ваша работа?');
        if (body == '1') { counter += 4; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Есть ли у Вас друг, которому Вы полностью доверяете?');
        if (body == '1') { counter += 4; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Есть ли у Вас любимый человек?');
        if (body == '1') { counter += 3; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Считаете ли Вы, что должны быть более ответственны на работе?');
        if (body == '1') { counter += 4; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Вы считаете, что должны брать на себя меньше обязательств?');
        if (body == '2') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Часто ли Вы испытываете скуку?');
        if (body == '2') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Вы курите?');
        if (body == '2') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Вы курите меньше полпачки в день?');
        if (body == '2') { counter += 6; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Употребляете ли Вы алкоголь?' + '\n' +
              'Введите 1, если не употребляете' + '\n' +
              'Введите 2, если употребляете иногда' + '\n' +
              'Введите 3, если употребляете каждый день');
        if (body == '1') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Сколько Вы весите?' + '\n' +
              'Введите 1, если ваш вес в норме' + '\n' +
              'Введите 2, если ваш вес выше нормы не более, чем на 6 кг' + '\n' +
              'Введите 3, если ваш вес выше нормы не менее, чем на 6 кг и менее, чем на 12 кг' + '\n' +
              'Введите 4, если ваш вес выше нормы на более, чем 12 кг');
        if (body == '1') { counter += 3; }
        else if (body == '2') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Регулярно ли Вы делаете зарядку?');
        if (body == '1') { counter += 5; }
        else if (body == '2') { counter += 4; }
        else if (body == '3') { counter += 2; }
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Вы занимаетесь зарядкой, пока не заболят мышцы?');
        if (body == '1') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Нужно ли Вам снотворное, чтобы уснуть? ');
        if (body == '2') { counter += 1; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Всегда ли Вы застегиваете ремень безопасности в машине?');
        if (body == '2') { counter += 1; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'Часто ли Вы вынуждены покупать лекарства?');
        if (body == '1') { counter += 1; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'Проверяете ли Вы хоть иногда свое артериальное давление?');
        if (body == '2') { counter += 2; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №23:' + '\n' + 'Бывают ли у Вас постоянные болезненные симптомы и ' +
        'Вы при этом не обращаетесь к врачу?');
        if (body == '1') { counter += 1; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №24:' + '\n' + 'Занимаетесь ли Вы опасными видами спорта?');
        if (body == '2') { counter += 5; };  
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №25:' + '\n' + 'Часто ли Вы беспокоитесь или волнуетесь?');
        if (body == '2') { counter += 3; };  
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '2') { counter += 5; };
        var choice = checkLifeStyle(counter);
        var sanity = determineSanity('lifestyle', choice);
        updateResult(userId, 'lifestyle', counter, sanity);
        reply('Вы набрали: ' + counter);
        reply(checkChoice(10, choice));
        counter = 0;
    }
);

bot.addScene('temper', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест для определения типа характера.')
        reply('В тесте 20 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе по 2 варианта ответа. Вводите 1 или 2.');
        reply('Вопрос №1:' + '\n' + 'Что Вы предпочитаете?' + '\n' +
              '1) Немного близких друзей' + '\n' +
              '2) Большую товарищескую компанию');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Какие книги Вы предпочитаете читать?' + '\n' +
              '1) С занимательным сюжетом' + '\n' +
              '2) С раскрытием переживаний другого');
        if (body == '2') { counter += parseInt(body); };      
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Что вы скорее можете допустить в работе?' + '\n' +
              '1) Опоздание' + '\n' +
              '2) Ошибки');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Если Вы совершаете дурной поступок, то:' + '\n' +
              '1) Остро переживаете' + '\n' +
              '2) Острых переживаний нет');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Как Вы сходитесь с людьми?' + '\n' +
                '1) Быстро, легко' + '\n' +
                '2) Медленно, осторожно');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Считаете ли Вы себя обидчивым?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Склонны ли Вы смеяться от души?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Вы считаете себя:' + '\n' +
                '1) Молчаливым' + '\n' +
                '2) Разговорчивым');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Откровенны ли Вы или скрытны?' + '\n' +
                '1) Откровенен' + '\n' +
                '2) Скрытен');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Любите ли Вы заниматься анализом своих переживаний?' + '\n' +
              '1) Да' + '\n' +
              '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Находясь в обществе, Вы предпочитаете:' + '\n' +
              '1) Говорить' + '\n' +
              '2) Слушать');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Часто ли Вы переживаете недовольство собой?' + '\n' +
              '1) Да' + '\n' +
              '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Любите ли Вы что-нибудь организовывать?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Хотелось бы Вам вести интимный дневник?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Быстро ли Вы переходите от решения к выполнению?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Легко ли меняется Ваше настроение?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Любите ли Вы убеждать других, навязывать свои взгляды?' + '\n' +
                '1) Да' + '\n' +
                '2) Нет');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Ваши движения:' + '\n' +
              '1) Быстры' + '\n' +
              '2) Медленны');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Вы беспокоитесь о возможных неприятностях?' + '\n' +
              '1) Часто' + '\n' +
              '2) Редко');
        if (body == '1') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'В затруднительных случаях Вы:' + '\n' +
              '1) Спешите обратиться за помощью' + '\n' +
              '2) Не обращаетесь');
        if (body == '2') { counter += parseInt(body); };
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '1') { counter += parseInt(body); };
        var result = counter * 5;
        var choice = determineTemper(result);
        var type = checkTemper(choice);
        updateTemper(userId, 'temper', type, result)
        reply('Вы набрали: ' + result);
        reply(checkChoice(11, choice));
        counter = 0;
    }
);

var neuroticism = 0, lie = 0, introversion = 0;

bot.addScene('eysenck', 
    ({ reply, scene: { next } }) => {
        next();
        reply('Вы выбрали тест Айзенка')
        reply('В тесте 57 вопросов. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных ответов')
        reply('Введите:' + '\n' +
              '1, если согласны с утверждением' + '\n' +
              '2, если не согласны');
        reply('Вопрос №1:' + '\n' + 'Тебе нравится находиться в шумной и веселой компании?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №2:' + '\n' + 'Часто ли ты нуждаешься в помощи других ребят?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Когда тебя о чем-либо спрашивают, ты чаще всего быстро находишь ответ?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №4:' + '\n' + 'Бываешь ли ты очень сердитым, раздражительным?');
        if (body == '1') { lie += 1, introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №5:' + '\n' + 'Часто ли у тебя меняется настроение?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №6:' + '\n' + 'Бывает ли такое, что тебе иногда больше нравится быть одному, ' +
        'чем встречаться с другими ребятами?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №7:' + '\n' + 'Тебе иногда мешают уснуть разные мысли?');
        if (body == '2') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Ты всегда выполняешь все сразу, так, как тебе говорят?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №9:' + '\n' + 'Любишь ли ты подшучивать над кем-нибудь?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Было ли когда-нибудь так, что тебе становится грустно без особой причины?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Можешь ли ты сказать о себе, что ты вообще веселый человек?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Ты когда-нибудь нарушал правила поведения в школе?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №13:' + '\n' + 'Бывает ли так, что иногда тебя почти все раздражает?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №14:' + '\n' + 'Тебе нравилась бы такая работа, где все надо делать очень быстро?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №15:' + '\n' + 'Было ли когда-нибудь так, что тебе доверили тайну, ' +
        'а ты по каким-либо причинам не смог ее сохранить?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №16:' + '\n' + 'Ты можешь без особого труда развеселить компанию скучающих ребят?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Бывает ли так, что твое сердце начинает сильно биться, ' +
        'даже если ты почти не волнуешься?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №18:' + '\n' + 'Если ты хочешь познакомиться с другим мальчиком или девочкой, ' +
        'то ты всегда первым начинаешь разговор?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №19:' + '\n' + 'Ты когда-нибудь говорил неправду?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №20:' + '\n' + 'Ты очень расстраиваешься, когда тебя ругают за что-нибудь?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №21:' + '\n' + 'Тебе нравится шутить и рассказывать веселые истории своим друзьям?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №22:' + '\n' + 'Ты иногда чувствуешь себя усталым без особой причины?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №23:' + '\n' + 'Ты всегда выполняешь то, что тебе говорят старшие?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №24:' + '\n' + 'Ты, как правило, всегда бываешь всем доволен?');
        if (body == '1') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №25:' + '\n' + 'Можешь ли ты сказать, что ты чуть-чуть более обидчивый человек, чем другие?');
        if (body == '1') { introversion += 1; };
    },//
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №26:' + '\n' + 'Тебе всегда нравится играть с другими ребятами?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №27:' + '\n' + 'Было ли когда-нибудь так, что тебя попросили дома помочь по хозяйству, ' +
        'а ты по какой-то причине не смог этого сделать?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №28:' + '\n' + 'Бывает ли, что у тебя без особой причины кружится голова?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №29:' + '\n' + 'У тебя временами бывает такое чувство, что тебе все надоело?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №30:' + '\n' + 'Ты любишь иногда похвастать?');
        if (body == '1') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №31:' + '\n' + 'Бывает ли такое, что, находясь в обществе других ребят, ' +
        'ты чаще всего молчишь?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №32:' + '\n' + 'Ты обычно быстро принимаешь решения?');
        if (body == '2') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №33:' + '\n' + 'Ты шутишь иногда в классе, особенно если там нет учителя?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №34:' + '\n' + 'Тебе временами снятся страшные сны?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №35:' + '\n' + 'Можешь ли ты веселиться, не сдерживая себя, в компании других ребят?');
        if (body == '2') { lie += 1, neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №36:' + '\n' + 'Бывает ли, что ты так волнуешься, что не можешь усидеть на месте?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №37:' + '\n' + 'Тебя вообще легко обидеть или огорчить?');
        if (body == '2') { lie += 1, neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №38:' + '\n' + 'Случалось ли тебе говорить о ком-либо плохо?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №39:' + '\n' + 'Можешь ли ты сказать о себе, что ты беззаботный человек?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №40:' + '\n' + 'Если ты оказываешься в глупом положении, то ты потом долго расстраиваешься?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №41:' + '\n' + 'Ты всегда ешь все, что тебе дают?');
        if (body == '2') { neuroticism += 1; };
    },//
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №42:' + '\n' + 'Когда тебя о чем-то просят, тебе всегда трудно отказывать?');
        if (body == '1') { lie += parseInt(body); };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №43:' + '\n' + 'Ты любишь часто ходить в гости?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №44:' + '\n' + 'Был ли хотя бы раз в твоей жизни случай, когда тебе было очень плохо?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №45:' + '\n' + 'Бывало ли такое, чтобы ты когда-нибудь грубо разговаривал с родителями?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №46:' + '\n' + 'Как ты думаешь, тебя считают веселым человеком?');
        if (body == '2') { lie += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №47:' + '\n' + 'Ты часто отвлекаешься, когда делаешь уроки?');
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №48:' + '\n' + 'Бывает ли такое, что тебе не хочется принимать участие в общем веселье?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №49:' + '\n' + 'Говоришь ли ты иногда первое, что приходит в голову?');
        if (body == '2') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №50:' + '\n' + 'Ты почти всегда уверен, что справишься с делом, за которое взялся?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №51:' + '\n' + 'Бывает, что ты чувствуешь себя одиноким?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №52:' + '\n' + 'Ты обычно стесняешься заговаривать первым с незнакомыми людьми?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №53:' + '\n' + 'Ты часто спохватываешься, когда уже поздно?');
        if (body == '2') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №54:' + '\n' + 'Когда кто-либо кричит на тебя, ты тоже кричишь в ответ?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №55:' + '\n' + 'Бывает ли, что ты становишься очень веселым или печальным, ' +
        'без особой причины?');
        if (body == '1') { introversion += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №56:' + '\n' + 'Тебе иногда кажется, что трудно получить настоящее ' + 
        'удовольствие от компании ребят?');
        if (body == '2') { neuroticism += 1; };
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №57:' + '\n' + 'На тебя влияет погода?');
        if (body == '2') { introversion += 1; }
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        if (body == '1') { neuroticism += 1; };
        var choice = checkEyseckCircle(introversion, neuroticism);
        var type = checkTemperType(choice);
        updateEysenck(userId, type, neuroticism, lie);
        reply('Ваш результат:' + '\n' + 
              'Интроверсия: ' + introversion + '\n' +
              'Стабильность: ' + neuroticism + '\n' + 
              'Достоверность: ' + lie);
        reply(checkChoice(12, choice));
        introversion = 0, neuroticism = 0, lie = 0;
    }
);

bot.addScene('feedback',
    ({ reply, scene: { next } }) => {
        next();
        reply('Оставьте свое сообщение с пожеланием об исправлении ошибки или ' +
        'добавлении новой функции в программе:');
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        addFeedback(userId, body);
        reply('Спасибо, мы вас услышали!');
    }
);

bot.command('Регистрация', ({ scene: { join } }) => join('registration'));
bot.command('Депрессия', ({ scene: { join } }) => join('depression'));
bot.command('Реактивная', ({ scene: { join } }) => join('anxiety1'));
bot.command('Личностная', ({ scene: { join } }) => join('anxiety2'));
bot.command('Стресс', ({ scene: { join } }) => join('stress'));
bot.command('Мотивация', ({ scene: { join } }) => join('motivation'));
bot.command('Выгорание', ({ scene: { join } }) => join('burnout'));
bot.command('Склонность', ({ scene: { join } }) => join('inclination'));
bot.command('Агрессия', ({ scene: { join } }) => join('aggression'));
bot.command('Образ жизни', ({ scene: { join } }) => join('lifestyle'));
bot.command('Темперамент', ({ scene: { join } }) => join('temper'));
bot.command('Тест Айзенка', ({ scene: { join } }) => join('eysenck'));
bot.command('feedback', ({ scene: { join } }) => join('feedback'));

bot.event('group_join', (msg) => {
    msg.reply('Спасибо, что стали пользователем нашего бота. Мы постараемся вам помочь!');
});

bot.command('help', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом' + '\n' +
    'feedback – оставить пожелание для модификации');
});

bot.command('Help', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом' + '\n' +
    'feedback – оставить пожелание для модификации');
});

bot.command('помощь', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом' + '\n' +
    'feedback – оставить пожелание для модификации');
});

bot.command('Помощь', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом' + '\n' +
    'feedback – оставить пожелание для модификации');
});

bot.command('start', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
    userId = msg.user_id;
    createResult(userId);
});

bot.command('Start', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
    userId = msg.user_id;
    createResult(userId);
});

bot.command('старт', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
    userId = msg.user_id;
    createResult(userId);
});

bot.command('Старт', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
    userId = msg.user_id;
    createResult(userId);
});

bot.command('admin', (msg) => {
    msg.reply('Приветствуем вас в админ панеле:', null, admin_keyboard);
});

bot.command('Психологи', (msg) => {
    msg.reply('Список контактов доступных специалистов:', null, shrinks_keyboard);
});

bot.command('Дефектологи', (msg) => {
    msg.reply('Список контактов доступных специалистов:', null, defects_keyboard);
});

bot.command('Пройти тест', (msg) => {
    msg.reply('Выберите тест: ', null, test_keyboard);
});

bot.command('Получить помощь', (msg) => {
    msg.reply('Список контактов доступных специалистов:', null, staff_keyboard);
});

bot.command('Тревожность', (msg) => {
    msg.reply('Сделайте более конкретный выбор:' + '\n' + 
        'Реактивная тревожность – тревожность, как состояние' + '\n' +
        'Личностная тревожность – тревожность, как свойство личности', null, anxiety_keyboard);
});

bot.command('Пожелания', (msg) => {
    if (feedback_records === undefined || feedback_records.length == 0) {
        msg.reply('Список пожеланий пуст ...');
    }
    else msg.reply(feedback_records);
    // тут нужно будет вытащить все содержимое коллекции feedback из mongodb 
});

bot.command('Татьяна Чапала', (msg) => {
    msg.reply(contacts[0]);
});
bot.command('Мария Илич', (msg) => {
    msg.reply(contacts[1]);
});
bot.command('Юлия Петрова', (msg) => {
    msg.reply(contacts[2]);
});
bot.command('Оксана Зотова', (msg) => {
    msg.reply(contacts[3]);
});
bot.command('Алина Гельметдинова', (msg) => {
    msg.reply(contacts[4]);
});

bot.catch((msg,err) => {
    console.error(msg, err);
});

/*
bot.hears((msg) => {
    console.log(msg);
});
*/

server.use(bodyParser.json());

server.post('/', bot.listen);


server.listen(process.env.PORT || 5000, () => console.log('Server is running ... '));
setInterval(function () { server.get('http://bot-antidep.herokuapp.com/'); }, 300000);