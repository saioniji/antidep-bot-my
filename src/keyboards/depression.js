const Markup = require('node-vk-bot-api/lib/markup');

const DEPRESSION_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Никогда"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Иногда"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Часто"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Всегда"
        },
        color: "positive"
    })]
])

module.exports = DEPRESSION_BUTTONS