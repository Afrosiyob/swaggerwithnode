import { get } from 'lodash';
import { Request, Response } from 'express';
import { createPost, findAndUpdatePost, findPost, findPosts } from '../service/post.service';


export async function createPostHandler(req: Request, res: Response) {
    const userId = get(req, "user._id")
    const body = req.body
    const post = await findPost({ title: req.body.title })
    if (post) {
        return res.status(400).send("please enter other title");
    }
    const newPost = await createPost({ ...body, user: userId })
    return res.send(newPost)
}

export async function getPostsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const posts = await findPosts({ user: userId, valid: true });
    
  return res.send(posts);
}
export async function getPostHandler(req: Request, res: Response) {
    const postId = get(req, "params.postId")
    const post = await findPost({ postId })
    if (!post) {
        return res.sendStatus(404)
    }
    return res.send(post)
}

export async function updatePostHandler(req: Request, res: Response) {
    const postId = get(req, "params.postId")
    const userId = get(req, "user._id");
    const update = req.body
    
    const post = findPost({ postId })
    

    if (String(post.user) !== userId ) {
        return res.sendStatus(401)
    }
    
    if (!post) {
        return res.sendStatus(404)
    }
    
    const updatePost = await findAndUpdatePost({ postId }, update, { new: true })
    
    return res.send(updatePost)
}