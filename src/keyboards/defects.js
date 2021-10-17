const Markup = require('node-vk-bot-api/lib/markup');

const DEFECTS_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Алина Гельметдинов"
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

module.exports = DEFECTS_BUTTONS