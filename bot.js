const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
const path = require('path');
const bot = new CommandoClient({
    commandPrefix: "l!",
    unknownCommandResponse: false,
    owner: ["289051687027605504", "169157260155682816", "368775528234352642","275856246165471232"],
    autoReconnect: true
});
bot.on("error", async error => {
    console.log(`ERR\n${error}`)
});
process.on('unhandledRejection', error => {
    console.error(`ERROR: \n${error}`);
});
bot.on('warn', async info => {
    console.error(`WARNING: \n${info}`);
});
bot.on('ready', () => {
    console.log(`
    Bot Account: ${bot.user.tag}
    Bot ID: ${bot.user.id}
    Server Count: ${bot.guilds.size}
    User Count: ${bot.users.size}`);
    bot.user.setPresence(
        {
            status: "online",
            game: {
                name: "Puzzles",
                type: "WATCHING"
            }
        })

});
bot.on("message", async message => {
    let log = message.guild.channels.find(c => c.name === "test");
    if (message.channel.id === "405691443961790474") {
        message.delete().catch()
        if (message.content.toLowerCase() === "The first clue here") {
            message.delete().catch()
            let embed = new Discord.RichEmbed()
            .setColor(`GREEN`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(message.content)
            .setTimestamp()
            .setTitle(`Solved Clue 1`)
            log.send(embed)
            message.author.send(`Congrats you have figured out clue one and Here is clue two [Some clue here]`)
        }else 
        if (message.content.toLowerCase().includes("test")) {
        message.delete().catch()
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(`${message.author} Has Tested`)
        .setColor(`BLUE`)
        .setTimestamp()
    log.send(embed)
    message.author.send(`Your test was successful`)
    } else {
        return; // this is if none of the messages = test or one of the other clue answers. then it would just delete the message in that channel and return nothing.
    }};

});
bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ["mod","Moderation"],
        ["botowner", "Bot Devs"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        prefix: false,
        ping: false,
        eval_: false,
        commandState: true
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));
bot.login(process.env.BOT_TOKEN);
