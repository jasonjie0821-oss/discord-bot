const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`恆春你陳哥 已上線！`);
    
    const channelId = process.env.VOICE_CHANNEL_ID;
    const guildId = client.channels.cache.get(channelId)?.guild.id;

    if (!channelId || !guildId) {
        console.log("錯誤：找不到語音頻道或伺服器 ID，請檢查環境變數設定。");
        return;
    }

    try {
        joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: client.channels.cache.get(channelId).guild.voiceAdapterCreator,
            selfMute: true,  // 自動靜音，保持安靜
            selfDeafen: false // 不拒聽，維持連線穩定
        });
        console.log(`成功進入語音頻道！24/7 留守啟動。`);
    } catch (error) {
        console.error("進入語音頻道失敗：", error);
    }
});

client.login(process.env.DISCORD_TOKEN);
