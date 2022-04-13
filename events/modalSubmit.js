const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'modalSubmit',
    execute: async function (modal) {
        try {
            switch (modal.customId) {
                case "rename":
                    const response = modal.getTextInputValue("renameText");
                    let nick;
                    if (modal.member.nickname === null) {
                        nick = modal.user.username
                    } else {
                        nick = modal.member.nickname
                    }
                    await modal.member.setNickname(response)
                    await modal.reply({
                        embeds: [new MessageEmbed({
                            description: ":white_check_mark: Successfully edited nickname.\n" +
                                `\`${nick}\` ==> \`${response}\``,
                            color: "GREEN",
                            timestamp: Date()
                        })]
                    })
                    break;
            }
        } catch (error) {
            console.error(error);
            await modal.reply({content: `There was an error while executing this command! \`\`\`${error}\`\`\``, ephemeral: true});
        }
    }
}