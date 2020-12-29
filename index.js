
const { Client, RichEmbed } = require("discord.js")
const client = new Client({ disableEveryone: false });
client.on('ready', () => {
  console.log(`Logged in as: ${client.user.tag}`)
})
const Gamedig = require('gamedig')
const Discord = require("discord.js");
client.on('ready', async message => {
setInterval(() => {
Gamedig.query({
  type: 'fivem',
  host: '', // server ip 
  port: "" // server port
}).then(async(state) => {
  var players = [];
  state.players.forEach(p => {
      players.push(`\`\`${p.name}\`\``)
  });
  client.user.setPresence({
        status: "online", // dnd for do not disturb
        game: {
            name: `Over ${state.raw.clients} Players!`, // the bot will put the server player count in the status - Watching over 10 players!
            type: "Watching", // Supported as well: Playing
        }
    })
  var embed = new Discord.RichEmbed()
      .setColor("YELLOW")
      .setTitle('__**GravHub**__')
      .addField('**Server Status:**', `Online`, true)
      .addField('**Online Players:**', `**Total:** \`${state.raw.clients}\` / \`${state.raw.sv_maxclients}\``, true)
      .addField('**Current Players:**', `${players.join(',  ').toString()}`);
      //.setFooter(); you can use this to have your server name & icon. For example: .setFooter(`GravHub`, `https://gravhub.pic`)
      const maindiscord = client.guilds.find(g => g.id === '') // put your discord server's id between ''
      const statuschannel = maindiscord.channels.find(c => c.id === ''); // put the id of the channel that you want the status message in
      statuschannel.fetchMessage('').then((msg) => { // you need to make your bot say something in this channel first then use that message id to put here
          msg.edit(embed)
      })
}).catch(async() => {
  var embed = new Discord.RichEmbed()
      .setColor("YELLOW")
      .addField('**Server Status:**', `No Players Online!`)
      .setTitle('__**GravHub**__');
      //.setFooter(); you can use this to have your server name & icon. For example: .setFooter(`GravHub`, `https://gravhub.pic`)
      const maindiscord = client.guilds.find(g => g.id === '') // put your discord server's id between ''
      const statuschannel = maindiscord.channels.find(c => c.id === ''); // put the id of the channel that you want the status message in
  statuschannel.fetchMessage('').then((msg) => { // you need to make your bot say something in this channel first then use that message id to put here
      msg.edit(embed)
  })
});
}, 5000) // This time is in ms and 1000ms = 1s, so this status is updated every 5seconds
})

client.login('tokenhere')
