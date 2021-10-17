const Markup = require('node-vk-bot-api/lib/markup');

const INCLINATION_BUTTONS = Markup.keyboard([
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
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "3"
        },
        color: "positive"
    })]
])

module.exports = INCLINATION_BUTTONS