const { SlashCommandBuilder } = require('discord.js');

const pingCommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};

const userCommand = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
    },
};

new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');


module.exports = [pingCommand, userCommand];
