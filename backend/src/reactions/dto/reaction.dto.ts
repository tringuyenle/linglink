import { Post } from "schemas/post.schema";
import { Comment } from "schemas/comment.schema";
import { ReactionType } from "src/common/enums/reaction.enum";

export class ReactionDTO {
    reactionType: ReactionType;

    post: Post;

    comment: Comment;
}