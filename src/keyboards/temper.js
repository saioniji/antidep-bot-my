const Markup = require('node-vk-bot-api/lib/markup');

const TEMPER_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "1"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "2"
        },
        color: "positive"
    })]
])

module.exports = TEMPER_BUTTONS