const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const Trip = require('./api/models/tripModel');

// Kết nối MongoDB
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://vanthien562004:vanthien562004@cluster0.bfjs9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URL)
    .then(() => console.log('Connected to the database successfully'))
    .catch((error) => {
        console.error('Error connecting to the database', error);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Định nghĩa route cho location
const tripRoutes = require('./api/routes/tripRoutes');
const addressRoute = require('./api/routes/address.route');
const userRoute = require('./api/routes/users.route')

app.use('/user', userRoute);
app.use('/address', addressRoute);
app.use('/trips', tripRoutes);


// API PUT để cập nhật chuyến đi
app.put('/trips/:id', async (req, res) => {
  const { id } = req.params;
  const updatedTrip = req.body;

  try {
    // Cập nhật chuyến đi trong MongoDB
    const trip = await Trip.findByIdAndUpdate(id, updatedTrip, { new: true });
    
    if (!trip) {
      return res.status(404).send('Trip not found');
    }

    res.json(trip);  // Trả về chuyến đi đã được cập nhật
  } catch (err) {
    res.status(500).send('Error updating trip: ' + err);
  }
});

// Route chính
app.get('/', (req, res) => res.send('Thien đang học Node.js'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on http://localhost:${PORT}`));
