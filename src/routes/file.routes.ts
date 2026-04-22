import { Router } from "express";
import { FileController} from "../controllers/file.controller";
import {upload} from "../middleware/multer.middleware";

const router = Router();
const fileController = new FileController();

router.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        message: "Handled on Route level"
      });
    }
    next();
  });
}, fileController.uploadFile);

export default router;
