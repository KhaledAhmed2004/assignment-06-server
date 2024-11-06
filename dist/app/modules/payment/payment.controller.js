"use strict";
// import httpStatus from 'http-status';
// import catchAsync from '../../utils/catchAsync';
// import User from '../user/user.model';
// import AppError from '../../errors/AppError';
// import dotenv from 'dotenv';
// import axios from 'axios';
// import { paymentServices } from './payment.services';
// import * as factory from '../../utils/handlerFactory';
// import Payment from './payment.model';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFailureController = exports.getAllPayments = exports.confirmationController = exports.initPayment = void 0;
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
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const payment_services_1 = require("./payment.services");
const factory = __importStar(require("../../utils/handlerFactory"));
const payment_model_1 = __importDefault(require("./payment.model"));
dotenv_1.default.config();
// Initialize Payment
exports.initPayment = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.user.userId);
    if (!user)
        return next(new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found`));
    const transactionId = `TXN${Date.now()}`;
    const response = yield axios_1.default.post(process.env.PAYMENT_URL, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: transactionId,
        success_url: `https://tec-que-server.vercel.app/api/payments/confirmation?transactionId=${transactionId}&userId=${req.user.userId}`,
        // fail_url: 'http://www.merchantdomain.com/failedpage.html',
        fail_url: `https://tec-que-server.vercel.app/api/payments/failure?transactionId=${transactionId}&userId=${req.user.userId}`,
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
}));
// Payment Confirmation
exports.confirmationController = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, userId } = req.query;
    if (!transactionId || !userId) {
        return next(new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Transaction ID and User ID are required.'));
    }
    // Update the user and payment status
    const result = yield payment_services_1.paymentServices.confirmationService(transactionId, userId);
    // Create a new payment record in the Payment collection
    yield payment_model_1.default.create({
        user: userId,
        tran_id: transactionId,
        amount: 2000,
        currency: 'BDT',
        payment_status: 'completed',
    });
    // res.send(`<h1>Payment success</h1>`);
    res.redirect(`${process.env.CLIENT_URL}/payment/success`);
}));
// Get All Payments
exports.getAllPayments = factory.getAll(payment_model_1.default, 'user');
// Payment Failure
exports.paymentFailureController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send(`<h1>Payment success</h1>`);
    res.redirect(`${process.env.CLIENT_URL}/payment/error`);
}));
