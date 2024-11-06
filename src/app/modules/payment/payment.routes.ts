
import express from 'express';
import auth from '../../middlewares/auth';
import {
  initPayment,
  confirmationController,
  getAllPayments,
  paymentFailureController,
} from './payment.controller';

const router = express.Router();

router.get('/', auth('admin'), getAllPayments);
router.route('/init-payment').post(auth('user', 'admin'), initPayment);
router.post('/confirmation', confirmationController);

router.post('/failure', paymentFailureController); // New route for payment failure


export const PaymentRoutes = router;
