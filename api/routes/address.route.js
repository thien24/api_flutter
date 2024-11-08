const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');

// Lấy danh sách tất cả địa điểm
router.get('/', addressController.getAllAddresses); // Đổi tên hàm từ getaddress sang getAllAddresses

// Tạo mới một địa điểm
router.post('/', addressController.createAddress); // Đổi tên hàm từ createaddress sang createAddress

// Cập nhật địa điểm theo ID
router.put('/:id', addressController.updateAddress); // Thêm route để cập nhật địa chỉ

// Xóa địa điểm theo ID
router.delete('/:id', addressController.deleteAddress); // Thêm route để xóa địa chỉ theo ID

// Xóa tất cả các địa điểm
router.delete('/deleteAll', addressController.deleteAllAddresses); // Đổi tên hàm từ deleteAlladdresss sang deleteAllAddresses

module.exports = router;
