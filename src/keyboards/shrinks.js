const Markup = require('node-vk-bot-api/lib/markup');

const SHRINKS_BUTTONS = Markup.keyboard([
   [ Markup.button({
        action: {
            type: "text",
            label: "Татьяна Чапала"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Мария Илич"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Юлия Петрова"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Оксана Зотова"
        },
        color: "positive"
    })],
    [Markup.button({
        action: {
            type: "text",
            label: "Юлия Галимова"
        },
        color: "positive"
    }),
    Markup.button({
        action: {
            type: "text",
            label: "Отмена"
        },
        color: "negative"
    })]
])

module.exports = SHRINKS_BUTTONS