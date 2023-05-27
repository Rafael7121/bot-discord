const discord = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
const { voice } = require("../../bot");

module.exports = {
    name: "ward",
    description: "vou de Wardas",
    type: discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        try {
            const canalId = "712805147650162698";
            let canal = interaction.guild.channels.cache.get(canalId)
            const connection = joinVoiceChannel({
                channelId: canalId,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            await interaction.reply(`Wardei ${canal.name}`);
        } catch (error) {
            console.error("Erro ao entrar no canal de voz:", error);
        }
    }
};


