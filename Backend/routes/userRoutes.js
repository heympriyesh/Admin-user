const { Router } = require('express');
const userController = require('../controllers/userController')
const router = Router();
const requireAuth = require('../requireAuth')

router.get('/dropdownvalue', userController.get_dropdown)
router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)
router.get('/user-details/:id', userController.user_item)
router.patch('/user-details/:id',requireAuth, userController.userupdate_item)
router.get('/',requireAuth, userController.get_all_details);
router.delete('/all-details/:id', requireAuth, userController.delete_item);
router.patch('/all-details/:id', requireAuth, userController.update_item);
router.get('/filter/:category', requireAuth, userController.filter_data);
router.patch('/active/:id/',  userController.active);
router.patch('/deactive/:id/', userController.deactive);
router.patch('/reset-password/:id',userController.reset_Password)
router.post('/forgot-password',userController.forgot_password)
router.post('/new-password',userController.update_Password)
router.get('/:email', userController.admin_check);
router.post('/:search', userController.search_Result);

module.exports = router;
