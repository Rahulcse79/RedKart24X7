const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const seller = require('./routes/sellerRoute');
const sellerSetup = require('./routes/sellerStoreRoute');
const admin = require('./routes/adminRoute');

app.use('/api/v1/seller', seller)
app.use('/api/v1/seller', sellerSetup)
app.use('/api/v1', user);
app.use('/api/v1/admin', admin);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(errorMiddleware);

module.exports = app;