exports.run = (client, message, args) => {

    const serverSettings = client.serverSettings.get(message.guild.id);
    
    const embed = {
        "color": 13632027,
        "author": {
        "name": `Server Settings for: **${message.guild.name}**`
        },
        "fields": [
        {
            "name": `Please change these to your liking`,
            "value": `**Current Prefix:** ${serverSettings.prefix} \n**Mod Channel:** ${serverSettings.modLogChannel} \n**Moderator Role:** ${serverSettings.modRole} : PermLevel **2**\n**Admin Role:** ${serverSettings.adminRole} : PermLevel **3**\n**Welcome message** ${serverSettings.welcomeMessage} \n**Music Starting Volume** ${serverSettings.startingMusicVolume} \n**Currency** ${serverSettings.Currency} \n**Exp** ${serverSettings.Exp} \n**Announcements**: ${serverSettings.Announcements}`
        }
        ]
    };
    message.channel.send({ embed });
  
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
    usage: ""
};
  