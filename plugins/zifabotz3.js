const { MessageType } = require('@adiwajshing/baileys')
const PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.sendMessage(m.chat, {
    contacts: [{
    "displayName": "OSCAR",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:OSCAR;;;\nFN:OSCAR\nitem1.TEL;waid=6285707174199:6285707174199\nitem1.X-ABLabel:๐ Creator\nitem2.EMAIL;type=INTERNET:-\nitem2.X-ABLabel:๐ Email\nitem3.URL:-/\nitem3.X-ABLabel:๐ฎ Rest Api\nitem4.ADR:;;๐ฎ๐ฉ Indonesia;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:๐ Region | Otaku ๐ฏ๐ต\nitem5.X-ABLabel:โโโโโโโ[ OSCAR ]โโโโโโโ\nEND:VCARD"
  }, {
    "displayName": "Whatsapp",
      "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:WHASTAPP;;;\nFN:Whatsapp\nitem1.TEL;waid=0:0\nitem1.X-ABLabel:๐ Whatsapp\nitem2.EMAIL;type=INTERNET:Whatsapp@gmail.com\nitem2.X-ABLabel:๐ Email\nitem3.URL:https://faq.whatsapp.com/\nitem3.X-ABLabel:โ๏ธ Rest Api\nitem4.ADR:;;โฉ๏ธ Whatsapp;;;;\nitem4.X-ABADR:ac\nitem4.X-ABLabel:๐ Official Bot Whatsapp\nitem5.X-ABLabel:โโโโโโโ[ แด แดสษชาส สส แดกสแดแดsแดแดแด ]โโโโโโโ\nEND:VCARD"
    }]
  }, MessageType.contactsArray, { quoted: m })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owneroscar)$/i

module.exports = handler
