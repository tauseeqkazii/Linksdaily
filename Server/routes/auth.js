import express from 'express'
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} from '../controllers/auth'

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({
    data: 'API FROM TK',
  })
})

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
