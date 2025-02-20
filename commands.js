const fs = require('fs');

module.exports = {
    // ✅ أمر القائمة مع رسالة صوتية
    'قائمة': async (client, message) => {
        const audioPath = './media/Bobiz.mp4'; // مسار مقطع الصوت
        if (fs.existsSync(audioPath)) {
            await client.sendVoice(message.from, fs.readFileSync(audioPath), { ptt: true });
        }

        const caption = `✨ *قائمة الأوامر* ✨
📌 *أوامر الأعضاء:* 🎮 ألعاب | 😂 نكت | 📥 تحميل | 🎨 تحويل | 🏮 أنمي | 💍 زواج
📌 *أوامر المشرفين:* 🚨 طرد | 🔒 قفل/فتح الكروب | 🔔 منشن جماعي
📌 *أوامر المالك:* 🔥 إيقاف/تشغيل البوت | 📢 إرسال رسالة جماعية | 💥 بوم

✅ *لاستخدام أمر، أرسل اسمه في الدردشة.*`;
        message.reply(caption);
    },

    // ✅ أمر بوم مع رسالة صوتية
    'بوم': async (client, message) => {
        const audioPath = './media/boom.mp4';
        if (fs.existsSync(audioPath)) {
            await client.sendVoice(message.from, fs.readFileSync(audioPath), { ptt: true });
        }
        message.reply('💥 *استعدوا، سيتم تنفيذ بوم!* 💥');
    },

    // ✅ أوامر المشرفين
    'طرد': async (client, message, args) => {
        if (!message.isGroupMsg) return message.reply('❌ هذا الأمر يعمل فقط في المجموعات.');
        if (!args[0]) return message.reply('❌ يرجى تحديد رقم الشخص للطرد.');
        message.reply(`🚨 تم طرد المستخدم: ${args[0]}`);
    },
    'قفل_الكروب': async (client, message) => {
        message.reply('🔒 تم قفل المجموعة!');
    },
    'فتح_الكروب': async (client, message) => {
        message.reply('🔓 تم فتح المجموعة!');
    },

    // ✅ أوامر الأعضاء
    'نكتة': async (client, message) => {
        const jokes = ['😂 نكتة 1', '🤣 نكتة 2', '😆 نكتة 3'];
        message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    },

    'زواج': async (client, message) => {
        message.reply(`💍 تم تزويج ${message.sender.pushname} بـ @شخص_عشوائي 🎉`);
    },

    // ✅ أوامر التحميل
    'تحميل': async (client, message, args) => {
        if (!args[0]) return message.reply('❌ يرجى إرسال رابط الفيديو للتحميل.');
        message.reply(`📥 جاري تحميل الفيديو من: ${args[0]}`);
    }
};
