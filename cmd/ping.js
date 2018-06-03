exports.run = (client, message, args) => {

    message.channel.send(`Pong! Your Latency is ${new Date().getTime() - message.createdTimestamp}ms` + `. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "ping",
  description: "Will test your connection to the bot",
  usage: "ping"
};
