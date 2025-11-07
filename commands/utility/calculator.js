const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calculator')
		.setDescription('Performs mathematical operations!')

        //Add number imputs
        .addNumberOption(option=>
            option.setName('number1')
                .setDescription('First Number')
                .setRequired(true))
        .addNumberOption(option=>
            option.setName('number2')
                .setDescription('Second Number')
                .setRequired(true))
        
        //Add operation type
        .addStringOption(option=>
            option.setName('operation')
            .setDescription('Math operation to perform')
            .setRequired(true)
            .addChoices(
                {name: 'Add', value:'add'},
                {name: 'Substract', value:'substract'},
                {name: 'Multiply', value:'multiply'},
                {name: 'Divide', value:'divide'}
            )),

	async execute(interaction) {

        //Read user inputs from the command
        const num1 = interaction.options.getNumber('number1');
        const num2 = interaction.options.getNumber('number2');
        const operation = interaction.options.getString('operation');

        let result;

        //Choose math operation based on user selection
        switch(operation){
            case 'add':
                result = num1 + num2;
                break;
            case 'substract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if(num2===0){
                    return interaction.reply("Error: Cannot divide by zero!")
                }
                result = num1 / num2;
                break;
        }

        //Send result to Discord
		await interaction.reply("Result: "+result);
	},
};