const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile, updateUserProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/me
router.get('/me', isAuthenticated, userProfile);
// /api/updateuserprofile
router.put('/updateuserprofile', isAuthenticated, updateUserProfile);

module.exports = router;