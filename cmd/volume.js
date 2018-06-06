exports.run = (client, message, args) => {
  // const userRole = message.guild.roles.find("name", "Admin");
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel) {
    return message.reply("You must be in a voicechannel to use this command");
  }

  let vol = args.join(" ");
  if (!vol) return message.channel.sendMessage(`Current volume is: ${client.playlists.get(message.guild.id).volume}%`);
  if (vol < 0 || vol > 200) {
    return message.reply("Volume must be a value between 0% and 200%");
  }

  client.playlists.get(message.guild.id).volume = vol;
  const dispatcher = client.playlists.get(message.guild.id).dispatcher;
  dispatcher.setVolume(client.playlists.get(message.guild.id).volume / 100);
  message.channel.send(`Setting volume to **__${client.playlists.get(message.guild.id).volume}%__** for server: **__${message.guild.name}__**`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['vol'],
  permLevel: 0
};

exports.help = {
  name: "volume",
  description: "Will set the volume of the bot",
  usage: "volume <0 - 100>"
};
