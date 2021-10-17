const Markup = require('node-vk-bot-api/lib/markup');

const BURNOUT_BUTTONS = Markup.keyboard([
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
            label: "Очень редко"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Редко"
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
            label: "Очень часто"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Каждый день"
        },
        color: "positive"
    })]
])

module.exports = BURNOUT_BUTTONS