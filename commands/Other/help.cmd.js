const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');
var prefix = config.prefix;
var parrotzy_ver = config.version;

module.exports.run = async (bot,message,args) => {
    var kanal = message.channel;
                const exampleEmbed = new MessageEmbed()
	                .setColor('#0099ff')
                    .setTitle('Komendy Parrotzy')
                    .setDescription(`Dostępne komendy dla Ciebie:\n\n\`${prefix}help\`\nWyświetla listę komend\n\n\`${prefix}wyrzuc <@Oznacz>\`\nWyrzuca osobę z twojego kanału głosowego\n\n\`${prefix}zablokuj\`\nBlokuje kanał przed dołączaniem\n\n\`${prefix}odblokuj\`\nOdblokowywuje twój kanał głosowy.\n\n\`${prefix}zezwol <@Oznacz>\`\nPozwala osobie dołączać na twój kanał głosowy\n\n\`${prefix}zabron <@Oznacz>\`\nZabriera osobie dostęp na twój kanał głosowy`)
                    .setTimestamp()
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
                    kanal.send(exampleEmbed);
    }
    module.exports.help = {
        name: 'help',
        description: 'Commands'
}