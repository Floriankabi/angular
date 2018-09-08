import { Comment } from './comment';

export class Dish{
    id:number;
    name : string ;
    image :string ;
    category :string;
    label :string;
    price:string;
    featured : Boolean;
    description: string;
    comments: Comment[];
}
