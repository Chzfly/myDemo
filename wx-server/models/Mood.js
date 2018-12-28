const mongoose = require('mongoose');

module.exports = mongoose.model("mood", {
    nickName: String,
    content: String,
    avatarUrl: String,
    fwqPics: [String],
    time: String
})