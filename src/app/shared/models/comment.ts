import { News } from './news';

export class Comment {
    commentId:number;
    postedBy:string;
    postedDate:string;
    comment:string;
    news:News;
}
