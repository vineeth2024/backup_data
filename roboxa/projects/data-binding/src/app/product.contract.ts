export interface ProductDetails {
    id:number;
    title:string;
    price:number;
    description:string;
    category:string
    rating:{
        rate:number
        count:number
    }
}