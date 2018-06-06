exports.run = (client, message, args) => {
    let currentQueue = client.playlists.get(message.guild.id).songs;
    let newQueue = shuffle(currentQueue);
    currentQueue = [];
    currentQueue = newQueue;
    message.channel.send("Shuffle has began...");
    client.playlists.get(message.guild.id).dispatcher.end();


    function shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
    
            counter--;
    
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    
        return array;
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
  
exports.help = {
    name: "shuffle",
    description: "I will take the current queue and shuffle it",
    usage: "shuffle"
};