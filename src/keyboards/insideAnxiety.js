const Markup = require('node-vk-bot-api/lib/markup');

const INSIDE_ANXIETY_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Нет, это не так"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Пожалуй так"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Верно"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Совершенно верно"
        },
        color: "positive"
    })]
])

module.exports = INSIDE_ANXIETY_BUTTONS