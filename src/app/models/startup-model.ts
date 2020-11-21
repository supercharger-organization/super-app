import { Note } from './note-model';

export class Startup {
    _id: number;
    name: string;
    description: string;
    location: string;
    websiteURL: string;
    employeeCount: string;
    funding: string;
    founder: string;
    founders: string[];
    initialDiligence:string;
    founderBackground: string;
    notableInvestors: string;
    notablCustomers:string;
    notableCustomers: string[];
    industryTags: string[];
    customNoteIds: Number[];
    customNotes:Note[];
    sapAppIntegration: Boolean;
    oracleIntegration: Boolean;
    monthlyRevenue:string;
    monthlyBurnRate:number;
    techStackTags:string[];
    isFavorite: Boolean;

    isVisibleInFilter: Boolean = true;

    /** tbd */
    imgURL: string = null
    selected: boolean = false
    industryScore:string;

    constructor(_id: number,name: string,description: string,location: string,websiteURL: string,employeeCount: string,funding: string,founder: string,founderBackground: string,notableInvestors: string,industryTags: string[],customNoteIds: Number[])
        {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.websiteURL = websiteURL;
        this.location = location;
        this.employeeCount = employeeCount;
        this.funding = funding;
        this.founder = founder;
        this.founderBackground = founderBackground;
        this.notableInvestors = notableInvestors;
        this.industryTags = industryTags;
        this.customNoteIds = customNoteIds;
    }

    static getFundAsNum(x: Startup): any {
        return Number(x.funding.replace(/[^0-9.-]+/g,""));
    }

    static getEmployeeCountAsNum(x: Startup): any {
        var numbers = x.employeeCount.match(/\d+/g).map(Number);
        return numbers[0]
        //return x.employeeCount.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2');
    }
    

    static isInFundingRange( rangeStart:Number, rangeEnd:Number, x: Startup)
    {
        return (rangeStart <= Startup.getFundAsNum(x) && Startup.getFundAsNum(x) <= rangeEnd);
    }

    static isInEmployeeRange( rangeStart:Number, rangeEnd:Number, x: Startup)
    {
        console.log(Startup.getEmployeeCountAsNum(x));
        return (rangeStart <= Startup.getEmployeeCountAsNum(x) && Startup.getEmployeeCountAsNum(x) <= rangeEnd);
    }

    static isAtLocation( x: Startup, locationString: string)
    {
        var formattedLocationName = x.location.toLowerCase();
        var formattedSearchLocationString = locationString.toLowerCase();
        return (formattedLocationName.includes(formattedSearchLocationString));
    }

    static nameContainsSearchVal(x: Startup, searchString: string){
        var formattedName = x.name.toLowerCase();
        var formattedSearchString = searchString.toLowerCase();
        return (formattedName.includes(formattedSearchString));
    }

    static tagIsPresent(x: Startup, searchTag: string){
        var formattedSearchTag = searchTag.toLowerCase();
        x.industryTags.forEach(tag => {
            var formattedTag = tag.toLowerCase();
            console.log(formattedTag);
            console.log(formattedSearchTag);
            if (formattedTag.toLowerCase().includes(formattedSearchTag.toLowerCase()))
            {
                return true;
            }
        });
        return false;
    }


    // Ordering of startups.  
    static OrderByFunding(StartupArray: Startup[])
    {
        return StartupArray.sort((a, b) => (Startup.getFundAsNum(a)) > (Startup.getFundAsNum(b)) ? 1 : (Startup.getFundAsNum(a) === Startup.getFundAsNum(b)) ? ((a.name > b.name) ? 1 : -1) : -1 );;
    }

    static OrderByName(StartupArray: Startup[])
    {
        return StartupArray.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    }

}