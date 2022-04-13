const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, Collection} = require("discord.js");
const Functions = require("../functions");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload All slash commands.'),
    async execute(interaction) {
        try {
            if (interaction.member.roles.cache.has("963678769174958110")) {
                Functions.reloadCommands(interaction.client)
                await interaction.reply({
                    embeds: [new MessageEmbed({
                        description: ":white_check_mark: Successfully reloaded commands.",
                        color: "RED",
                        timestamp: Date()
                    })]
                })
            } else {
                await interaction.reply({
                    embeds: [new MessageEmbed({
                        description: ":x: You do not have enough permissions: <@&963678769174958110>",
                        color: "RED",
                        timestamp: Date()
                    })]
                })
            }
        }
        catch (err) {
            try {
                await interaction.reply({content: `There was an error while executing this command! \`\`\`${err}\`\`\``, ephemeral: true});
            } catch (err) {
                await interaction.editReply({content: `There was an error while executing this command! \`\`\`${err}\`\`\``, ephemeral: true});

            }
        }
    },
};
