const Scene = require('node-vk-bot-api/lib/scene');
const INCLINATION_BUTTONS = require("../keyboards/inclination");
const INSIDE_TEST_BUTTONS = require("../keyboards/insideTest");
const {updateTemper} = require("../repository/ResultRepository");
const {detInclination} = require("../external");
const {determineInclination} = require("../external");
const {checkInclination} = require("../external");

let arr = [];

const inclination = new Scene('inclination',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Вы выбрали тест для определения профессиональных склонностей.' + '\n' +
        'В тесте 24 вопроса. Не торопитесь отвечать на вопросы и не забывайте, ' +
            'что в тесте нет правильных и неправильных ответов' + '\n' +
            'Внимательно читайте вопросы и выберете число, соответствующее вашему варианту ответа' + '\n' +
            'В каждом вопросе будет по 3 варианта ответа. Введите 1, 2 или 3.' + '\n' +
            '\n' +
            'Вопрос №1:' + '\n' + 'Мне хотелось бы в своей профессиональной деятельности:' + '\n' +
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
        ctx.reply('Ваш результат:' + '\n' +
            + '\n' + inclinations + '\n' +
            '\n' +
        'Тест завершен. Выберите дальнейшее действие.', null, INSIDE_TEST_BUTTONS);
        arr = [];
    }
);

module.exports = inclination