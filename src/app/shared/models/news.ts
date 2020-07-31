import { Admins } from './admins';
import { Image } from './image';
import { Category } from './category';
import { Comment } from './comment'
export class News {
    newsId: number;
    title: string;
    description: string;
    region: string;
    source: string;
    likeCount: number;
    date: string;
    time: string;
    hitCount: number;
    admins: Admins;
    images: Image[];
    comments: Comment[];
    category: Category;
    constructor(title: string, source: string, category: Category, description: string, images: Image[],admins:Admins) {
        this.title = title;
        this.source = source;
        this.category = category;
        this.description = description;
        this.images = images;
        this.admins=admins;
    }

}
