const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const auth = require('./auth.json');
client.on('ready', () => {
         console.log(`Logged in as ${client.user.tag}!`);
         });

client.on('message', msg => {
         if (msg.content === 'ping') {
                  msg.reply('pong');
                  }
         });
client.on('message', msg => {
        const args = msg.content.split(' ');
        const command = args.shift().toLowerCase();
        if (command === 'say') {
                if(!args.length) {
                        return msg.channel.send("no arguments");
                }
                var VC = msg.member.voiceChannel;
                if (!VC)
                        return msg.reply("Member not in a voice channel!");
                if (fs.existsSync("./resources/"+args[0]+".mp3")){
                        VC.join()
                        .then(connection => {
                                if (fs.existsSync("./resources/"+args[0]+".mp3")){
                                        const dispatcher = connection.playFile('./resources/'+args[0]+'.mp3');
                                        dispatcher.on("end", end => {VC.leave()});
                                }
                        })
                        .catch(console.error);
                }
        }
});
client.login(auth.token);
