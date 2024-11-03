import User from '../user/user.model';
import Payment from './payment.model';

const confirmationService = async (transactionId: string, userId: string) => {
  const userUpdate = await User.findByIdAndUpdate(userId, { isVerified: true });
  const paymentUpdate = await Payment.findOneAndUpdate(
    { tran_id: transactionId },
    { payment_status: 'completed' },
  );

  return { userUpdate, paymentUpdate };
};

export const paymentServices = {
  confirmationService,
};
