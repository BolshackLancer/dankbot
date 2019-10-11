const Discord = require('discord.js');
const auth = require('auth.json');
const fs = require('fs');
const client = new Discord.Client();
client.on('ready', () => {
         console.log(`Logged in as ${client.user.tag}!`);
         });

client.on('message', msg => {
         if (msg.content === 'ping') {
                  msg.reply('pong');
                  }
         });
client.on('message', msg => {
        if (msg.content === 'questionable') {
                var VC = msg.member.voiceChannel;
                if (!VC)
                        return msg.reply("Member not in a voice channel!");
                VC.join()
                        .then(connection => {
                                if (fs.existsSync("./resources/questionable.mp3")){
                                const dispatcher = connection.playFile('./resources/questionable.mp3');
                                }
                                dispatcher.on("end", end => {VC.leave()});
                        })
                        .catch(console.error);
        }
});

client.login(auth.token);