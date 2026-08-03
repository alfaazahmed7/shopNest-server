const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('ShopNest Backed is Working Properly.');
});

app.use('/api/products', require('./routes/product.routes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.use(cors()); -> For every incoming request, run the CORS middleware.
// app.use(express.json()); -> Whenever the client sends JSON, convert it into a JavaScript object.

// Frontend
//    │
//    ▼
// index.js
//    │
//    ▼
// Route
//    │
//    ▼
// Middleware (optional)
//    │
//    ▼
// Controller
//    │
//    ▼
// Model
//    │
//    ▼
// MongoDB