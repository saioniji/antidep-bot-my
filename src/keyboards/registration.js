const Markup = require('node-vk-bot-api/lib/markup');

const REGISRATION_BUTTONS = Markup.keyboard([
    Markup.button({
        action: {
            type: "text",
            label: "Регистрация"
        },
        color: "secondary"
    })
])

module.exports = REGISRATION_BUTTONS