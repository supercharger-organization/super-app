import { Feature } from './feature-model';
import { Patent } from './patent-model';

export class Startup {
    _id:string = ""; //
    name:string = ""; //
    yearFounded:string = ""; //
    oracleIntegration:string = "";
    sapAppIntegration:string = "";
    description:string = ""; //
    initialDiligence:string = ""; //
    location:string = ""; //
    websiteURL:string = ""; //
    employeeCount:string = ""; //
    industryScore:string = ""; //
    funding:string = ""; //
    lastFunding:string = ""; //
    pricing:string = ""; //
    founder:string = "" // 
    founders:string[] = [] // 
    employeeNames:string[] =[] // 
    founderBackground:string = ""; // 
    notableInvestors:string[] = []; // 
    notableCustomers:string[] = []; // 
    industryTags:string[] = [];//

    pagerImgUrl:string = ""; //
    startupImgUrl:string = ""; //
    historyImgUrl:string = ""; //
    patents: Patent[] = [] //
    features: Feature[] =[] //


    pitchDeckImgUrls: string[] = [] //
    customerImgUrls: string[] = [] //
    customNotes: string[] = [] //

    tags:string = ""
    videoUrl:string = "";
    techStackTags:string[] = [];
    founderEmail:string = ""; 
    founderName:string = "";
    monthlyRevenue:string = "";
    monthlyBurnRate:string = "";
    cac:string = "";

    isVisibleInFilter: boolean = true;
    isFavorite: boolean = false;
    selected: boolean = false;

    // Temp to fix bugs !!!!!!!!!
    imgURL: string;


    constructor(_id:string,name:string,description:string,location:string,websiteURL:string,employeeCount:string,funding:string,founder:string,founderBackground:string,notableInvestors:string,industryTags:string[],customNoteIds:string[])
    {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.websiteURL = websiteURL;
        this.location = location;
        this.employeeCount = employeeCount;
        this.funding = funding;
        this.founderBackground = founderBackground;
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

    static isAtLocation( x: Startup, locationString:string)
    {
        var formattedLocationName = x.location.toLowerCase();
        var formattedSearchLocationString = locationString.toLowerCase();
        return (formattedLocationName.includes(formattedSearchLocationString));
    }

    static nameContainsSearchVal(x: Startup, searchString:string){
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