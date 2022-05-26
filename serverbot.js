const Discord = require("discord.js");
const sysinfo = require('systeminformation');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

function sendandupdate(context) {
	let temp = await sysinfo.cpuTemperature()
	let cpu = await sysinfo.currentLoad()
	let cpuspeed = await sysinfo.cpuCurrentSpeed()
	let mem = await sysinfo.mem()

	let embed = new Discord.MessageEmbed()
		.setTitle("WavServer system information")
		.setDescription(`CPU stress: ${Math.floor(cpu.currentLoad)}%\nCPU temperature: ${temp.main}°C\nCPU clock: ${cpuspeed.avg}GHz\nMemory: ${(mem.used / 1000000000).toPrecision(3)}GB/${(mem.total / 1000000000).toPrecision(3)}GB`)
	let row = new MessageActionRow()
		.addComponent(
			new MessageButton()
				.setLabel("Refresh")
				.setStyle("PRIMARY")
				.setCustomId("ref")
				.setDisabled(false)
	)

	if (context.isInteraction()) {
		interaction.message.edit({ embed: embed, components: [row] })
	} else {
		message.reply({ embed: embed, components: [row] })
	}
}


client.on("interactionCreate", async (interaction) => {
	if (interaction.isButton() && interaction.customId == "ref") {
		let row = new MessageActionRow()
			.addComponent(
				new MessageButton()
					.setLabel("Refreshing")
					.setStyle("DANAGER")
					.setCustomId("ref")
					.setDisabled(true)
		)
		interaction.message.edit({ embeds: [new MessageEmbed({
			title: "Fetching",
		})], components: [row] })
		sendandupdate(interaction)
	}
})

client.on('message', async (message) => {
	if (message.content == "<@978277851264581652>" || message.content == "<@!978277851264581652>" || message.content == "<@978277851264581652> ") {
		sendandupdate(message)
	}
})

client.login(`token`)
