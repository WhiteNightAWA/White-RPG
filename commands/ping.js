const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const Functions = require("../functions");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latency!'),
    async execute(interaction) {
        let embed = new MessageEmbed()
            .setTitle("Pong!")
            .setColor(Functions.getRandomColor())
            .addField(
                "Latency:", `\`${interaction.createdTimestamp - Date.now()}\`ms`, true
            )
            .addField(
                "API Latency:", `\`${Math.round(interaction.client.ws.ping)}\`ms`, true
            )
        await interaction.reply({ embeds: [embed] });
    },
};
