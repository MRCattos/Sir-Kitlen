const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { exec } = require('youtube-dl-exec');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music with this command')
        .addStringOption(option =>
            option.setName('option')
                .setDescription('Play YouTube URLs or search for videos')
                .setRequired(true)
                .addChoices(
                    { name: 'Search term', value: '1' },
                    { name: 'YouTube URL', value: '2' },
                    { name: 'Spotify URL', value: '3' },
                    //soundcloud eventually?
                )),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) { return interaction.reply('You must be in a voice channel to use this command.'); }

        const option = interaction.options.getString('option');
        if (option == null) { return interaction.reply('please') }

        try {
            const voiceConnection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            switch (option) {
                case '1': // Directs to the youtube search term funtion
                    const searchTerm = interaction.options.getString('searchterm');
                    option = await searchYouTube(searchTerm);
                    break;
                case '2': // Directs to the youtube url funtion
                    option = interaction.options.getString('url');
                    break;
                default:
                    return interaction.reply('Invalid option.');
            }

            const resource = createAudioResource(url);
            const audioPlayer = createAudioPlayer();

            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(resource);

            interaction.reply('Playing music...');
        } catch (error) {
            console.error(error);
            interaction.reply('An error occurred while playing music.');
        }
    },
};

async function searchYouTube(searchTerm) {
    const result = await exec(`youtube-dl --get-url "ytsearch:${searchTerm}"`);
    return result.trim();
}
