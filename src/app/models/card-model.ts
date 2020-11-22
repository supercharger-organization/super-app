export class Card {
    position: number;
    boardId:string;
    columnId:string;
    startupId:string;
    note_id:string;

    // Phase this shit out it came with the original UI
    name:string; //_deprecated
    tags:string[]; //_deprecated
    description:string;
    industryTags:string[];

    isVisible: Boolean;
    // Temp to fix bugs !!!!!!!!!
    startupImgUrl: string = null;

    //tbd
    industryScore:string

    constructor(name:string, description:string, industryTags:string[], industryScore:string, startupId:string, startupImgUrl:string){
        this.name = name;
        this.startupId = startupId;
        this.startupImgUrl = startupImgUrl;
        this.industryScore = industryScore;

        /** random **/
        //this.industryScore = Math.floor(Math.random() * 25) + 70  

        /** to be deleted... **/
        var newTags = []
        industryTags.forEach(tag => {
            var tags = tag.split(",");
            tags.forEach(t => {
                if (tags.indexOf(t) < 2){
                    if (t != "" && t != " "){
                        newTags.push(t)
                    }
                }

            });
        });
        this.industryTags = newTags;

        var maxCharacterCount = 150;
        if (description.length > maxCharacterCount){
            var shortenedDescription = description.slice(0, maxCharacterCount) + "...";
            this.description = shortenedDescription;
        }
        else {
            this.description = description;
        }
    };

    // Temp Solution until ui is resolved
    // This is soon to be the constructor
    GenerateCard(position: number, boardId:string, columnId:string, startupId:string, note_id:string)
    {
        this.position = position;
        this.boardId = boardId;
        this.columnId = columnId;
        this.startupId = startupId;
        this.note_id = note_id;
    };
}