module.exports = {
    name: 'ready',
    once: true,
    execute: async function (client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const permissions = [
            {
                id: "963678769174958110",
                type: "ROLE",
                permission: true
            }
        ]
        await client.guilds.cache.get("855370450309611532").commands.fetch()
            .then(commands => {
                commands.forEach(async c => {
                    if (client.commands.get(c.name).data.defaultPermission === false) {
                        await c.permissions.add({ permissions })
                    }
                })
            })
            .catch(console.error);
    },
};