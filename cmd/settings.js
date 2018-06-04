exports.run = (client, message, args) => {

    const serverSettings = client.serverSettings.get(message.guild.id);
    let setting = args[0];
    let options = args[1];
    
    if (!args[0]) {
        const embed = {
            "color": 13632027,
            "author": {
            "name": `Server Settings for: \`${message.guild.name}\``
            },
            "fields": [
            {
                "name": `Please change these to your liking`,
                "value": `
\`Prefix:\` **${serverSettings.prefix}**
\`ModLogChannel:\` **${serverSettings.modLogChannel}**
\`AdminRole:\` **${serverSettings.AdminRole}**
\`ModRole:\` **${serverSettings.ModRole}**
\`MemberRole:\` **${serverSettings.MemberRole}**
\`BotRoom:\` **${serverSettings.BotRoom}**
\`DefaultMusicStartingVolume:\` **${serverSettings.DefaultMusicVolume}**
\`DisplayNextSong:\` **${serverSettings.DisplayNextSong}**                
`
            }
            ]
        };
        message.channel.send({ embed });
    } else if  (setting == "Prefix") {
       serverSettings.prefix = options; 
       message.channel.send(`Prefix has been updated to \`${serverSettings.prefix}\``);
        updateServerSettings(client)
    } else if (setting == "ModLogChannel") {
        serverSettings.modLogChannel = options;
        message.channel.send(`ModLogChannel has been updated to \`${serverSettings.modLogChannel}\``);
        updateServerSettings(client)
    } else if (setting == "AdminRole") {
        serverSettings.AdminRole = options;
        message.channel.send(`AdminRole has been updated to \`${serverSettings.AdminRole}\``);
        updateServerSettings(client)
    } else if (setting == "ModRole") {
        serverSettings.ModRole = options;
        message.channel.send(`ModRole has been updated to \`${serverSettings.ModRole}\``);
        updateServerSettings(client);
    } else if (setting == "MemberRole") {
        serverSettings.MemberRole = options;
        message.channel.send(`MemberRole has been updated to \`${serverSettings.MemberRole}\``);
        updateServerSettings(client)
    } else if (setting == "BotRoom") {
        serverSettings.BotRoom = options;
        message.channel.send(`BotRoom has been updated to \`${serverSettings.BotRoom}\``);
        updateServerSettings(client);
    } else if (setting == "DefaultMusicStartingVolume") {
        serverSettings.DefaultMusicVolume = options;
        message.channel.send(`DefaultMusicStartingVolume has been updated to \`${serverSettings.DefaultMusicVolume}\``);
        updateServerSettings(client);
    } else if (setting == "DisplayNextSong") {
        serverSettings.DisplayNextSong = options;
        message.channel.send(`DisplayNextSong has been updated to \`${serverSettings.DisplayNextSong}\``);
        updateServerSettings(client);
    }

    function updateServerSettings(client) {
        client.serverSettings.set(message.guild.id, serverSettings);
    }
  
}
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "settings",
    description: "Will list the server settings",
    usage: "settings <setting> <option>"
};
  