const Markup = require('node-vk-bot-api/lib/markup');

const SEX_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "М"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Ж"
        },
        color: "positive"
    })]
])

module.exports = SEX_BUTTONS