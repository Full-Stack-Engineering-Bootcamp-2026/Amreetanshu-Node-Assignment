import { Request,Response } from "express";
import { PostService } from "../services/post.service";


export  class postController{

    private postService = new PostService();

    public getPosts = async (req:Request ,res:Response)=>{

        try{
            const page = parseInt(req.query.page as string)||1;
            const limit =parseInt(req.query.page as string)||5;

            const result = await this.postService.getPosts(page,limit);

            res.status(200).json(result);

        }catch(error){
            res.status(500).json({message : "Error in the getPost",error}); 
        }
    }

    public createPosts = async(req:Request , res: Response)=>{

        try{
            const{title,content,author}= req.body;

            const post = await this.postService.createPosts(
                {
                    title,
                    content,
                    author
                }
            )

            res.status(201).json({message:"Post created Successfully",data:post})


        }catch(error){
            res.status(500).json({
                message: "Error in createpost",error
            })

        }
    }


}