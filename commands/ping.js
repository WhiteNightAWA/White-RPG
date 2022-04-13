const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const User = require("../user");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latency!')
        .setDefaultPermission(false),
    async execute(interaction) {
        try {
            let embed = new MessageEmbed()
                .setTitle(":ping_pong: Pong!")
                .setColor("RANDOM")
                .addField(
                    "Latency:", `\`${Date.now() - interaction.createdTimestamp}\`ms`, true
                )
                .addField(
                    "API Latency:", `\`${Math.round(interaction.client.ws.ping)}\`ms`, true
                )
                .setTimestamp(new Date())
            await interaction.reply({ embeds: [embed] });
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
