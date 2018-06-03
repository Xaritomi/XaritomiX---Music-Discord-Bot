exports.run = (client, message, args) => {
    if (!args[0]) {
      const embed = {
      "description": "This is a full list of all my commands.",
      "color": 1666666,
      "footer": {
        "text": `For additional command usage, ${client.serverSettings.get(message.guild.id).prefix}help <command>`
      },
      "author": {
        "name": "XaritomiX Help",
      },
      "fields": [
        {
          "name": "Music Commands",
          "value": "`Play` `Summon` `Skip` `Pause` `Repeat` `restartSong` `Stop` `Volume` `Shuffle`"
        },
        {
          "name": "Admin Commands",
          "value": "`Restart` `settings` `clear` `help`"
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
