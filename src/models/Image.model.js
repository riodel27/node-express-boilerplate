const { model, Schema } = require('mongoose');

const imageSchema = Schema({
  url: String,
  originalUrl: String,
  thumbnailUrl: String,
  guardian: Boolean,
  administrator: {
    type: Schema.Types.ObjectId,
    ref: 'Administrator',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Image', imageSchema);
