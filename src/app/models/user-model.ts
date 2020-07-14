export class User {
    id: number;
    userName: string;
    password: string;
    subscribedTeams: [number];

    constructor(id: number, userName: string, password: string, subscribedTeams: [number])
    {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.subscribedTeams = subscribedTeams;
    }
}