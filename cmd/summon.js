exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    try {
        await voiceChannel.join();
        message.channel.send(`I have successfully joined: **__${voiceChannel.name}__**`);
    } catch (err) {
        message.channel.send(`I was unable to join your voice channel`);        
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['join'],
    permLevel: 0
  };
  
  exports.help = {
    name: "summon",
    description: "I will connect to the user who sends this commands voice channel",
    usage: "summon"
  };