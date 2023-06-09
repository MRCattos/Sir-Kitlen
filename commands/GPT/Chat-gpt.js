const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.GPTOKEN,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gpt')
    .setDescription('Ask/say whatever you want to ChatGPT')
    .setDMPermission(false)
    .addStringOption((option) =>
      option.setName('prompt').setDescription('Your input').setRequired(true)
    ),
  async execute(interaction) {
    const Prompt = interaction.options.getString('prompt');
    if (!Prompt) {
      throw new Error('No prompt provided.');
    }

    try {
      await interaction.deferReply();

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 2048,
        temperature: 0.5,
        prompt: Prompt
      });

      const generatedText = response.data.choices[0].text;
      const trimmedText = generatedText.replace(`Question: ${Prompt}`, '');

      const gptEmbed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle(`Question: ${Prompt}`)
        .setDescription(`Answer: ${trimmedText}`)
        .addFields(
          { name: 'Model used:', value: 'text-davinci-003' },
          { name: 'Main github repository link', value: "[Link to main repo](https://github.com/MRCattos/Sir-Kitlen/tree/main)" },
          { name: 'dev build', value: "[Link to dev repo](https://github.com/MRCattos/Sir-Kitlen/tree/developer-build)" },
        )

      await interaction.editReply({ embeds: [gptEmbed] });

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
