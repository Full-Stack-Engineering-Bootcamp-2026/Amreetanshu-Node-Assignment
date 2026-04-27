import {Post} from "../model/post.model";


export class PostService{

    public async getPosts(page:number , limit:number){
        const skip = (page-1)*limit;

        const posts = Post.find().skip(skip).limit(limit);
        const total = await Post.countDocuments();

        return{
            data:posts,
            total,
            page,
            limit,
            totalpages : Math.ceil(total/limit)
        }

    }

    public async createPosts(data:
        {
            title:string;
            content:string;
            author:string;
        }
    ){
       const post = await Post.create(data);
       return post;

    }
}