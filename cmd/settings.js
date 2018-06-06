exports.run = (client, message, args) => {

    const serverSettings = client.serverSettings.get(message.guild.id);
    
    
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
\`ModLogChannel:\` **${serverSettings.modlogchannel}**
\`AdminRole:\` **${serverSettings.adminrole}**
\`ModRole:\` **${serverSettings.modrole}**
\`MemberRole:\` **${serverSettings.memberrole}**
\`BotRoom:\` **${serverSettings.botroom}**
\`DefaultMusicStartingVolume:\` **${serverSettings.defaultmusicvolume}**
\`DisplayNextSong:\` **${serverSettings.displaynextsong}**                
`
            }
            ]
        };
        message.channel.send({ embed });
    } else {
        let selector = args[0].toLowerCase();
        let options = args[1];
        updateSettings(client, serverSettings, selector, options, message);
    }
  
}

function updateSettings(client, serverSettings, selector, options, message) {

    serverSettings[selector] = options;
    message.channel.send(`**${selector.toUpperCase()}** has been updated to \`${options.toUpperCase()}\``);
    client.serverSettings.set(message.guild.id, serverSettings);
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
  