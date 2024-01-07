import { Address } from "./address.model";
export interface User{
    userId:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    about:string;
    role:string;
    addresses: Address[];
    status:string;
}