import { List } from './list-model';
import { Startup } from './startup-model';

export class Board {
    id: number;
    title:string;
    teamId: number;
    authorId: number;
    startupIds: [number];
    listIds: [number];
    userIDs: [number];
    lists: [List];
    startups: [Startup];

    constructor(id:number, title:string, teamId: number, authorId: number, startupIds:[number], listIds: [number], userIDs: [number]){
        this.id = id;
        this.title = title;
        this.teamId = teamId;
        this.authorId = authorId;
        this.startupIds = startupIds;
        this.listIds = listIds;
        this.userIDs = userIDs;
    }
}