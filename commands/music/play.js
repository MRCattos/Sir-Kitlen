const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music with this command')
    .addStringOption(option =>
      option
        .setName('url')
        .setDescription('Enter the YouTube URL')
        .setRequired(true)),

  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply('You must be in a voice channel to use this command.');
    }

    const url = interaction.options.getString('url');

    if (!url) {
      return interaction.reply('Please provide a YouTube URL.');
    }

    // Add your code for playing music here

    interaction.reply('Playing music...');
  },
};
