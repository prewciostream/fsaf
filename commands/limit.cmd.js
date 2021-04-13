const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../config.json');
var prefix = config.prefix;
var parrotzy_ver = config.version;

module.exports.run = async (bot,message,args) => {
    console.log(args)
    if(message.member.voice.channel){
        if(message.member.voice.channel.name.includes("Pokój "+message.member.user.tag)){
            if(args.length==1){
                if(!isNaN(args[0])&&args>=0&&args<100){
                    var kanal_vc = message.member.voice.channel;
                    try{
                        kanal_vc.edit({userLimit: args[0]})
                        var kanal = message.channel;
                        let limit = args[0];
                        if(args[0]==0){
                            limit = "Bez Limitu"
                        }
                        const exampleEmbed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('SUKCES')
                        .setDescription(`Zmieniono limit osób na ${limit}!`)
                        .setTimestamp()
                        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                        kanal.send(exampleEmbed);
                    }
                    catch{
                        console.error;
                    }
                } else{
                    var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Podaj poprawny limit kanału!\n0 - Bez limitu\n99 - Maksymalna liczba osób`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);
                }
                
            } else{
                var kanal = message.channel;
                const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Podaj nowy limit kanału!`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);
            }
        } else{
            var kanal = message.channel;
                    const exampleEmbed = new MessageEmbed()
	                .setColor('#ff0000')
                    .setTitle('BŁĄD')
                    .setDescription(`Nie możesz zmienić limitu osób tego kanału! (BRAK UPRAWNIEŃ)`)
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
    name: 'limit',
    description: 'Test command'
} 
    
         
               