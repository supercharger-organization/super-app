import { Card } from './card-model';

export class Column {
    id: number;
    title: string;
    position: number;
    boardId: number;
    cardIds: [number];

    name: string; //_deprecated
    cards : Card[]; //_deprecated

    constructor(id: number, name: string, cards: Card[]){
        this.id = id;
        this.name = name;
        this.cards = cards;
    }

    // Temp Solution until ui is resolved
    // This is soon to be the constructor
    GenerateCard(id:number, title: string, position: number, boardId: number, cardIds:[number]){
        this.id = id;
        this.title = title;
        this.position = position;
        this.boardId = boardId;
        this.cardIds = cardIds;
    }
}