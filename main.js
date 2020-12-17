const { logStart } = require('./src/external');
const express = require('express');
const bodyParser = require('body-parser');
const { Botact } = require('botact');

const server = express();

var bot;
if (process.env.VK_TOKEN) {

    bot = new Botact({
        token: process.env.VK_TOKEN,
        confirmation: process.env.CONFIRM_KEY,
        redis: true,
        redisConfig: {
            host: process.env.REDISTOGO_URL,
            port: process.env.PORT
        }
    });
}
else {
    const config = require('./src/config.json');
    bot = new Botact({
        token: config.VK_TOKEN,
        confirmation: config.CONFIRM_KEY,
        redis: true,
        redisConfig: {
            host: '127.0.0.1',
            port: 6379
        }
    });
}

logStart();

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
                    label: 'Пройти тест'
                },
                color: 'primary'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button2'
                    },
                    label: 'Получить помощь'
                },
                color: 'primary'
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
                        button: 'button3' 
                    },
                    label: 'Депрессия'
                },
                color: 'primary'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button4'
                    },
                    label: 'Тревожность'
                },
                color: 'primary'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button5'
                    },
                    label: 'Стресс'
                },
                color: 'primary'
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
                        button: 'button6' 
                    },
                    label: 'Реактивная'
                },
                color: 'primary'
            },
            {
                action: {
                    type: 'text',
                    payload: {
                        button: 'button7'
                    },
                    label: 'Личностная'
                },
                color: 'primary'
            },
        ]
    ]
};

var counter = 0;
var counter_reverse = 0; 
var counter_direct = 0;
var sex;

const { reverseScore, checkDepression, checkAnxiety, checkStress, checkChoice } = require("./src/external");
const { createClient } = require('http');


bot.addScene('depression',
    ({ reply, scene: { next } }) => {
        next();
        reply('Прочитайте внимательно каждый вопрос, долго не задумывайтесь, ' +
              'поскольку правильных или неправильных ответов нет.');
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
        reply('Вы набрали: ' + counter);
        reply(checkChoice(1, choice));
        counter = 0;
    }
);

bot.addScene('anxiety1',
    ({ reply, scene: { next } }) => {
        next();
        reply('Внимательно читайте вопросы и долго' +
              'не задумывайтесь, поскольку правильных или неправильных ответов нет.');
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №3:' + '\n' + 'Я нахожусь в напряжении');
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №10:' + '\n' + 'Я испытываю чувство внутреннего удовлетворения');
        counter_direct += parseInt(body);
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №11:' + '\n' + 'Я уверен в себе');
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №12:' + '\n' + 'Я нервничаю');
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №17:' + '\n' + 'Я озабочен');
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter_reverse += reverseScore(parseInt(body));
        var result = counter_direct - counter_reverse + 50;
        var choice = checkAnxiety(result);
        reply('Вы набрали: ' + result);
        reply(checkChoice(2, choice));
        counter = 0;
    }
);

bot.addScene('anxiety2',
    ({ reply, scene: { next } }) => {
        next();
        reply('Внимательно читайте вопросы и долго ' +
              'не задумывайтесь, поскольку правильных или неправильных ответов нет.');
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
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { next } }) => {
        next();
        reply('Вопрос №8:' + '\n' + 'Ожидаемые трудности обычно очень тревожат меня');
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
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
        counter_reverse += reverseScore(parseInt(body));
    },
    ({ reply, body, scene: { leave } }) => {
        leave();
        counter_direct += parseInt(body);
        var result = counter_direct - counter_reverse + 35;
        var choice = checkAnxiety(result);
        reply('Вы набрали: ' + result);
        reply(checkChoice(3, choice));
        counter = 0;
    }
);

bot.addScene('stress',
    ({ reply, scene: { next } }) => {
        next();
        reply('Над вопросами долго не задумывайтесь, поскольку правильных или неправильных ответов нет.');
        reply('В каждом вопросе введите число от 1 до 4, где:' + '\n' +
              '1 – Да, согласен' + '\n' +
              '2 – Скорее, согласен' + '\n' + 
              '3 – Скорее, не согласен' + '\n' + 
              '4 - Нет, не согласен');
        reply('Укажите свой пол:' + '\n' + 
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
        reply('Вы набрали: ' + result);
        reply(checkChoice(4, choice));
        counter = 0;
    }
);

bot.command('Депрессия', ({ scene: { join } }) => join('depression'));
bot.command('Реактивная', ({ scene: { join } }) => join('anxiety1'));
bot.command('Личностная', ({ scene: { join } }) => join('anxiety2'));
bot.command('Стресс', ({ scene: { join } }) => join('stress'));

bot.event('group_join', (msg) => {
    msg.reply('Спасибо, что стали пользователем нашего бота. Мы постараемся вам помочь!');
});

bot.command('help', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом');
});
bot.command('Help', (msg) => {
    msg.sendMessage(msg.user_id, 'Список доступных команд: ' + '\n' +
    'start – начать взаимодействие с ботом');
});

bot.command('start', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
});
bot.command('Start', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
});
bot.command('Старт', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
});
bot.command('старт', (msg) => {
    msg.reply('Здравствуйте, вы бы хотели пройти тестирование или связаться со специалистом?', null, keyboard);
});

bot.command('Пройти тест', (msg) => {
    msg.reply('Выберите тест: ', null, test_keyboard);
});

bot.command('Получить помощь', (msg) => {
    msg.sendMessage(msg.user_id, 'Да поможет вам бог, мы еще не знаем номер телефона');
    
});

bot.command('Тревожность', (msg) => {
    msg.reply('Сделайте более конкретный выбор:' + '\n' + 
        'Реактивная тревожность – тревожность, как состояние' + '\n' +
        'Личностная тревожность – тревожность, как свойство личности', null, anxiety_keyboard);
});

bot.catch((msg,err) => {
    console.error(msg, err);
});

/*
// check input message
bot.on((msg) => {
    console.log(msg.body);
});
*/

server.use(bodyParser.json());

server.post('/', bot.listen);

// добавить команду 'call admin' для отправки сигнала мне
// добавить информационную страницу в браузере приложения
// добавить базу данных для хранения результатов
// result: { stress: { score: xx, date: new Date }  }
// пофиксить ошибку в тесте про депрессию в вопросе №6 для женского пола
// нужно добавить вопрос про пол в начале и сделать 2 варианта вопроса в 6 вопросе

server.listen(process.env.PORT || 5000, () => console.log('Server is running ... '));
setInterval(function () { server.get('https://bot-antidep.herokuapp.com/'); }, 300000);