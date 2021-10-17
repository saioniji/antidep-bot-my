const Markup = require('node-vk-bot-api/lib/markup');

const AGREEMENT_BUTTONS = Markup.keyboard([
    Markup.button({
        action: {
            type: "text",
            label: "Тест"
        },
        color: "secondary"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Главное меню"
        },
        color: "negative"
    })
])

module.exports = AGREEMENT_BUTTONS