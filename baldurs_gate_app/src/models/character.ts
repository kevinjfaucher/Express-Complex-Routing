import { ObjectId } from "mongodb";

export interface Character {
    _id?: ObjectId | string;
    name: string;
    class: 'Barbarian' | 'Wizard' | 'Mage' | 'Paladin' | 'Druid' | 'Sorcerer'| 'Assassin' | 'Rogue';
    alignment: 'Good' | 'Neutral' | 'Evil';
}