const discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Veja XACRAS onlinas",
    type: discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        let embed = new discord.EmbedBuilder()
        .setDescription(`Falas ${interaction.user}`)

        interaction.reply({embeds: [embed]})
        }
    }