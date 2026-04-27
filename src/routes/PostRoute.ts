import { Router } from "express";
import { postController } from "../controllers/Post.controller";

const router = Router();
const PostController = new postController();

router.get("/getPost", PostController.getPosts);
router.post("/createPost", PostController.createPosts)


export default router;  