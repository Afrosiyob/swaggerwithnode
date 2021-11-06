import { get } from 'lodash';
import { Request, Response } from 'express';
import { createPost, findAndUpdatePost, findPost } from '../service/post.service';


export async function createPostHandler(req: Request, res: Response) {

    const userId = get(req, "user._id")
    
    const body = req.body
    
    const newPost = await createPost({ ...body, user: userId })
    
    return res.send(newPost)

}
export async function getPostsHandler(req: Request, res: Response) {
    
}
export async function getPostHandler(req: Request, res: Response) {
    
}
export async function updatePostHandler(req: Request, res: Response) {
    const postId = get(req, "params.postId")
    const update = req.body
    
    const post = findPost({ postId })
    
    if (!post) {
        return res.sendStatus(404)
    }
    
    const updatePost = await findAndUpdatePost({ postId }, update, { new: true })
    
    return res.send(updatePost)
}