const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const fs = require("fs");

dotenv.config();


const registerCommands = function () {
    let commands = []
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        let command = require(`./commands/${file}`).data.toJSON();
        commands.push(command);
    }

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(
                Routes.applicationGuildCommands(process.env.ID, process.env.GUILD),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

}

module.exports.registerCommands = registerCommands;
