const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const Functions = require("../functions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("test command")
            .addIntegerOption(option =>
                option
                    .setName('number')
                    .setDescription('time wait')
                    .setRequired(true)
            ),
    async execute(interaction) {
        try {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            let number = interaction.options.getInteger("number");
            let numbers = [...Array(number).keys()];
            let now = 0;
            await interaction.reply({ embeds: [new MessageEmbed({
                    description: Functions.getProcess(now, number, 20)
                })]
            })
            for (const c of numbers) {
                await sleep(1000)
                now++
                await interaction.editReply({
                    embeds: [new MessageEmbed({
                        description: Functions.getProcess(now, number, 20)
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
    }
}