// /controllers/addressController.js
// Lấy danh sách tất cả các địa điểm (Address)
const Address = require('../models/address.model')
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find(); // Lấy tất cả các địa chỉ từ cơ sở dữ liệu
    res.status(200).json(addresses); // Trả về danh sách địa chỉ
  } catch (error) {
    console.error('Error details:', error.message); // Log chi tiết lỗi
    console.error('Full error object:', error); // Log toàn bộ lỗi
    res.status(500).json({ message: 'Error fetching addresses', error: error.message });
  }
};

// Tạo mới một địa điểm (Address)
exports.createAddress = async (req, res) => {
  try {
    const { name, avatar, city, imagecity, note, id } = req.body;

    // Kiểm tra nếu thiếu trường bắt buộc
    if (!name || !avatar || !city || !imagecity || !note || !id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const address = new Address({
      name,
      avatar,
      city,
      imagecity,
      note,
      id,
    });

    const savedAddress = await address.save(); // Lưu địa chỉ vào cơ sở dữ liệu
    res.status(201).json(savedAddress); // Trả về địa chỉ vừa tạo
  } catch (error) {
    console.error('Error details:', error.message); // Log chi tiết lỗi
    console.error('Full error object:', error); // Log toàn bộ lỗi
    res.status(400).json({ message: 'Error creating address', error: error.message });
  }
};

// Cập nhật địa chỉ theo ID
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(address); // Trả về địa chỉ đã được cập nhật
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error updating address', error });
  }
};

// Xóa địa chỉ theo ID
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' }); // Thông báo xóa thành công
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error deleting address', error });
  }
};

// Xóa tất cả các địa chỉ
exports.deleteAllAddresses = async (req, res) => {
  try {
    await Address.deleteMany(); // Xóa tất cả các địa chỉ trong cơ sở dữ liệu
    res.json({ message: 'All addresses deleted successfully' }); // Thông báo xóa thành công
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error deleting all addresses', error });
  }
};
