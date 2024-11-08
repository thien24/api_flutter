// /models/tripModel.js
const mongoose = require('mongoose');

// Định nghĩa schema cho trip
const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  trip: {
    tripName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guide: { type: String, required: true },
    actions: {
      Detail: { type: String, required: false },
      Chat: { type: String, required: false },
      Pay: { type: String, required: false }
    }
  }
});

// MongoDB sẽ tự động tạo trường _id, không cần khai báo id nữa
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
