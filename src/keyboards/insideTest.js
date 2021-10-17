const Markup = require('node-vk-bot-api/lib/markup');

const INSIDE_TEST_BUTTONS = Markup.keyboard([
    [Markup.button({
        action: {
            type: "text",
            label: "Другой тест"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Главное меню"
        },
        color: "negative"
    })]
])

module.exports = INSIDE_TEST_BUTTONS