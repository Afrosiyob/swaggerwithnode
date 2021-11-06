import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import log from '../logger';
import Post, { PostDocument } from '../model/post.model';


export async function createPost(input : DocumentDefinition<PostDocument>) {
    try {
        return Post.create(input)
    } catch (error) {
        log.error(error)
        throw new Error((error as Error).message)   
    }
}

export async function findPost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = {lean :true}
) {
    try {
        return Post.findOne(query, {}, options)
    } catch (error) {
        log.error(error)
        throw new Error((error as Error).message)
    }
}

export async function findAndUpdatePost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options: QueryOptions
) {
    try {
        return Post.findOneAndUpdate(query, update, options)
    } catch (error) {
        log.error(error)
        throw new Error((error as Error).message)
    }

}

export async function findPosts(query: FilterQuery<PostDocument>) {
    return Post.find(query).lean()
}