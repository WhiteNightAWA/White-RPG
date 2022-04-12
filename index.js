const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');
const deploy = require("./deploy-commands")

deploy.registerCommands()

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Commands handling
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Events Handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN).then();
