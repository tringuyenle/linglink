import { AxiosResponse } from 'axios';
import createAxiosInstance from '../utils/axiosInstance';

export class PostService {
    static async createPost(post: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance()
        const response: AxiosResponse<any> = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, post);
        return response;
    }
    static async deletePost(postid: any): Promise<[AxiosResponse<any>, AxiosResponse<any>]> {
        const axiosInstance = createAxiosInstance();
        const [deletePostResponse, deleteCommentsResponse] = await Promise.all([
            axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/posts/${postid}`),
            CommentService.deleteCommentsByPostId(postid)
        ]);
        return [deletePostResponse, deleteCommentsResponse];
    }

}

export class CommentService {
    static async createComment(comment: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/comments`, comment);
        return response;
    }
    static async getComments(postid: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/post`,
            {
                params: {
                    postId: postid
                }
            }
        );
        return response;
    }
    static async getCommentsByCommentId(id: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/`,
            {
                params: {
                    commentId: id
                }
            }
        );
        return response;
    }
    static async deleteCommentsByPostId(id: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/post/${id}`);
        return response;
    }
    static async deleteById (id: any):  Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${id}`);
        return response;
    }
}

export class ReactionService {
    static async reactionPost(type: any, postid: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance()
        const response: AxiosResponse<any> = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reactions/${type}`, {
            postId: postid
        });
        return response;
    }
    static async reactionComment(type: any, commentid: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance()
        const response: AxiosResponse<any> = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reactions/${type}comment`, {
            commentId: commentid
        });
        return response;
    }
    static async getReactionPost(postid: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance()
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reactions/post/${postid}`);
        return response;
    }
    static async getReactionComment(commentid: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance()
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/reactions/comment/${commentid}`);
        return response;
    }
}
export class CourseService {
    static async createCourse(course: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`, course);
        return response;
    }

    static async getCourse(courseId: string): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`);
        return response;
    }

    static async updateCourse(courseId: string, updatedCourseData: any): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`, updatedCourseData);
        return response;
    }

    static async deleteCourse(courseId: string): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`);
        return response;
    }

    static async getCourses(page: number, limit: number): Promise<AxiosResponse<any>> {
        const axiosInstance = createAxiosInstance();
        const response: AxiosResponse<any> = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`, {
            params: {
                page: page,
                limit: limit
            }
        });
        return response;
    }
}