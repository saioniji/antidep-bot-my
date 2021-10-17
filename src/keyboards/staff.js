const Markup = require('node-vk-bot-api/lib/markup');

const STAFF_BUTTONS = Markup.keyboard([
   [ Markup.button({
        action: {
            type: "text",
            label: "Психологи"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Дефектологи"
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

module.exports = STAFF_BUTTONS