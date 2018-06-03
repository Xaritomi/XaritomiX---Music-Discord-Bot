const prefix = require("../config.json").prefix;
exports.run = (client, message, args) => {
    if (!args[0]) {
      const embed = {
      "description": "This is a full list of all my commands. If you would like additionaly help, feel free to visit https://xaritomix.me/commands for a detailed summary of each command.",
      "url": "https://discordapp.com",
      "color": 1666666,
      "footer": {
        "icon_url": `${client.user.avatarURL}`,
        "text": `For additional command usage, ${client.serverSettings.get(message.guild.id).prefix}help <command>`
      },
      "author": {
        "name": "XaritomiX Help",
        "url": "https://xaritomix.me",
        "icon_url": `${client.user.avatarURL}`
      },
      "fields": [
        {
          "name": "Music Commands",
          "value": "`Play` | `Search` | `Skip` | `Pause` | `Repeat` | `restartSong` | `Stop` | `Volume`"
        },
        {
          "name": "Action Commands",
          "value": "`Cuddle` | `Highfive` | `Great` | `Holdhands` | `Kiss` | `Lewd` | `Meow` | `Pat` | `Poke` | `Slap` | `Smile` | `Tickle` | `Lmgtfy`"
        },
        {
          "name": "Game Commands",
          "value": "`RPS` | `Guess The Character`| `Trivia`"
        },
        {
          "name": "Info Commands",
          "value": "`Anime` | `Urban` | `Google` | `Help` | `Invite` | `Ping` | `Server Info` | `Stats` | `Userinfo`"
        },
        {
          "name": "Utility Commands",
          "value": "`Schedule` | `StopWatch` | `Summon`"
        },
        {
          "name": "Currency Commands",
          "value": "`Profile` | `Daily` | `Leaderboard` | `Hunt` | `Balance`"
        },
        {
          "name": "Moderation Commands - Will require a minimum of PermLevel 2 or higher",
          "value": "`Kick` | `Ban` | `Addrole` | `Reload` | `Delrole` | `Createinv` | `Promote` | `Demote` | `Mute` | `Unmute` | `Lockdown` | `Softban` | `Createvchan` | `Createtchan` | `Delvchan` | `Deltchan` | `modRole` | `adminRole` | `stv` | `wmessage` | `modchannel`"
        }
      ]
    };
    message.channel.send({ embed });
  } else {
    let command = args[0];
    if(client.commands.has(command)) {
      command = client.commands.get(command);
      const embed = {
        "color": 1666666,
        "author": {
          "name": `Command: \`${command.help.name}\``,
          "url": `https://xaritomix.me/${command.help.name}`,
          "icon_url": `${client.user.avatarURL}`
        },
        "fields": [
          {
            "name": `Permission level required`,
            "value": `${command.conf.permLevel}`
          },
          {
            "name": "Description",
            "value": `${command.help.description}`
          },
          {
            "name": "Usage",
            "value": `${command.help.usage}`
          }
        ]
      };
      message.channel.send({ embed });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Will list all available commands",
  usage: "help [command]"
};
