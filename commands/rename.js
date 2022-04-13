const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require("dotenv");
const discordModals = require('discord-modals');
const {Modal, TextInputComponent} = require("discord-modals");
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rename')
        .setDescription('Test Command'),
    async execute(interaction) {
        try {
            const modal = new Modal() // We create a Modal
                .setCustomId('rename')
                .setTitle('Rename yourself')
                .addComponents([
                    new TextInputComponent()
                        .setCustomId('renameText')
                        .setLabel('New nickname')
                        .setStyle('SHORT')
                        .setMinLength(1)
                        .setPlaceholder("")
                        .setRequired(true),
                ]);

            let client = interaction.client;
            await discordModals.showModal(
                modal, {
                    client, interaction
                }
            )
        }
        catch (err) {
            try {
                await interaction.reply({content: `There was an error while executing this command! \`\`\`${err}\`\`\``, ephemeral: true});
            } catch (err) {
                await interaction.editReply({content: `There was an error while executing this command! \`\`\`${err}\`\`\``, ephemeral: true});

            }
        }
    }
};
