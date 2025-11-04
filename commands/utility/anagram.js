const { SlashCommandBuilder } = require('discord.js');

const words = [
    'cane',
    'gatto',
    'porta',
    'libro',
    'mouse',
    'viaggio',
    'giardino',
    'montagna',
    'automobile',
    'programmazione'
];

module.exports = {
    data: new SlashCommandBuilder().setName('anagram').setDescription('Guess the word through anagrams!'),
    async execute(interaction) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const splitRandomWord = randomWord.split('');
        for (let i = 0; i < splitRandomWord.length; i++) {
            const randomPosition = Math.floor(Math.random() * splitRandomWord.length);
            const temp = splitRandomWord[i];
            splitRandomWord[i] = splitRandomWord[randomPosition];
            splitRandomWord[randomPosition] = temp;
        }
        const anagram = splitRandomWord.join('');

        await interaction.reply(
            `**Gioco dell'anagramma**\n` +
            `Ecco la parola mescolata: **${anagram}**\n` +
            `Hai 15 secondi per indovinare.`
        );

        const collectorFilter = (m) => m.author.id === interaction.user.id; //Controllo chi scrive il messaggio

        const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, time: 15_000 });

        collector.on('collect', (m) => {
            if (m.content.toLowerCase() === randomWord.toLowerCase()) {
                m.reply(`Corretto la parola era: **${randomWord}**`);
                collector.stop('indovinato');
            } else {
                m.reply('Sbagliato, riprova');
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason != 'indovinato') {
                interaction.followUp(`Tempo Scaduto la parola era: **${randomWord}**`);
            }
        });
    },
};