const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        try {
            switch (interaction.customId) {
                case "getMemberRole":
                    const memberRole = interaction.guild.roles.cache.get("855389666642362378")
                    interaction.member.roles.add(memberRole, "clicked add role button")
                    await interaction.reply({
                        embeds: [new MessageEmbed({
                            description: `:white_check_mark: Successfully added <@&855389666642362378> to <@${interaction.user.id}>`
                        })],
                        ephemeral: true })
                    break;
            }

        } catch (error) {
            console.error(error);
            await interaction.reply({content: `There was an error while executing this command! \`\`\`${error}\`\`\``, ephemeral: true});
        }
    },
};