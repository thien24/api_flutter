// /controllers/tripController.js
const Trip = require('../models/tripModel');

// In controller (ví dụ createTrip)
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body); // Tạo một chuyến đi mới từ dữ liệu gửi lên
    await trip.save(); // Lưu vào cơ sở dữ liệu
    res.status(201).json(trip); // Trả về chuyến đi vừa tạo
  } catch (error) {
    // Log chi tiết lỗi vào terminal
    console.error('Error details:', error.message); // Log lỗi ra terminal
    console.error('Full error object:', error); // Log toàn bộ lỗi để kiểm tra thêm thông tin chi tiết
    res.status(400).json({ message: 'Error creating trip', error: error.message }); // Trả về thông báo lỗi
  }
};


// Cập nhật chuyến đi theo ID
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Error updating trip', error });
  }
};

// Xóa chuyến đi theo ID
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting trip', error });
  }
};

// Lấy tất cả chuyến đi
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching trips', error });
  }
};

// Lấy chuyến đi theo ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching trip', error });
  }
};
exports.deleteAllTrips = async (req, res) => {
  try {
    await Trip.deleteMany();  // Xóa tất cả các chuyến đi
    res.json({ message: 'All trips deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting all trips', error });
  }
};
