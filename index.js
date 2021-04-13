require('dotenv').config();

const Discord = require('discord.js');
const { Client, MessageEmbed, Presence, GuildMemberManager, DiscordAPIError } = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const WOKCommands = require('wokcommands');
const env = require('dotenv');
const config = require('./config.json');
const fs = require('fs');

bot.commands = new Discord.Collection();
var prefix = config.prefix;
var parrotzy_ver = config.version;

const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if(guildId) {
        app.guilds(guildId)
    }
     return app;
}

bot.on('ready', async () => {
    console.log(`${bot.user.username} zalogował się.`);
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.cmd.js'));
    const commandFilesOther = fs.readdirSync('./commands/Other/').filter(file => file.endsWith('.cmd.js'));
    console.log(`========================INJECT========================`);
    for(const file of commandFilesOther){
        const command = require(`./commands/Other/${file}`);
        bot.commands.set(command.help.name,command);
        console.log(`Other commands: ${file} injected!`);
    }
    for(const file of commandFiles){
        const command = require(`./commands/${file}`);
        bot.commands.set(command.help.name,command);
        console.log(`Not categorized: ${file} injected!`);
    }
    console.log(`============================================================`);
    servers = bot.guilds.cache.size;

    let statuses = [
        `Ogląda ${servers} serwerów`,
        `Parrotzy v. ${parrotzy_ver}`,
    ]
    setInterval(function(){
        bot.user.setPresence({
            status: 'online',
            activity: {
                name: statuses[Math.floor(Math.random()*statuses.length)],
                type: 'PLAYING',
            }
        })
    },5000)
});

bot.on('voiceStateUpdate', (oldUser, newUser) =>{
    let oldChannel = oldUser.channel;
    let newChannel = newUser.channel;
    let name = `🎮・Pokój ${oldUser.member.user.tag}`
    if(newUser.channel!=null){     
        if(newUser.channel.name=="➕・Utwórz Kanał"){
        newUser.guild.channels.create(name,{
            type: 'voice',
            userLimit: 10,
            parent: newChannel.parentID
        }).then(result => {
            newUser.setChannel(result)
        })
        }
    }
    if(oldChannel != newChannel){
        if(newChannel==null){
            
        } else{
            if(newUser.channel.name.includes("🎮・Pokój "+newUser.member.user.tag)){
                newChannel.createOverwrite(newUser.member, {
                    CONNECT: true
                  })
                    .catch(console.error);
            }
        }
    }
    if(oldUser.channel){
        if(oldUser.channel.name.includes("🎮・Pokój")&&oldUser.channel.members.size==0){
            oldChannel.delete("Pusty kanał")
        }
    }
    
})

bot.on('guildMemberUpdate', (oldgMember, newgMember) =>{
    if(newgMember.displayName.includes('᲼')||newgMember.displayName.includes('᲼')){
        newgMember.setNickname(oldgMember.displayName);
        const exampleEmbed = new MessageEmbed()
	    .setColor('#ff0000')
        .addFields(
            { name: `Banned nickname`, value: `Your nickname at **${newgMember.guild.name}** has been restored to your old nickname (\`${oldgMember.displayName}\`), because it contains banned character(s)`},
        )
        .setTimestamp()
        .setFooter(`${newgMember.user.tag}`, `${newgMember.user.displayAvatarURL()}`);
        newgMember.send(exampleEmbed);
    }
});

bot.on('guildMemberAdd', newMember=>{
    if(newMember.displayName.includes('᲼')||newMember.displayName.includes('᲼')){
        newMember.setNickname("Change nickname");
        const exampleEmbed = new MessageEmbed()
	    .setColor('#ff0000')
        .addFields(
            { name: `Banned nickname`, value: `Please change your nickname at **${newMember.guild.name}**, because it contains banned character(s)!`},
        )
        .setTimestamp()
        .setFooter(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL()}`);
        newMember.send(exampleEmbed);
    }
});


bot.on('guildDelete', guild =>{
    servers = bot.guilds.cache.size;
})

//BotJoinOnServer
bot.on('guildCreate', guild => {
    servers = bot.guilds.cache.size;
    const exampleEmbed = new MessageEmbed()
	    .setColor('#0099ff')
        .setTitle('Parrotzy')
        .setDescription(`Thanks for adding Parrotzy to your server!`)
        .addFields(
            { name: `Parrotzy info:`, value: `Parrotzy prefix: \`${prefix}\` or ${bot.user}\n**Dev:** Prewcio#2454`},
            { name: 'Commands', value: `You can check available commands using \`${prefix}help\`!`},
            { name: 'Version', value: `Parrotzy version: ${parrotzy_ver}`}
        )
        .setTimestamp()
        .setFooter(`${bot.user.tag} is created by Prewcio#2454`, `${bot.user.displayAvatarURL()}`);
        
        var chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
        chx.send(exampleEmbed);
});

//Logi
// bot.on('message', (message) => {
//     var d = new Date();
//     if(!message.author.bot){
//         var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
//         console.log("["+datestring+"]"+"("+message.guild.name+")"+message.author.tag+" > "+message.content)
//     }
// });

//Komendy
bot.on('message', async (message) =>{
    let prefixx = config.prefix;
    if(message.author.bot) return;
    if(message.channel.type=="dm") return;
    if(message.content.startsWith(prefix)){

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(message.content.includes("@everyone")||message.content.includes("@here")){
        return;   
    }
    let commandfile = ""
    // if(message.mentions.has(bot.user.id)){
    //     prefixx = "<@!802895909763547177>"
    //     args.unshift(cmd.slice(prefixx));
    //     commandfile = bot.commands.get(cmd.slice(22));
    //     args.shift()
    // } else{
        commandfile = bot.commands.get(cmd.slice(prefixx.length));
    // }
    if(commandfile) {
        commandfile.run(bot,message,args);
        message.delete();
    }
    
}


    // if(message.content.startsWith(prefix)||(message.mentions.has(bot.user.id))){
    //     if(message.content.includes("@everyone")||message.content.includes("@here")){
    //         return;   
    //     }
    //     var args1 = message.content.trim().split(/ +/g);
    //     const cmd = args1[0].slice(prefix.length).toLowerCase();
    //     const args = args1.slice(1);
    //     message.delete();
    //     if(cmd==='help'){
    //             bot.commands.get('help').execute(bot,message,args);
    //         } else if(cmd === 'kick'){
    //             bot.commands.get('kick').execute(bot,message,args);
    //         } else if(cmd === 'ban'){
    //             bot.commands.get('ban').execute(bot,message,args);
    //         } else if(cmd==='purge'){
    //             bot.commands.get('purge').execute(bot,message,args);
    //         }else if(cmd==='warn'){
                
    //         } else if(cmd=='listwarnings'){
                
    //         } else if(cmd==='botinfo'){
    //             bot.commands.get('botinfo').execute(bot,message,args);
    //         } else if(cmd==='lol-profile'){
    //             bot.commands.get('lol-profile').execute(bot,message,args);
    //         } else if(cmd==='lol-rotation'){
    //             bot.commands.get('lol-rotation').execute(bot,message,args);
    //         }else if(cmd==='champion'){
    //             bot.commands.get('champion').execute(bot,message,args);
    //         }else if(cmd==='championpl'){
    //             bot.commands.get('championpl').execute(bot,message,args);
    //         }else if(cmd=='play'){
    //             bot.commands.get('play').execute(bot,message,args);
    //         }else{
    //             const exampleEmbed = new MessageEmbed()
	//                 .setColor('#ff0000')
	//                 .setTitle('ERROR')
    //                 .addField('Error occurred', `Command **\`${cmd}\`** don't exist!`)
    //                 .setTimestamp()
    //                 .setFooter(`${message.author.tag}`,`${message.author.displayAvatarURL()}`);
    //                 message.channel.send(exampleEmbed);
    //         }
    //     }
});



bot.login(process.env.TOKEN);