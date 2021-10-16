import Router from 'express'
import * as authCtrl from '../controller/auth.controller'
// import { verifySignup } from "../middlewares";

const router = Router()

// router.post('/signup', [verifySignup.checkRolesExisted], authCtrl.signup)

//Solo sirve para authenticarse 

router.post('/signin', authCtrl.signin)

export default router;