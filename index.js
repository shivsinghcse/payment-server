const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cors = require('cors');
const app = express();

const instance = new Razorpay({
    key_id: 'rzp_test_kGBtJmWd9jOHTh',
    key_secret: 'BKOz4TkJNNXhX7JR5OpIwaml',
});

app.listen(8080);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/order', async (req, res) => {
    try {
        const newOrder = await instance.orders.create({
            amount: req.body.amount * 100,
            receipt: 'CO_RP_' + Date.now(),
        });
        res.json({
            amount: newOrder.amount,
            orderId: newOrder.id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/', (req, res) => {
    res.send('Razorpay Payment API is running 🚀');
});
