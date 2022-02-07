const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
const { prefix } = require("../../config.json")

module.exports = {
	name: 'help',
	description: 'Help command, check the commands, or whatever',
    category: "Miscellaneous",
    usage: "<command name>",
	execute(client, message, args) {
		const { commands } = message.client;

		if (!args.length) {

			const category = function ({ Category }) {
				const filter = commands.filter(c => c.category === Category)
				return filter.map(c => c.name).join(', ');
			}
			
			const helpEmbed = new Discord.MessageEmbed()
			.setTitle("Here's a list of all my commands!")
			.setDescription(`You can send \`${prefix}help [command name]\` to get info on a specific command!`)
			.addField("❔ Info", `${category({Category: "Info"})}`)
			.addField("🎵 Music", `${category({Category: "Music"})}`)
			.setColor("#FCBA03")
			.setFooter("`[]` means required and `<>` means optional.")

			return message.reply({embeds: [helpEmbed]})
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply({content: 'That\'s not a valid command!'});
		}

		if(command.category === "Owner" && message.member.id !== process.env.OWNER_ID) return message.reply({content: 'That\'s not a valid command!'});

		const embed = new Discord.MessageEmbed()
		.setTitle(`**Name:** ${command.name}`)
		.setColor("#FCBA03")

		if (command.aliases) embed.addField(`**Aliases:** `, `${command.aliases.join(', ')}`);
		if (command.description) embed.addField(`**Description:** `, `${command.description}`);
        if (command.category) embed.addField(`**Category:** `, `${command.category}`)
		if (command.usage) embed.addField(`**Usage:** `, `${prefix}${command.name} ${command.usage}`)

		message.reply({embeds: [embed]});
	}, 
};