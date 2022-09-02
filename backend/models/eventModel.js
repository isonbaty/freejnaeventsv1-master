const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    desc: {
      type: String,
      required: [true, 'description is required'],
    },
    venue: {
      type: String,
      required: [true, 'Please enter a venue'],
    },

    status: {
      type: String,
      required: true,
      enum: ['upcoming', 'finished', 'postponed'],
      default: true,
    },
    date: {
      type: String,
      required: false,
      default: '',
    },
    isGoing: { type: Array, required: false, default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Events', eventsSchema);
