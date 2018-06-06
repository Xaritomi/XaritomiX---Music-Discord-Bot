# XaritomiX

This is a simple but feature full music discord bot which can be installed on any system which has Node 8.0.0 and over. This bot 
is able to play music from YouTube (Providing you have a YouTube API) either from a LINK or SEARCH TERMS. In addition, the bot is able to play
music on multiple servers at the same time, and it also incorperates a per-server configuration.

# Configuration
All the settings that can be changed can be located in the example.settings.json

    "BOT_Token": "Put your bot token here", - This is the TOKEN that is generated when you make a Bot account with discord
    "Default_Prefix": "!", - This is the default prefix that every new server will get by default. This can be changed.
    "YTAPI": "Put API here", - This is where the youtube API will go - Needed for music
    "OwnerID": "Please put your discord username ID here (Developer mode must be enabled)", - This is where your discord ID will go. To find this please enable Developer mode within your                                                                                              Discord Settings
    "ModLog": "mod-log",
    "BotCommandChannel": "Bot",
    "AdminRole": "Administrators",
    "ModRole": "Moderators",
    "MemberRole": "Members",
    "DefaultMusicVolume": "20"



# How To Install

Make sure you download the latest version of Node


Clone the repo with git https://github.com/Xaritomi/XaritomiX---Music-Discord-Bot.git


in command line, in the same directory as where the bot is, type npm install


Now, fill in all the information in the example_settings.json - Rename to settings.json


Now start the bot with node app.js

