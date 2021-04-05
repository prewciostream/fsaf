const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');
var prefix = config.prefix;
var parrotzy_ver = config.version;

module.exports.run = async (bot,message,args) => {
      
         
        let uptime = bot.uptime;
        let totalSeconds = (uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

              message.channel.send(`🏓Obliczanie pingu...`).then(resultMessage => {
                  const ping = resultMessage.createdTimestamp-message.createdTimestamp
                  const exampleEmbed = new MessageEmbed()
                  .setColor('#0099ff')
                  .addField('Parrotzy Info', `🤖 Ping Bota: **${ping}ms**\n🛰️ API Ping: **${bot.ws.ping}ms**\n🕑 Parrotzy działa od: **${days} dni ${hours} godzin ${minutes} minut ${seconds} sekund**\n💻 Serwery: **${bot.guilds.cache.size}**\n🌎 Zaproszenie bota: https://bit.ly/parrotzy`)
                  .setTimestamp()
                  .setFooter(`${message.author.tag}`,`${message.author.displayAvatarURL()}`);
                  message.channel.send(exampleEmbed);
                  resultMessage.delete();
              });
    }
    module.exports.help = {
        name: 'botinfo',
        description: 'Bot info'
}                