const Discord = require("discord.js");
const config = require("../settings.json");
const ytdl = require("ytdl-core");
const ytapi = require("simple-youtube-api");
const youtube = new ytapi(config.YTAPI);


exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send("I'm sorry but you must be in the voice channel to request a song");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to the voice channel, please make sure i have the right permissions");
    if(!permissions.has("SPEAK")) return message.channel.send("I cannot speak in this voice channel, please make sure i have the correct permissions");
    const serverQueue = client.playlists.get(message.guild.id);
    let songRequest = args.join(" ");
    let index = 0;
    let song = null;
    let serverInfo = null;
    let videoIndex = 1;

    try {
        serverInfo = await youtube.searchVideos(songRequest, 5);
    } catch (err) {
        message.channel.send("Please provide a valid youtube link");
    }
    if (!songRequest.includes("playlist")) {

        if (!songRequest.includes("https")) {

            const embed = {
                "color": 13632027,
                "author": {
                "name": "Song Selection. "
                },
                "footer": {
                    "text": `This will timeout in 30 seconds. Type &cancel to cancel the search`
                },
                "fields": [
                {
                    "name": `Enter a number between 1 & 5.`,
                    "value": `${serverInfo.map(songSelection => `**${++index}** - **${songSelection.title.substring(0, 50)}**`).join("\n")}`
                }
                ]
            };
            message.channel.send({ embed });

            try {
                var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6 || msg2.content == "&cancel", {
                    maxMatches: 1,
                    time: 30000,
                    error: ['time']
                });
            } catch(err) {
                message.channel.send(`No value was given, cancelling the search`);
            }

            if (response.first().content == "&cancel") return message.channel.send(`Search has been **CANCELLED**`);

            videoIndex = parseInt(response.first().content);
    }


        song = await searchVideos(serverInfo, videoIndex, message);
        console.log(`Here are the songs: ${song.url}`);
    }



    if(!client.playlists.has(message.guild.id)) {

        client.playlists.set(message.guild.id, {
            loading: false,
            restart: false,
            dispatcher: null,
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: client.serverSettings.get(message.guild.id).startingMusicVolume,
            playing: true,
            paused: false,
            playlist: false
        });


        if (!songRequest.includes("playlist")) {
            client.playlists.get(message.guild.id).songs.push(song);
            console.log("pushed");
        }

        if (songRequest.includes("playlist")) {

            try {
                var connection = await voiceChannel.join();
                client.playlists.get(message.guild.id).connection = connection;
                return playlist(client, message, message.guild, songRequest);
            } catch (err) {
                client.playlists.delete(message.guild.id);
                console.log(`There was an error: ${err}`);
            }

        }
        try {
            var connection = await voiceChannel.join();
            message.channel.send(`Joining **${voiceChannel.name}** with a bitrate of **${voiceChannel.bitrate} Bits**`);
            client.playlists.get(message.guild.id).connection = connection;
            play(client, message, message.guild, client.playlists.get(message.guild.id).songs[0]);
        } catch (err) {
            client.playlists.delete(message.guild.id);
            console.log(`There was an error: ${err}`);
        }


    } else {
        if (songRequest.includes("playlist")) return playlist(client, message, message.guild, songRequest);
        client.playlists.get(message.guild.id).songs.push(song);
        message.channel.send(`**${song.songTitle} (${song.hours}:${song.minutes}:${song.seconds})** has been added to the queue`)
    }


}

async function searchVideos(serverInfo, videoIndex, message) {
    const duration = await youtube.getVideoByID(serverInfo[videoIndex - 1].id);
    console.log("11111111");
    console.log(duration.duration);

    song = {
        songTitle: serverInfo[videoIndex - 1].title,
        url: `https://youtube.com/watch?v=${serverInfo[videoIndex - 1].id}`,
        playTimeSeconds: duration.duration,
        hours: duration.duration.hours,
        requester: message.guild.member(message.author).displayName,
        minutes: duration.duration.minutes,
        seconds: duration.duration.seconds
    };
    console.log("22222222");
    console.log(song);

    return song;

}


async function playlist(client, message, guild, songRequest) {
    const playlist = await youtube.getPlaylist(songRequest);
    const videos = await playlist.getVideos();
    client.playlists.get(message.guild.id).loading = true;
    if (videos.length > 300) {
        message.channel.send(`Playlist limit is 300 songs or less, your playlist is ${videos.length}`);
        message.guild.voiceConnection.disconnect();
        client.playlists.delete(message.guild.id);
        return;
    }
    message.channel.send(`Found and added \`${videos.length}\` songs from \`${playlist.title}\` **NOTE** This wont be instant, depending on the size of the playlist`);
    for (var i = 0; i < videos.length; i++) {
        const duration = await youtube.getVideoByID(videos[i].id);
        client.playlists.get(message.guild.id).songs.push({

        songTitle: videos[i].title,
        url: `https://youtube.com/watch?v=${videos[i].id}`,
        playTimeSeconds: duration.duration,
        requester: message.guild.member(message.author).displayName,
        hours: duration.duration.hours,
        minutes: duration.duration.minutes,
        seconds: duration.duration.seconds

        });
    }

    if (client.playlists.get(message.guild.id).playlist === true) return;
    client.playlists.get(message.guild.id).playlist = true;
    console.log(client.playlists.get(message.guild.id).songs[3])
    setTimeout(() => {
       play(client, message, guild, client.playlists.get(message.guild.id).songs[0]);
    }, 500);
}

function play(client, message, guild, song) {
    const serverQueue = client.playlists.get(guild.id);

    if (!song) {
        client.playlists.get(message.guild.id).voiceChannel.leave();
        client.playlists.delete(message.guild.id);
        client.user.setGame(`/ For Zerene Network`);
        return message.channel.send("Queue Concluded");
    }
    client.playlists.get(message.guild.id).loading = false;

    const dispatcher = serverQueue.connection.playStream(ytdl(`${song.url}`));
    client.playlists.get(message.guild.id).dispatcher = dispatcher;
    dispatcher.setVolume(client.playlists.get(message.guild.id).volume / 100);
    if (client.playlists.get(message.guild.id).playlist == false) client.playlists.get(message.guild.id).playlist = true;
    client.user.setGame(`${song.songTitle}`);

    if (client.playlists.get(message.guild.id).restart === true) message.channel.send(`Replaying **${song.songTitle} (${song.hours}:${song.minutes}:${song.seconds})** - Requested by **${song.requester}**`);
    if (client.playlists.get(message.guild.id).restart === false) message.channel.send(`Now playing **${song.songTitle} (${song.hours}:${song.minutes}:${song.seconds})** - Requested by **${song.requester}**`);

    dispatcher.on("end", () => {
        if (client.playlists.get(message.guild.id).restart === true) {
            setTimeout(() => {
             play(client, message, guild, client.playlists.get(message.guild.id).songs[0]);
            }, 500);
            return
        }

        client.playlists.get(message.guild.id).songs.shift();
        setTimeout(() => {
             play(client, message, guild, client.playlists.get(message.guild.id).songs[0]);
        }, 500);

    });


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['request'],
    permLevel: 0
  };

  exports.help = {
    name: "play",
    description: "I will play the selected song",
    usage: "play <URL/SONG/PLAYLIST>"
  };
