// const express = require('express');
// const router = express.Router();
// const User = require('../models/users.model');
// const userController = require('../controllers/users.controller');

// // Đăng ký người dùng
// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, country, email, password, role } = req.body;

//   // Kiểm tra nếu email đã tồn tại
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'Email already exists' });
//   }

//   // Tạo người dùng mới
//   const newUser = new User({ firstName, lastName, country, email, password, role });
//   try {
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// });
// router.get('/', userController.getuser);

// // Tạo mới một nguoi dung
// router.post('/create', userController.createuser);

// // Xóa tất cả các usser
// router.delete('/deleteAll', userController.deleteAllusers);

// module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')
const User = require('../models/users.model')

// Đăng ký người dùng
router.post('/signup', async (req, res) => {
  const { firstName, lastName, country, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ firstName, lastName, country, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Đăng nhập người dùng
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Lấy tất cả người dùng
router.get('/', userController.getAllUsers);

// Tạo người dùng mới
router.post('/create', userController.createUser);

// Cập nhật thông tin người dùng
router.put('/update/:id', userController.updateUser);

// Xóa từng người dùng theo ID
router.delete('/delete/:id', userController.deleteUser);

// Xóa tất cả người dùng
router.delete('/deleteAll', userController.deleteAllUsers);

module.exports = router;
