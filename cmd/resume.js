exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel) {
    return message.reply("You must be in a voicechannel to use this command");
  }

  if (!client.playlists.get(message.guild.id).dispatcher.paused) return message.reply("Playback has not been paused");
  client.playlists.get(message.guild.id).paused = false;
  message.channel.sendMessage("Stream has been resumed");
  client.playlists.get(message.guild.id).dispatcher.resume();
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ru'],
  permLevel: 0
};

exports.help = {
  name: "resume",
  description: "Will resume the current song in the queue",
  usage: "resume"
};
