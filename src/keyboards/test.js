const Markup = require('node-vk-bot-api/lib/markup');

const TEST_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Депрессия"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Тревожность"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Стресс"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Мотивация"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Выгорание"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Склонность"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Агрессия"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Образ жизни"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Темперамент"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Тест Айзенка"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Отмена"
        },
        color: "negative"
    })]
])

module.exports = TEST_BUTTONS