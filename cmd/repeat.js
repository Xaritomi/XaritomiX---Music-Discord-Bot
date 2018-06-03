exports.run = (client, message, args) => {
  if (client.playlists.get(message.guild.id).restart == false) {
    client.playlists.get(message.guild.id).restart = true;
    return message.channel.send(`Repeat has been set to: **On**`);

  }
  if (client.playlists.get(message.guild.id).restart == true) {
    client.playlists.get(message.guild.id).restart = false;
    return message.channel.send(`Repeat has been set to: **Off**`);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "repeat",
  description: "Will repeat the current song playing",
  usage: "info"
};
