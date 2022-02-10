const Markup = require('node-vk-bot-api/lib/markup');

const DEFAULT_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Регистрация"
        },
        color: "secondary"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Анкета"
        },
        color: "secondary"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Пройти тест"
        },
        color: "secondary"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Получить помощь"
        },
        color: "secondary"
    })]
])

module.exports = DEFAULT_BUTTONS