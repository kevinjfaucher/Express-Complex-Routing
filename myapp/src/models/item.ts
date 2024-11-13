import { ObjectId } from 'mongodb';

export interface Item {
    _id?: ObjectId | string;
    name: string;
    description: string;
}
