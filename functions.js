const fs = require("node:fs");
const deploy = require("./deploy-commands");

function reloadCommands(client) {
    deploy.registerCommands()

    client.commands.sweep(() => true);

    fs.readdirSync("./commands").filter(file => file.endsWith(".js")).forEach(async (file) => {
        delete require.cache[require.resolve(`./commands/${file}`)];
        const command = require(`./commands/${file}`)
        await client.commands.set(command.data.name, command)
    });
}

function getProcess(now, full, length, showPer=false) {
    let bar = "`["
    let per = Math.round(now / full * length)
    let blank = length - per

    Array.from(Array(per)).forEach(() => {
        bar += "#"
    });
    Array.from(Array(blank)).forEach(() => {
        bar += " "
    });
    bar += "]`"
    if (showPer) {
        bar += ` ~${Math.round(now / full * 100)}%`
    }
    return bar;
}

module.exports = { reloadCommands, getProcess }
