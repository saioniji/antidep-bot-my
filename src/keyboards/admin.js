const Markup = require('node-vk-bot-api/lib/markup');

const ADMIN_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Пожелания"
        },
        color: "primary"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Пользователи"
        },
        color: "primary"
    })]
])

module.exports = ADMIN_BUTTONS