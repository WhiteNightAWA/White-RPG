const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const Functions = require("../functions");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('here')
        .setDescription('here'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle("Get roles!")
            .setColor("GREEN")
        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("getMemberRole")
                    .setLabel("Member Role")
                    .setStyle("SUCCESS")
            )
        await interaction.channel.send({ embeds: [embed], components: [row1] });
    },
};
