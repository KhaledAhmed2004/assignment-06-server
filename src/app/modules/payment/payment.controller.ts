// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import User from '../user/user.model';
// import AppError from '../../errors/AppError';
// import dotenv from 'dotenv';
// import axios from 'axios';
// import { paymentServices } from './payment.services';
// import * as factory from '../../utils/handlerFactory';
// import Payment from './payment.model';

// dotenv.config();

// // Initialize Payment
// export const initPayment = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.userId);
//   if (!user) return next(new AppError(httpStatus.NOT_FOUND, `User not found`));

//   const transactionId = `TXN${Date.now()}`;

//   const response = await axios.post(process.env.PAYMENT_URL!, {
//     store_id: process.env.STORE_ID,
//     signature_key: process.env.SIGNATURE_KEY,
//     tran_id: transactionId,
//     success_url: `http://localhost:5000/api/payments/confirmation?transactionId=${transactionId}&userId=${req.user.userId}`,
//     fail_url: 'http://www.merchantdomain.com/failedpage.html',
//     cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
//     amount: '2000.0',
//     currency: 'BDT',
//     desc: 'Merchant Registration Payment',
//     cus_name: user.name,
//     cus_email: user.email,
//     cus_add1: 'House B-158 Road 22',
//     cus_add2: 'Mohakhali DOHS',
//     cus_city: 'Dhaka',
//     cus_state: 'Dhaka',
//     cus_postcode: '1206',
//     cus_country: 'Bangladesh',
//     cus_phone: '+8801704',
//     type: 'json',
//   });

//   console.log(response.data);
//   res.status(200).json({
//     status: 'success',
//     payment_url: response.data.payment_url,
//   });
// });

// // Payment Confirmation
// export const confirmationController = catchAsync(async (req, res, next) => {
//   const { transactionId, userId } = req.query;

//   if (!transactionId || !userId) {
//     return next(
//       new AppError(
//         httpStatus.BAD_REQUEST,
//         'Transaction ID and User ID are required.',
//       ),
//     );
//   }

//   const result = await paymentServices.confirmationService(
//     transactionId as string,
//     userId as string,
//   );

//   res.send(`<h1>Payment success</h1>`);
// });

// // Get All Payments
// export const getAllPayments = factory.getAll(Payment, 'user');

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import dotenv from 'dotenv';
import axios from 'axios';
import { paymentServices } from './payment.services';
import * as factory from '../../utils/handlerFactory';
import Payment from './payment.model';

dotenv.config();

// Initialize Payment
export const initPayment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user) return next(new AppError(httpStatus.NOT_FOUND, `User not found`));

  const transactionId = `TXN${Date.now()}`;

  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: transactionId,
    success_url: `http://localhost:5000/api/payments/confirmation?transactionId=${transactionId}&userId=${req.user.userId}`,
    fail_url: 'http://www.merchantdomain.com/failedpage.html',
    cancel_url: 'http://www.merchantdomain.com/cancelpage.html',
    amount: '2000.0',
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: 'House B-158 Road 22',
    cus_add2: 'Mohakhali DOHS',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1206',
    cus_country: 'Bangladesh',
    cus_phone: '+8801704',
    type: 'json',
  });

  console.log(response.data);
  res.status(200).json({
    status: 'success',
    payment_url: response.data.payment_url,
  });
});

// Payment Confirmation
export const confirmationController = catchAsync(async (req, res, next) => {
  const { transactionId, userId } = req.query;

  if (!transactionId || !userId) {
    return next(
      new AppError(
        httpStatus.BAD_REQUEST,
        'Transaction ID and User ID are required.',
      ),
    );
  }

  // Update the user and payment status
  const result = await paymentServices.confirmationService(
    transactionId as string,
    userId as string,
  );

  // Create a new payment record in the Payment collection
  await Payment.create({
    user: userId,
    tran_id: transactionId,
    amount: 2000, // You can adjust this amount as needed
    currency: 'BDT',
    payment_status: 'completed',
  });

  res.send(`<h1>Payment success</h1>`);
});

// Get All Payments
export const getAllPayments = factory.getAll(Payment, 'user');
