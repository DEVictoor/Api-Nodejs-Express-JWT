import Router from "express";
import * as productsCtrl from "../controller/products.controller";
import { authJwt } from "../middlewares";

//Ignorar esta paginas por mientras

const router = Router();

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.createProduct
);

router.get("/", productsCtrl.getProducts);

router.get("/page/:page/size/:size", productsCtrl.getProductsByPage);

router.get("/:productId", productsCtrl.getProductById);

router.put("/:productId", authJwt.verifyToken, productsCtrl.updateProductById);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.deleteProductById
);

export default router;
