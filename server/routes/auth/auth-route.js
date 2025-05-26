import express from 'express'
import { registerUser } from '../../controllers/auth/auth-contoller.js';

const router = express.Router();

router.post('/register',registerUser)

export default router