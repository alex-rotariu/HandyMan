const express = require('express');

const {
    requireFirstName,
    requireLastName,
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requirePhone,
    requireUsername,
    requireEditMail,
    requireEditPhone
} = require('../util/validators');
const { handleErrors } = require('../middlewares/handle-errors.js');
const {
    getUsers,
    signup,
    login,
    getUserById,
    updateUser,
    updatePassword
} = require('../controllers/users-controllers');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

router.get('/', getUsers);

// If we create more routes with a single parameter after /, we should leave this one with :userId LAST (GET routes)

router.get('/:userId', getUserById);

router.post(
    '/signup',
    [
        requireFirstName,
        requireLastName,
        requireEmail,
        requirePassword,
        requirePhone,
        requireUsername
    ],
    handleErrors,
    signup
);

router.post('/login', login);

router.patch(
    '/update/:userId/password',
    checkAuth,
    [requirePassword, requirePasswordConfirmation],
    handleErrors,
    updatePassword
);

router.patch(
    '/update/:userId',
    checkAuth,
    [requireFirstName, requireLastName, requireEditMail, requireEditPhone],
    handleErrors,
    updateUser
);

module.exports = router;
