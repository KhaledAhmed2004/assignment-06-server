
import express from 'express';
import auth from '../../middlewares/auth';
import {
  initPayment,
  confirmationController,
  getAllPayments,
} from './payment.controller';

const router = express.Router();

router.get('/', auth('admin'), getAllPayments);
router.route('/init-payment').post(auth('user', 'admin'), initPayment);
router.post('/confirmation', confirmationController);

export const PaymentRoutes = router;
