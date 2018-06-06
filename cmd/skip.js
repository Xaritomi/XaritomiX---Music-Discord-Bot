exports.run = (client, message, args) => {
  const skipNumber = args.join(" ");
  const skipAmount = parseInt(skipNumber);

  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel) {
    return message.reply("You must be in a voicechannel to use this command");
  }

  if (client.playlists.get(message.guild.id).loading == true) return message.channel.send(`Please wait for the songs to be loaded from the playlist`);
  if (skipAmount > client.playlists.get(message.guild.id).songs.length - 1) return message.channel.send(`You cannot skip to a song that isn\'t there`);

  if (skipNumber.length > 0) {
    for (var i = 0; i < skipAmount -1; i++) {
      client.playlists.get(message.guild.id).songs.shift()
    }

    client.playlists.get(message.guild.id).dispatcher.end();
    return message.channel.send(`Skipping ${skipNumber} songs`)
  }

    message.channel.send("⏮️ Skipping ⏭️️").then(()=>{
    return client.playlists.get(message.guild.id).dispatcher.end();
  });

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "skip",
  description: "Will skip the current song playing",
  usage: "skip <all - <x amount> - One by default"
};
