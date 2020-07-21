import { Admins } from './admins';
import { Image } from './image';
import { Category } from './category';
export class News {
    newsId:number;
    title:string;
    description:string;
    region:string;
    source:string;
    likeCount:number;
    date:string;
    time:string;
    hitCount:number;
    admins:Admins;
    images:Image[]
    comments:Comment[];
    category:Category;

}
