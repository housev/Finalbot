const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');

module.exports = {
    // ✅ أمر جلب القائمة مع صورة ومقطع صوتي
    'اوامر': async (client, message) => {
        try {
            const imagePath = './media/IMG_4841.jpeg';
            const audioPath = './media/Bobiz.mp4';

            if (fs.existsSync(imagePath) && fs.existsSync(audioPath)) {
                // إرسال الصورة مع نص القائمة
                const image = MessageMedia.fromFilePath(imagePath);
                await client.sendMessage(message.from, image, {
                    caption: `✨ *قائمة الأوامر:* \n\n📌 *أوامر الأعضاء:*\n- 🎮 الألعاب\n- 🎭 التسلية\n- 📥 التحميل\n- 🎨 التحويل\n- 🕌 الدينية\n- 🎶 الموسيقى\n- 🏮 الأنمي\n- 💍 الزواج\n\n⚡ *أوامر المشرفين:*\n- قفل/فتح الكروب\n- طرد الأعضاء\n- المنشن الجماعي\n\n🔥 *أوامر المالك:*\n- إعادة تشغيل البوت\n- وضع ألقاب للأعضاء\n- حظر شخص من استخدام البوت\n- إرسال رسالة جماعية\n\n✅ *استخدم الأوامر بالرموز المناسبة!*`
                });

                // إرسال ملف الصوت كرسالة صوتية
                const audio = MessageMedia.fromFilePath(audioPath);
                await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });

            } else {
                message.reply('⚠️ لم يتم العثور على الصورة أو ملف الصوت، تأكد من وجودهما في مجلد media.');
            }
        } catch (error) {
            console.error('❌ حدث خطأ أثناء إرسال القائمة:', error);
            message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    },

    // ✅ أمر بوم (مع ملف صوتي)
    'بوم': async (client, message) => {
        try {
            const audioPath = './media/boom.mp4';

            if (fs.existsSync(audioPath)) {
                const audio = MessageMedia.fromFilePath(audioPath);
                await client.sendMessage(message.from, audio, { sendAudioAsVoice: true });
            } else {
                message.reply('⚠️ ملف الصوت غير موجود في مجلد media.');
            }
        } catch (error) {
            console.error('❌ حدث خطأ أثناء تنفيذ الأمر:', error);
            message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    },

    // ✅ أوامر المشرفين
    'قفل_الكروب': async (client, message) => {
        message.reply('🔒 تم قفل المجموعة!');
    },

    'فتح_الكروب': async (client, message) => {
        message.reply('🔓 تم فتح المجموعة!');
    },

    // ✅ أوامر أخرى
    'طرد': async (client, message, args) => {
        if (!message.isGroupMsg) return message.reply('❌ هذا الأمر يعمل فقط في المجموعات.');
        if (!args[0]) return message.reply('❌ يرجى تحديد رقم الشخص للطرد.');
        message.reply(`🚨 جاري طرد المستخدم: ${args[0]}`);
    }
};
