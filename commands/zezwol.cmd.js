const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../config.json');
var prefix = config.prefix;
var parrotzy_ver = config.version;

module.exports.run = async (bot,message,args) => {
    console.log(args)
    if(message.member.voice.channel){
        if(message.member.voice.channel.name.includes("Pokój "+message.member.user.username)){
            if(args.length==1){
                let member = message.mentions.members.first();
                if(member){
                    message.member.voice.channel.createOverwrite(member, {
                        CONNECT: true
                      }).then(osoba => {
                        var kanal = message.channel;
                        const exampleEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('SUKCES')
                        .setDescription(`**${member.user.tag}** ma teraz dostęp do twojego kanału!`)
                        .setTimestamp()
                        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                        kanal.send(exampleEmbed); 
                      })
                        .catch(console.error);
                } else{
                    var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Oznacz poprawną osobę, której chcesz dać dostęp do kanału!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);    
                }
            } else{
                var kanal = message.channel;
                const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Oznacz jedną osobę, której chcesz dać dostęp do kanału!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);
            }
        } else{
            var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie możesz dać dostępu do tego kanału! (BRAK UPRAWNIEŃ)`)
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
    name: 'zezwol',
    description: 'Test command'
} 
    
         
               