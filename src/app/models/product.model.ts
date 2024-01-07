import { Category } from "./category.model";

export interface Product{
    id: string,
    price: number,
    name: string,
    categories: Category[],
    imageUrl: string,
    cookTime: number,
    description: string,
    stars: number,
    onSale:number,
    published:number,
}