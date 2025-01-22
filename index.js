const { createInterface } = require('node:readline');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Client, Routes } = require('discord.js');

const ping = {
  name: 'ping',
  description: 'Pings the bot and shows the latency'
};


// Command Example
const command2 = {
  name:'command2',
  description:'yes'
}
const version = {
  name:'version',
  description:'Tells you what version the bot is on'
}
const cute = {
  name:'cute',
  description:'Tells you who is cute'
}

const fyaamod = {
  name:'fyaamod',
  description:'Fyaa mod introduction'
}
const commands = [ping, command2, version, cute, fyaamod];

const client = new Client({ intents: [] });
const rl = createInterface({ input: process.stdin, output: process.stdout });


client.on('interactionCreate', (interaction) => {
  if (interaction.commandName === 'ping') {
    interaction.reply(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  } else if (interaction.commandName === 'command2') { // This is the example command's name!
    interaction.reply('This user said that TGSR is not cute lol you can not prove yourself wrong now haha');
  }
  else if (interaction.commandName === 'version') {
    interaction.reply('TGSR Bot version 2.0.1, might has some lack of commands lol');

  } else if (interaction.commandName === 'cute') {
    interaction.reply('TGSR is not cute, others are tho');

  } else if (interaction.commandName === 'value') {
    interaction.reply('Value = 79.780');
  }
  else if (interaction.commandName === 'fyaamod') {
    interaction.reply(`> # **Welcome User!**
> _ _ _ _ _ _ _ _ 
> *As a helper of Rdite Incorporated, I am here by required to tell you a few basic things before you get started with moderating for fyaa.*
>    
> **#info-and-commands you can find all the commands and other helpful stuff.**
> 
> For banning, always **use tban or tbanid** for banning through user id.
> For an example “tbanid 72537258 (duration in hours for how long you want to ban them for)”, or add NaN (Not a Number) to the duration if you perm ban them.
> Since the ban command only bans people for 2 years maximum instead of permanent.
> **Don’t forget to add a reason after adding a duration, or else the user will not be banned.**
> 
> ***Also a reminder*** to not Cave yourself, since you cannot uncave yourself after.
> 
> Since the webhook is working again, you don't need to manually log who you banned, what you banned them for, duration blah blah blah etc etc.
> Just need to send proof or the report link itself after you banned the person.
> 
> **If you have any other questions, please bother our nice Senior staff team or those old hags with purple colored names.**
>  
> We at Rdite inc wish you a happy moderating, or suffering. Whatever your point of view is.
> 
> -# We are not responsible for any emotional damage received from fyaa. [Learn more.](Https://octolingmedia.com/freecheckmark)
>  
> -# - Libxml, CEO of Failure Interactive`);
  }

  else { 
    interaction.reply('this command\'s response has not been added yet!');
  }
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));
(async ()=>{
  const token = await question('Application token? ');
  if(!token) throw new Error('Invalid token');

  const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);

  if(!ratelimitTest.ok) {
    await question(`Uh oh, looks like the node you're on is currently being blocked by Discord. Press the "Enter" button on your keyboard to be reassigned to a new node. (you'll need to rerun the program once you reconnect)`)

    // This kills the container manager on the repl forcing Replit to assign the repl to another node with another IP address (if the ip is globally rate limited)
    //^ in short: Restarts the bot to be used again/attempted to start up again!
    execSync('kill 1');
    return;
  };
  
  await client.login(token).catch((err) => {
    throw err
  });

  await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });

  console.log('DONE | Application/Bot is up and running. DO NOT CLOSE THIS TAB UNLESS YOU ARE FINISHED USING THE BOT, IT WILL PUT THE BOT OFFLINE.');
})();
