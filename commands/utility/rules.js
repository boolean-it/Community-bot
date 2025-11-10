const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName("rules")
		.setDescription("Print Server Rules"),
	async execute(interaction) {
		const rulesEmbed = new EmbedBuilder()
			.setColor("#ED4245")
			.setTitle("Server Rules")
			.setDescription(
				`1. No spam.\n` +
					`2. No illegal and/or offensive content.\n` +
					`3. No NSFW content.\n` +
					`4. No insults towards the staff or other members of the server.\n` +
					`5. No promotion of other discord servers`
			)
			.setFooter({
				text: "Thank you for being part of our community, we wish you a good stay!",
			});
		await interaction.reply({ embeds: [rulesEmbed] });
	},
};
