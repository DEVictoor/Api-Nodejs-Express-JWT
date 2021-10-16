import Router from "express";
// import * as userCtrl from "../controller/user.controller";
  import * as vetCtrl from "../controller/vet.controller";
import { authJwt  } from "../middlewares";

const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isSuperAdmin],
  vetCtrl.createVet
);

router.get(
  "/",
  [authJwt.verifyToken,  authJwt.isSuperAdmin],
  vetCtrl.getVets
  );
  
router.get(
    "/all",
    [authJwt.verifyToken,  authJwt.isSuperAdmin],
    vetCtrl.getVetsAll
)

router.get(
    "/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    vetCtrl.getVetById
)

router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    vetCtrl.updateVetById
)

router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isSuperAdmin],
    vetCtrl.deleteVetById
)

export default router;
