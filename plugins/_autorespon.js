let fs = require('fs')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'jarotbotz tidak aktif' : banned ? 'kamu dibanned' : '*APAAN NGETAG",ADA BANSOS KAH๐ฟ?*',
                'ยฉjarotbotz',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : 'Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.?',
                m.isGroup ? 'Ban' : isBanned ? 'Unban' : 'Donasi',
                m.isGroup ? '.ban' : isBanned ? '.unban' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.send2ButtonLoc(m.chat, await (await fetch(fla + 'sewa bot')).buffer(), `
โญโโโ ใ ๐๐๐๐ ๐๐๐๐๐๐๐๐๐๐๐๐ ใ โโโโ
โโฌก ๐ แทแแชแฉแ  *15.000*
โโฌก 4 แทแแชแฉแ  *30.000*
โโฌก 8 BULAN   *40.000*
โโโโโโโโโโโโโโโโ
๐๐๐ฎ ๐ฌ๐๐ฐ๐? ๐๐ ๐ฅ๐๐ง๐ ๐ฌ๐ฎ๐ง๐  ๐ค๐ ๐จ๐ฐ๐ง๐๐ซ ๐๐ฃ๐ ๐ง๐ ๐๐ฉ๐ข๐ง ๐ค๐ ๐๐จ๐ญโ๏ธ
โญโโโโโโโโโโโโโโโโโโโโโโโ
โโญโโโ ใ ๐๐๐ ๐๐๐๐๐๐ ใ โโโโโโโ
โโโธ *DANA* : 085850539404
โโโธ *PULSA*: 085850539404
โโฐโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
โฐโโโโโโโโโโโโโโโโโโโโโโโ`.trim(), 'ยฉjarotbotz', 'PAYMENT', '.payment', 'MENU', '.menu', m)
}

    // salam
    let reg = /(ass?alam|ุงููุณูููุงููู ุนููููููููู|ุงูุณูุงู ุนููฺฉู)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        this.sendSticker(m.chat, fs.readFileSync('./src/salam.webp'), m, {sendEphemeral: true})
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

    // update status
    if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        await this.setStatus(`oscarbotz Aktif selama ${uptime} | Mode: ${global.opts['self'] ? 'Private' : setting.groupOnly ? 'Hanya Grup' : 'Publik'} |Jarotbotz by.jarot`).catch(_ => _)
        setting.status = new Date() * 1
    }

}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
