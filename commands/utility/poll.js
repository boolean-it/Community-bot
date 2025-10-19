const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Crea un semplice sondaggio')
		.addStringOption(option =>
			option.setName('domanda')
				.setDescription('La domanda del sondaggio')
				.setRequired(true)),
	async execute(interaction) {
		const question = interaction.options.getString('domanda');

		const message = await interaction.reply({
			content: `📊 **Sondaggio:** ${question} 👍 Sì / 👎 No`,
			fetchReply: true
		});

		await message.react('👍');
		await message.react('👎');
	},
};