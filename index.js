const express = require('express');
const app = express();

app.listen(() => console.log('Server started'));

const Discord = require("discord.js");
const client = new Discord.Client()
const { prefix, token, roomid } = require("./Config/configuration.json");

client.login(process.env.token).catch(err => console.error(`[ Discord ] Worng Token `))

client.on("ready", async () => {
  console.log(`Bot is online`)
  await client.user.setActivity(`${prefix}help`, {
    type: "COMPETING",
  })
});

const temp = JSON.parse(fs.readFileSync('./data/temp.json', 'utf8'));
client.on('message', async message => {
 if(message.channel.type === "dm") return;
  if(message.author.bot) return;
   if(!temp[message.guild.id]) temp[message.guild.id] = {
    time: "3000",
     category : 'Create Temp Channel',
      channel : 'Create Temp Channel'
       }
        if(message.content.startsWith(prefix + 'temp on')){
         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
          var ggg= message.guild.createChannel('Create Temp Channel', 'category').then(cg => {
           var ccc =message.guild.createChannel('Create Temp Channel', 'voice').then(ch => {
            ch.setParent(cg)
             message.channel.send('**<:896365430841679882:914642292441231360> | Done , The feature has been activated**')
              client.on('message' , message => {
               if(message.content === prefix + 'temp off') {
                if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                 cg.delete()
                  ch.delete()
                   message.channel.send('**<:896365430841679882:914642292441231360> | Done , The feature has been disabled**')
                    }
                     });
                      const time = temp[message.guild.id].time
                       client.on('message' , message => {
                        if (message.content.startsWith(prefix + "temptime")) {
                         if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
                          let newTime= message.content.split(' ').slice(1).join(" ")
                          if(!newTime) return message.reply(`**${prefix}temptime <time>  \`1000 = 1s\`**`)
	                 if(isNaN(newTime)) return message.reply(`** The Time Should Be numbers **`);
	                if(newTime < 1) return message.reply(`**The Time Has Been Up \`3000s\`**`)
                       temp[message.guild.id].time = newTime
                      message.channel.send(`**Temp Rooms Time Changed To \`${newTime}\`**`);
                     }
                    });
                   client.on('voiceStateUpdate', (old, neww) => {
                  let newUserChannel = neww.voiceChannel
                 let oldUserChannel = old.voiceChannel
                temp[message.guild.id].category = cg.id
               temp[message.guild.id].channel = ch.id
              let channel = temp[message.guild.id].channel
             let category = temp[message.guild.id].category
            if(oldUserChannel === undefined && newUserChannel !== undefined && newUserChannel.id == channel) {
           neww.guild.createChannel(neww.displayName , 'voice').then(c => {
          c.setParent(category)
         let scan = setTimeout(()=>{
        if(!neww.voiceChannel) {
       c.delete();
      client.channels.get(channel).overwritePermissions(neww, {
     CONNECT:true,
    SPEAK:true
   })
  }
 }, temp[neww.guild.id].time);
  c.overwritePermissions(neww, {
   CONNECT:true,
    SPEAK:true,
     MANAGE_CHANNEL:true,
      MUTE_MEMBERS:true,
       DEAFEN_MEMBERS:true,
	MOVE_MEMBERS:true,
	 VIEW_CHANNEL:true
	  })
	   neww.setVoiceChannel(c)
            })
             client.channels.get(channel).overwritePermissions(neww, {
	      CONNECT:false,
	       SPEAK:false
		})
               }
              })
             })
           })
          }
         fs.writeFile("./data/temp.json", JSON.stringify(temp), (err) => {
        if(err) console.error(err)
       })
      });
