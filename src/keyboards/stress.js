const Markup = require('node-vk-bot-api/lib/markup');

const STRESS_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Да, согласен"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Скорее, согласен"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Скорее, не согласен"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Нет, не согласен"
        },
        color: "positive"
    })]
])

module.exports = STRESS_BUTTONS