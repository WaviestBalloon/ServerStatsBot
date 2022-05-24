const Discord = require("discord.js");
const sysinfo = require('systeminformation');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('message', async (message) => {
	if (message.content == "<@978277851264581652>" || message.content == "<@!978277851264581652>" || message.content == "<@978277851264581652> ") {
		let temp = await sysinfo.cpuTemperature()
		let cpu = await sysinfo.currentLoad()
		let cpuspeed = await sysinfo.cpuCurrentSpeed()
		let mem = await sysinfo.mem()

		console.log(temp)
		console.log(cpuspeed)
		let embed = new Discord.MessageEmbed()
			.setTitle("WavServer system information")
			.setDescription(`CPU stress: ${Math.floor(cpu.currentLoad)}%\nCPU temperature: ${temp.main}°C\nCPU clock: ${cpuspeed.avg}GHz\nMemory: ${mem.used / 1000000000}GB/${mem.total / 1000000000}GB`)

		message.reply({ embeds: [embed] })
	}
})

client.login(`token`)
