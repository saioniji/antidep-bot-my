const Markup = require('node-vk-bot-api/lib/markup');

const ANXIETY_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Реактивная"
        },
        color: "positive"
    })],
   [ Markup.button({
        action: {
            type: "text",
            label: "Личностная"
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

module.exports = ANXIETY_BUTTONS