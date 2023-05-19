const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: "raid",
    description: "Recomenda uma live aleatória na Twitch",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const TwitchAPI = "https://api.twitch.tv/helix/streams?first=100";
        const client_id = process.env.TWITCH_CLIENT_ID;
        const options = {
            url: TwitchAPI,
            headers: {
                'Authorization': `Bearer ${process.env.seu_token_oauth}`
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
                interaction.reply({
                    content: "Erro ao tentar recomendar uma live na Twitch.",
                    ephemeral: true
                });
                return;
            }

            const data = JSON.parse(body);
            const liveStreams = data?.data?.filter(stream => stream?.type === "live");

            if (!liveStreams || liveStreams.length === 0) { 
                interaction.reply({
                    content: "Não há nenhuma live ao vivo na Twitch no momento.",
                    ephemeral: true
                });
                return;
            }

            const randomIndex = Math.floor(Math.random() * liveStreams.length);
            const liveStream = liveStreams[randomIndex];

            const streamUrl = `https://twitch.tv/${liveStream?.user_name}`;
            const streamTitle = liveStream?.title;

            interaction.reply({
                content: `Recomendação de live na Twitch: **${streamTitle}**\n${streamUrl}`,
                ephemeral: true
            });
        });
    }
};