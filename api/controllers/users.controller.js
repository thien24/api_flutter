// /controllers/userController.js
const User = require('../models/users.model')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Lấy tất cả user từ cơ sở dữ liệu
    res.status(200).json(users); // Trả về danh sách user
  } catch (error) {
    console.error('Error details:', error.message); // Log chi tiết lỗi
    console.error('Full error object:', error); // Log toàn bộ lỗi
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, country, email, password, role } = req.body;

    // Kiểm tra nếu thiếu trường bắt buộc
    if (!firstName || !lastName || !country || !email || !password) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const user = new User({
      firstName,
      lastName,
      country,
      email,
      password,
      role,
    });

    const savedUser = await user.save(); // Lưu user vào cơ sở dữ liệu
    res.status(201).json(savedUser); // Trả về user vừa tạo
  } catch (error) {
    console.error('Error details:', error.message); // Log chi tiết lỗi
    console.error('Full error object:', error); // Log toàn bộ lỗi
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, country, email, password, role } = req.body;

    // Chỉ cập nhật các trường đã cung cấp
    const updatedFields = {};
    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (country) updatedFields.country = country;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (role) updatedFields.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Trả về user đã được cập nhật
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error updating user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' }); // Thông báo xóa thành công
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error deleting user', error });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany(); // Xóa tất cả user trong cơ sở dữ liệu
    res.json({ message: 'All users deleted successfully' }); // Thông báo xóa thành công
  } catch (error) {
    console.error('Error details:', error.message);
    console.error('Full error object:', error);
    res.status(400).json({ message: 'Error deleting all users', error });
  }
};
