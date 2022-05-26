const { MessageActionRow, MessageButton, MessageEmbed, Client } = require("discord.js");
const sysinfo = require('systeminformation');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

function bar(completed, total) {
	let percent = Math.floor(completed / total * 15)
	let bar = ""
	for (let i = 0; i < percent; i++) {
		bar += "█"
	}
	for (let i = percent; i < 15; i++) {
		bar += "░"
	}
	return bar
}

async function sendandupdate(context, isinteraction) {
	let begin = Date.now()
	let temp = await sysinfo.cpuTemperature()
	let cpu = await sysinfo.currentLoad()
	let cpuspeed = await sysinfo.cpuCurrentSpeed()
	let mem = await sysinfo.mem()

	let embeddata = new MessageEmbed()
		.setTitle("WavServer system information")
		.setDescription(`CPU stress: **${Math.floor(cpu.currentLoad)}%**\nCPU temperature: **${temp.main}°C**\nCPU clock: **${cpuspeed.avg}GHz**\nMemory: **${(mem.used / 1000000000).toPrecision(3)}GB**/**${(mem.total / 1000000000).toPrecision(3)}GB**\n\n\`Processor utilisation\`${bar(cpu.currentLoad, 100)}]\n\`Memory utilisation\`${bar(mem.used, mem.total)}`)
	let row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel("Refresh")
				.setCustomId("ref")
				.setDisabled(false)
				.setStyle("PRIMARY"),
		);
	
	if (isinteraction == true) {
		context.message.edit({ embeds: [embeddata], components: [row] })
		context.reply({ content: `Updated server stats in \`${Date.now() - begin}\` milliseconds.`, ephemeral: true })
	} else {
		context.reply({ embeds: [embeddata], components: [row] })
	}
}


client.on("interactionCreate", async (interaction) => {
	if (interaction.isButton() && interaction.customId == "ref") {
		let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel("Refresh")
					.setCustomId("ref")
					.setDisabled(true)
					.setStyle("DANGER"),
			);
		//interaction.deferReply()
		interaction.message.edit({ embeds: [new MessageEmbed().setDescription("Fetching system data")], components: [row] })
		sendandupdate(interaction, true)
	}
})

client.on('message', async (message) => {
	if (message.content == "<@978277851264581652>" || message.content == "<@!978277851264581652>" || message.content == "<@978277851264581652> ") {
		sendandupdate(message, false)
	}
})

client.login(`token`)
