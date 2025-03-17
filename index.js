const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./schema');


const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


const DB = async() => {
  try {
    await mongoose.connect(MONGODB_URI)
    
  } catch (error) {
    console.log(error);
  }
}
// POST /menu
app.post('/menu', async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json({ message: 'Menu item created successfully', data: savedMenuItem });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
});

// GET /menu
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json({message:"data retrieved",data:menuItems});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));