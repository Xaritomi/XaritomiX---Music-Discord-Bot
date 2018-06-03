exports.run = (client, message, args) => {
    client.playlists.get(message.guild.id).restart = true;
    client.playlists.get(message.guild.id).dispatcher.end();
    setTimeout(()=> {
        client.playlists.get(message.guild.id).restart = false;
    }, 1000);
    
}
  
exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['rs'],
   permLevel: 0
};
  
exports.help = {
  name: "restartsong",
  description: "Will restart the song immediately",
  usage: "restartsong"
};
  