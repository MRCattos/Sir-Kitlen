const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.GPTOKEN,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Ask ChatGPT a question')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Your question')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const prompt = interaction.toString(); // Convert to a string. Will get a "BigInt" error otherwise
            const response = await openai.createCompletion({
                model: "gpt-3.5-turbo", //defines model as gpt-3.5-turbo, open ai's latest released gpt model as of 5/6/2023
                prompt: prompt,
            });

            const Return = response.data.choices[0].message;
            interaction.reply(Return);

        } catch (error) {
            console.error(error);
            interaction.reply('Correct error handling has not been implemented for this command yet. Check the output terminal for the details.');
        }
    }
};
