const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('./models/Product');


const app = express();
const PORT = process.env.PORT || 3000;


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mernstack', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack Backend Task');
});


// API route to initialize the database
app.get('/api/transactions', async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;

    try {
        // Convert month name to month index (1-12)
        const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth() + 1;
        const regex = new RegExp(search, 'i');
        
        const matchStage = {
            $match: {
                $and: [
                    { $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] } },
                    {
                        $or: [
                            { title: regex },
                            { description: regex },
                            { price: isNaN(parseFloat(search)) ? { $exists: true } : parseFloat(search) }
                        ]
                    }
                ]
            }
        };

        const transactions = await Product.aggregate([
            {
                $addFields: {
                    monthOfSale: { $month: "$dateOfSale" }
                }
            },
            matchStage,
            {
                $skip: (parseInt(page) - 1) * parseInt(perPage)
            },
            {
                $limit: parseInt(perPage)
            }
        ]);

        const totalTransactions = await Product.aggregate([
            {
                $addFields: {
                    monthOfSale: { $month: "$dateOfSale" }
                }
            },
            matchStage,
            {
                $count: "total"
            }
        ]);

        res.json({
            page: parseInt(page),
            perPage: parseInt(perPage),
            total: totalTransactions[0] ? totalTransactions[0].total : 0,
            transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
