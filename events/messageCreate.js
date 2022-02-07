const client = require("../index");
const { prefix } = require("../config.json");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
      
        if (command.usage) {
          reply += `\nThe proper usage would be: \`${fetchprefix}${command.name} ${command.usage}\``;
        }
      
        return message.channel.send(reply);
      }
      
    await command.run(client, message, args);
});