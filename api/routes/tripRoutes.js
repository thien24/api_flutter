// /routes/tripRoutes.js
const express = require('express');
const tripController = require('../controllers/tripController');
const router = express.Router();

// Route để lấy tất cả chuyến đi
router.get('/', tripController.getAllTrips);

// Route để lấy chuyến đi theo ID
router.get('/:id', tripController.getTripById);

// Route để thêm chuyến đi mới
router.post('/', tripController.createTrip);

// Route để cập nhật chuyến đi theo ID
router.put('/:id', tripController.updateTrip);

// Route để xóa chuyến đi theo ID
router.delete('/:id', tripController.deleteTrip);

router.delete('/', tripController.deleteAllTrips); // Thêm route xóa tất cả chuyến đi

module.exports = router;
