"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)('admin'), payment_controller_1.getAllPayments);
router.route('/init-payment').post((0, auth_1.default)('user', 'admin'), payment_controller_1.initPayment);
router.post('/confirmation', payment_controller_1.confirmationController);
router.post('/failure', payment_controller_1.paymentFailureController); // New route for payment failure
exports.PaymentRoutes = router;
