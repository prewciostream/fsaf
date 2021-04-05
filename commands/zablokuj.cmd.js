const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../config.json');
var prefix = config.prefix;
var parrotzy_ver = config.version;

module.exports.run = async (bot,message,args) => {
    console.log(args)
    if(message.member.voice.channel){
        if(message.member.voice.channel.name.includes("Pokój "+message.member.user.tag)){
            let voiceChannel = message.member.voice.channel;
            voiceChannel.createOverwrite(message.guild.roles.everyone, {
                CONNECT: false,
                VIEW_CHANNEL: false
              })
                .then(channel => console.log(channel.permissionOverwrites.get(message.guild.roles.everyone)))
                .catch(console.error);
            var kanal = message.channel;
            const exampleEmbed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('SUKCES')
            .setDescription(`Zablokowano kanał!`)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
            kanal.send(exampleEmbed);  
        } else{
            var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie możesz zablokować tego kanału! (BRAK UPRAWNIEŃ)`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);   
        }
    } else{
        var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie jesteś na kanale głosowym!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);   
    }
}
module.exports.help = {
    name: 'zablokuj',
    description: 'Zablokuj kanał głosowy'
} 
    
         
               