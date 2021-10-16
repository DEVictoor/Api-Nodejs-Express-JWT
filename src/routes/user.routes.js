import * as userCtrl from "../controller/user.controller";
import Router from "express";
import { authJwt } from "../middlewares";

const router = Router();

//Api solo para administrar los tipos de peticiones de los usuarios 
//Las veterinarias donde trabajan los veterinarias se va a extraer del token 

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.createUser
);

router.get(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUsers
)

router.get(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUserById
)

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.updateUserById
)

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.deleteUserById
)

export default router;
