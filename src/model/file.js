const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalName: { type: String, required: true },
    key: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedByPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' },
    uploadedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadedByRepairman: { type: mongoose.Schema.Types.ObjectId, ref: 'Repairman' },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
