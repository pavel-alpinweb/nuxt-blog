const passport = require('passport');
const {Router} = require('express');
const upload = require('../middleware/upload');
const ctr = require('../controllers/post.controllers');
const router = Router();

// /api/post
// Admin
router.post(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    upload.any(),
    ctr.create
);

router.get(
    '/admin/',
    passport.authenticate('jwt', {session: false}),
    ctr.getAll
);

router.get(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.getById
);

router.put(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.update
);

router.delete(
    '/admin/:id',
    passport.authenticate('jwt', {session: false}),
    ctr.remove
);

router.get(
    '/admin/get/analytics',
    passport.authenticate('jwt', {session: false}),
    ctr.getAnalyticks
);

// Base
// /api/post
router.get('/', ctr.getAll);
router.get('/:id', ctr.getById);
router.put('/add/view/:id', ctr.addView);

module.exports = router;