import { Card } from './card-model';
import { Startup } from './startup-model';

export class List {
    id: number;
    title: String;
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

    commonName: String;

    bsStartups: any[]

    constructor(id: number, name: string, cards: Card[]){
        this.id = id;
        this.name = name;
        this.cards = cards;
    }

    // Temp Solution until ui is resolved
    // This is soon to be the constructor
    GenerateCard(id:number, title: String, position: number, boardId: number, startupIds:[number]){
        this.id = id;
        this.title = title;
        this.position = position;
        this.boardId = boardId;
        this.startupIds = startupIds;
    }
}