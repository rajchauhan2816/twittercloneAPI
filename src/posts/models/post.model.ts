import { Comment } from './../schemas/comment.schema';
import { Like } from './../schemas/like.schema';
import { Post } from './../schemas/post.schema';
export class PostModel {
	post: Post;
	like: Like[];
	comment: Comment[];
	isLiked: boolean;
	myLike?: Like; 
}
