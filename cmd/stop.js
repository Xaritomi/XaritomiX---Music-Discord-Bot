exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel) {
    return message.reply("You must be in a voicechannel to use this command");
  }

    if (!client.playlists.has(message.guild.id)) return message.channel.send("I am not playing any music");
    client.playlists.get(message.guild.id).restart = false;
    client.playlists.get(message.guild.id).paused = false;
    let queue = client.playlists.get(message.guild.id);
    queue.songs = [];
    queue.dispatcher.end();
    message.guild.voiceConnection.disconnect();
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cq', 'stop'],
  permLevel: 0
};

exports.help = {
  name: "clearqueue",
  description: "will clear all songs in the queue and disconnect",
  usage: "clearqueue"
};
