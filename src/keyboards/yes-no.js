const Markup = require('node-vk-bot-api/lib/markup');

const YES_NO_BUTTONS = Markup.keyboard([
    Markup.button({
        action: {
            type: "text",
            label: "Да"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Нет"
        },
        color: "negative"
    })
])

module.exports = YES_NO_BUTTONS