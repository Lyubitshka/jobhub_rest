const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        userId: { type: String, required: true, },

        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
    }, { timestamps: true }
);
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
module.exports = Bookmark;