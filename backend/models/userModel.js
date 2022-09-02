const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please enter a password'],
    },

    division: {
      type: String,
      enum: [
        'Water & Civil',
        'Generation',
        'Transmission Power',
        'Billing Services',
        'Business Support & Human Resources',
        'Innovation & The Future',
        'Power & Water Planning',
        'Distribution Power',
        'Internal Audit',
        'Legal Affairs',
        'Finance',
        'Business Development & Excellence',
        'Strategy & Corporate Communications',
      ],
      required: [true, 'please enter a division'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
      required: false,
      default: '',
    },
    payroll: {
      type: String,
      required: [true, 'please enter a payroll number'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
