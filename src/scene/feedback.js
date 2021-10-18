const Scene = require('node-vk-bot-api/lib/scene');
const {addFeedback} = require("../repository/FeedbackRepository");

const feedback = new Scene('feedback',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Оставьте свое сообщение с пожеланием об исправлении ошибки или ' +
            'добавлении новой функции в программе:');
    },
    (ctx) => {
        ctx.scene.leave();
        addFeedback(ctx.message.user_id, ctx.message.body);
        ctx.reply('Спасибо, мы вас услышали!');
    }
);

module.exports = feedback