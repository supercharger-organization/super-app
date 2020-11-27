import { Card } from './card-model';
import { Startup } from './startup-model';

export class List {
    _id: string;
    title:string;
    position: number;
    boardId: number;
    startupIds: [number];
    startups: [Startup];

    name: string; //_deprecated
    cards : Card[]; //_deprecated

    chatHeads:any[] = [];

    imgURL:string = ""
    description:string=""
    imgDark:boolean
    comparisonIMG:string

    commonName:string;

    bsStartups: any[]

    //TODO: should this go here???
    selected: boolean = false;
    modified: boolean = false;

    constructor(_id: string, name: string, cards: Card[]){
        this._id = _id;
        this.name = name;
        this.cards = cards;
    }

}