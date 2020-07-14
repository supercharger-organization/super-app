export class Team {
    id: number;
    teamName: string;
    ownerId: number;
    boardIds: [number];
    memberIDs: [number];

    constructor(id: number, teamName: string, ownerId: number, boardIds: [number], memberIDs: [number]){
        this.id = id;
        this.teamName = teamName;
        this.ownerId = ownerId;
        this.boardIds = boardIds;
        this.memberIDs = memberIDs;
    }
}