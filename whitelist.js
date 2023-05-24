const fs = require("fs");

function isAdmin(userId) {
    const whitelistData = fs.readFileSync("whitelist.json", "utf8");
    const whitelist = JSON.parse(whitelistData);
    return whitelist.adminid.includes(userId);
}

function checkWhitelist(bot, msg) {
    console.log("!admin command received");
    const userId = msg.author.id;
    const isAdminUser = isAdmin(userId);

    if (isAdminUser) {
        bot.createMessage(msg.channel.id, `${msg.author.username} is an admin.`);
    } else {
        bot.createMessage(msg.channel.id, `User ${msg.author.username} is not an admin.`);
    }
}

module.exports = {
    checkWhitelist,
};

// function getWhitelistedServers() {
//     const whitelistData = fs.readFileSync("whitelist.json", "utf8");
//     const whitelist = JSON.parse(whitelistData);
//     return whitelist.whitelistedServers;
// }

//     const whitelistedServers = getWhitelistedServers();
//     const serverId = msg.channel.guild?.id; // Use optional chaining to handle undefined guild
//     const userId = msg.author.id;

//     if (isAdmin(userId)) {
//         if (serverId) {
//             if (!whitelistedServers.includes(serverId)) {
//                 bot.createMessage(msg.channel.id, `This server is not on the whitelist. Contact MR_Catto#0015 for help. serverid: ${serverId}`);
//                 console.log(`Leaving unauthorized server: ${serverId}`);
//                 bot.leaveGuild(serverId);
//             }
//         } else {
//             bot.createMessage(msg.channel.id, "White list check completed.");
//         }
//     } else {
//         bot.createMessage(msg.channel.id, "You do not have permission to use this command.");
//     }
// }