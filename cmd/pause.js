exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel) return message.reply("You must be in a voicechannel to use this command");

  if (client.playlists.get(message.guild.id).dispatcher.paused) return message.reply("Playback has already been paused");
  client.playlists.get(message.guild.id).paused = true;
  message.channel.sendMessage("Stream has been paused");
  client.playlists.get(message.guild.id).dispatcher.pause();
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "pause",
  description: "I will pause the current song",
  usage: "pause"
};
