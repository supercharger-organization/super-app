export class Note {
    id: number;
    note: string;
    title: string;
    cardId: number;
    startupId: number;
    teamId: number;
    authorAccountId: number;

    constructor(id: number, note: string, title: string, cardId: number, startupId: number,  teamId: number, authorAccountId: number)
    {
        this.id = id;

        this.note = note;
        this.title = title;
        this.cardId = cardId;
        this.startupId = startupId;
        this.teamId = teamId;
        this.authorAccountId = authorAccountId;
    }
}