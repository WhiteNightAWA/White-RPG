module.exports = {
    name: 'ready',
    once: true,
    execute: function (bot) {
        console.log(`Ready! Logged in as ${bot.user.tag}`);
    },
};