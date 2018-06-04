const Discord = require("discord.js");
const client = new Discord.Client
const settings = require("./settings.json");
const fs = require("fs");
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

const defaultSettings = {
    prefix: settings.Default_Prefix,
    modLogChannel: settings.ModLog,
    AdminRole: settings.AdminRole,
    ModRole: settings.ModRole,
    MemberRole: settings.MemberRole,
    BotRoom: settings.BotCommandChannel,
    DefaultMusicVolume: settings.DefaultMusicVolume,
    DisplayNextSong: true
}

client.playlists = new Map();
client.lockdown = new Discord.Collection();
client.maintenance = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.serverSettings = new Enmap({provider: new EnmapLevel({name: "ServerSettings"})});

fs.readdir("./cmd/", (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
      let props = require(`./cmd/${f}`);
      console.log(`Loading Command: ${props.help.name}. All Good`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("guildCreate", guild => {
    client.serverSettings.set(guild.id, defaultSettings);
    console.log(`Added ${guild.name} to memory`)
});

client.on("message", message => {
    let guild = message.guild;
    if (message.guild === null) return;
    if (!client.serverSettings.has(guild.id)) client.serverSettings.set(guild.id, defaultSettings);
    if (!message.content.startsWith(client.serverSettings.get(message.guild.id).prefix)) return;
    if (client.maintenance.has(message.guild.id) && message.author.id !== settings.OwnerID) return message.channel.send("Sorry, but i'm currently under maintenance.");
    let command = message.content.split(" ")[0].slice(client.serverSettings.get(message.guild.id).prefix.length);
    let args = message.content.split(" ").slice(1);
    let perms = client.permissions(message);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if (perms < cmd.conf.permLevel) return message.channel.send(`Im sorry, but this command requires a permission level of ${cmd.conf.permLevel} or higher.`);
    cmd.run(client, message, args, perms);
    }
});

client.on("ready", () => {
    console.log(`Wow, i\'m alive`);
    client.user.setGame(`${client.guilds.size}`);
});

client.on("error", console.error);
client.on("warn", console.warn);

client.login(settings.BOT_Token);

client.permissions = function(message) {
    let permlvl = 0;
    let member_role = message.guild.roles.find("name", client.serverSettings.get(message.guild.id).MemberRole);
    if (member_role && message.member.roles.has(member_role.id)) permlvl = 1;
    let mod_role = message.guild.roles.find("name", client.serverSettings.get(message.guild.id).ModRole);
    if(mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
    let admin_role = message.guild.roles.find("name", client.serverSettings.get(message.guild.id).AdminRole);
    if(admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
    if(message.author.id === settings.ownerid) permlvl = 4;
    return permlvl;
}

