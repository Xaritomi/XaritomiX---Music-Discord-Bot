const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = async (client, message, args) => {
  if (!client.playlists.has(message.guild.id)) return message.channel.send("There is nothing in the queue");
  var queue = client.playlists.get(message.guild.id).songs;
    var indexList = 0;
    var pages = 1;
    let firstSong = queue[0].songTitle;
    let totalSongHours = 0;
    let totalSongMinutes = 0;
    let totalSongSeconds = 0;
    console.log(firstSong);
    if (client.playlists.get(message.guild.id).songs.length > 11) var pages = queue.length / 10;

    var pagesFloor = Math.floor(pages);
    var currentPage = 1;
    if (!client.playlists.has(message.guild.id)) return message.channel.send("The queue is empty");

    for (var x = 0; x < queue.length; x++) {
      totalSongHours += client.playlists.get(message.guild.id).songs[x].hours;
      totalSongMinutes += client.playlists.get(message.guild.id).songs[x].minutes;
      totalSongSeconds += client.playlists.get(message.guild.id).songs[x].seconds;
    }

    let totalSeconds = totalSongSeconds;
    totalSeconds += totalSongMinutes * 60;
    totalSeconds += totalSongHours * 3600;
    async function fancyTimeFormat(time)
    {   
      // Hours, minutes and seconds
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";

      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    }
    // let minutes = Math.floor(totalSeconds / 60);
    // let seconds = totalSeconds - minutes * 60;
    // let hours = Math.floor(totalSeconds / 3600);
    // totalSecondsNew = totalSeconds - hours * 3600
    // message.channel.send(totalSecondsNew)
    const time = await fancyTimeFormat(totalSeconds)

    function chunkArray(myArray, chunk_size){
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];

      for (index = 0; index < arrayLength; index += chunk_size) {
          myChunk = myArray.slice(index, index+chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
      }

      return tempArray;
    }
    if (client.playlists.get(message.guild.id).songs.length < 11) {
      var queueResult = client.playlists.get(message.guild.id).songs

      const embed = {
        "description": `${queueResult.map(songs => `**${++indexList}** -**${songs.songTitle} (${songs.hours}:${songs.minutes}:${songs.seconds})** - **${songs.requester}**`).join("\n\n")    }`,
        "color": 13632027,
        "footer": {
          "text": `Total Pages: ${pagesFloor}. You are on page ${currentPage}`
        },
        "author": {
          "name": `Server Queue for: ${message.guild.name}`,
        },
        "fields": [
          {
            "name": "__Now Playing:__",
            "value": `**${firstSong}**`
          },
          {
            "name": "Total Queue Time",
            "value": `${time}`,
            "inline": true
          },
          {
            "name": "Total Queue Size",
            "value": `${client.playlists.get(message.guild.id).songs.length}`,
            "inline": true
          },
          {
            "name": "Repeat / Paused",
            "value": `\`${client.playlists.get(message.guild.id).restart}\` / \`${client.playlists.get(message.guild.id).paused}\``,
            "inline": true
          }
        ]
      };
      return message.channel.send({ embed });

    }

    if (client.playlists.get(message.guild.id).songs.length >= 12) {
    var queueResult = chunkArray(queue, 10);
    if (parseInt(args) > Math.floor(queueResult.length)) return message.channel.send(`That is a invalid page number: There are only: ${Math.floor(queueResult.length)} pages`);
    
    if (args.length > 0) {
      let indexNext = 10;
      if (parseInt(args) >= 3) {
        indexNext = indexNext * args;
        indexNext = indexNext - 10;
      }
      const embed = {
        "description": `${queueResult[parseInt(args[0]) - 1].map(songs => `**${++indexList + indexNext}** -**${songs.songTitle} (${songs.hours}:${songs.minutes}:${songs.seconds})** - **${songs.requester}**`).join("\n\n")    }`,
        "color": 13632027,
        "footer": {
          "text": `Total Pages: ${Math.floor(queueResult.length)}. You are on page ${args[0]}`
        },
        "author": {
          "name": `Server Queue for: ${message.guild.name}`,
        },
        "fields": [
          {
            "name": "__Now Playing:__",
            "value": `**${firstSong}**`
          },
          {
            "name": "Total Queue Time",
            "value": `${time}`,
            "inline": true
          },
          {
            "name": "Total Queue Size",
            "value": `${client.playlists.get(message.guild.id).songs.length}`,
            "inline": true
          },
          {
            "name": "Repeat / Paused",
            "value": `\`${client.playlists.get(message.guild.id).restart}\` / \`${client.playlists.get(message.guild.id).paused}\``,
            "inline": true
          }
        ]
      };
      console.log("2")
      return message.channel.send({ embed });

    }
  }

    const embed = {
      "description": `${queueResult[0].map(songs => `**${++indexList}** -**${songs.songTitle} (${songs.hours}:${songs.minutes}:${songs.seconds})** - **${songs.requester}**`).join("\n\n")    }`,
      "color": 13632027,
      "footer": {
        "text": `Total Pages: ${Math.floor(queueResult.length)}. You are on page ${currentPage}`
      },
      "author": {
        "name": `Server Queue for: ${message.guild.name}`,
      },
      "fields": [
        {
          "name": "__Now Playing:__",
          "value": `**${firstSong}**`
        },
        {
          "name": "Total Queue Time",
          "value": `${time}`,
          "inline": true
        },
        {
          "name": "Total Queue Size",
          "value": `${client.playlists.get(message.guild.id).songs.length}`,
          "inline": true
        },
        {
          "name": "Repeat / Paused",
          "value": `\`${client.playlists.get(message.guild.id).restart}\` / \`${client.playlists.get(message.guild.id).paused}\``,
          "inline": true
        }
      ]
    };
    console.log("3" + " " + args.length);
    message.channel.send({ embed });

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['q'],
  permLevel: 0
};

exports.help = {
  name: "queue",
  description: "Will display current queue",
  usage: "queue"
};
