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
                if(member==message.member){
                    var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie możesz siebie wyrzucić!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed); 
                }else{
                if(member){
                    if(member.voice.channel){
                        if(member.voice.channel.name.includes("Pokój "+message.member.user.username)){
                            member.voice.kick("Wyrzucono z kanału.");
                            var kanal = message.channel;
                            const exampleEmbed = new MessageEmbed()
                            .setColor('#00FF00')
                            .setTitle('SUKCES')
                            .setDescription(`Poprawnie wyrzucono **${member.user.tag}** z kanału`)
                            .setTimestamp()
                            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                            kanal.send(exampleEmbed);   
                        } else{
                            var kanal = message.channel;
                            const exampleEmbed = new MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('BŁĄD')
                            .setDescription(`Ta osoba nie jest na twoim kanale!`)
                            .setTimestamp()
                            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                            kanal.send(exampleEmbed);   
                        }
                    } else{
                        var kanal = message.channel;
                        const exampleEmbed = new MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle('BŁĄD')
                        .setDescription(`Ta osoba nie jest na twoim kanale!`)
                        .setTimestamp()
                        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                        kanal.send(exampleEmbed);   
                    }
                } else{
                    var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Oznacz poprawną osobę do wyrzucenia!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);    
                }
            }
            } else{
                var kanal = message.channel;
                const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Oznacz jedną osobę do wyrzucenia!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);
            }
        } else{
            var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie możesz wyrzucać osób z tego kanału! (BRAK UPRAWNIEŃ)`)
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
    name: 'wyrzuc',
    description: 'Test command'
} 
    
         
               