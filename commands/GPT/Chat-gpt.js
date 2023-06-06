const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.GPTOKEN,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gpt')
    .setDescription('Ask ChatGPT a question')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('Your question')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const prompt = interaction.options.getString('prompt');
      if (!prompt) {
        throw new Error('No prompt provided.');
      }

      const response = await openai.createCompletion({
        model: 'gpt-3.5-turbo',
        prompt: prompt,
      });

      if (!response || !response.data || !response.data.choices || response.data.choices.length === 0) {
        throw new Error('Invalid response received from OpenAI API.');
      }

      const returnMessage = response.data.choices[0].message.content;
      await interaction.reply(returnMessage);
    } catch (error) {
      console.error('An error occurred:', error);
      let errorMessage = 'An error occurred while processing your request.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      await interaction.reply(`Error message: ${errorMessage}`);
    }
  },
};
