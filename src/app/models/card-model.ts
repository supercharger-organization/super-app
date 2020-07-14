export class Card {
    position: number;
    boardId: number;
    columnId: number;
    startupId: number;
    note_id: number;

    // Phase this shit out it came with the original UI
    name: String; //_deprecated
    tags: String[]; //_deprecated
    description:String;
    industryTags:String[];

    isVisible: Boolean;

    //tbd
    imgURL: String = null;
    industryScore:number

    constructor(name:String, description:String, industryTags: String[], startupId: number){
        this.name = name;
        this.startupId = startupId;

        /** random **/
        this.industryScore = Math.floor(Math.random() * 25) + 70  

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
    GenerateCard(position: number, boardId: number, columnId: number, startupId: number, note_id: number)
    {
        this.position = position;
        this.boardId = boardId;
        this.columnId = columnId;
        this.startupId = startupId;
        this.note_id = note_id;
    };
}