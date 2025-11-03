//SlashCommandBuilder is needed to get that part of discord.js to make slash commands (ex /hello)
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  //data is the part of informations about the command (to set name and description), SlashCommandBuilder is the constructor and with new we are creating a new object of that type, interaction is the object to represent the interaction of the user who write the command in Discord
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with an Hello with the name of the User!'),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    await interaction.reply(`Hello ${interaction.user.username}!`);
  },
};
