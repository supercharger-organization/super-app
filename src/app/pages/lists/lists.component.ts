import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card-model';
import { DebugApiService } from 'src/app/services/debug-api-service/debug-api.service';
import { CardFilter } from 'src/app/models/cardfilter-model';
import { ProdApiService } from 'src/app/services/prod-api-service/prod-api.service';
import { Board } from 'src/app/models/board-model';
import { List } from 'src/app/models/list-model';
import { Startup } from 'src/app/models/startup-model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {


  toggleDetail:Boolean = false
  cards: Card[] = []
  filters: CardFilter[] = []
  board: Board = null

  constructor(private apiService: ProdApiService) {

    this.filters = [
      new CardFilter(1, "Funding"),
      new CardFilter(1, "Location"),
      new CardFilter(1, "Employees"),
      new CardFilter(1, "Interest Areas")
    ]
   }

  ngOnInit(): void {
    this.apiService.getBoardAndAllChildren("5eebf187aa75084db8bdaed8").subscribe(board=>{
      this.board = board[0]

      var mediaRoot = "./assets/imgs/lists"
      /** duct tape **/
      this.board.lists.forEach(list => {

        switch(list.title.trim()) { 
          case "Geolocation": { 
            list.commonName = "Geolocation"
            list.imgURL = "Geolocation"
            list.description = "POC Targets and Funding Requests"
            list.chatHeads = [
              {url:"assets/imgs/chatheads/angela_chathead.png"},
              {url:"assets/imgs/chatheads/creed_chathead.png"},
              {url:"assets/imgs/chatheads/dwight_chathead.png"},
              {url:"assets/imgs/chatheads/erin_chathead.png"},
            ]
            list.bsStartups = [
              new Startup(null, "Bluefox", "BlueFox technology senses mobile phones in real-time. Without having to download an app, opt-in or login, BlueFox helps businesses and brands sell more and engage with customers in any location, and in a privacy-friendly way.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Indoo.rs", "indoo.rs is a mobile SDK that enables you to get real-time position and navigation updates indoors. Your mobile app can now locate and navigate inside buildings! The indoo.rs solution uses a combination of Wi-Fi , sensor fusion and iBeacon technology in addition to dead-reckoning navigation algorithms to provide the most accurate, real-time positioning information to any application. The indoo.rs solution provides an accuracy of down to 2 meters.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Lifesight", "Lifesight is an enterprise level location intelligence based SaaS platform that empowers Marketeers to measure omni-channel campaign effectiveness vis-a-vis offline business while ensuring critical attributes such as Brand Safety , Viewability and Targeting.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "MotionLoft ", "Our cloud-based dashboard allows you to see your data when and where you need for greater insight from both indoor and outdoor locations. Additionally, access to the API provides the ability to integrate the data with your current systems and tools.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Senion", "SenionLab introduces an indoor navigation technology which radically improves navigation capabilities in environments where GPS systems are unavailable. SenionLab provides a pedestrian indoor navigation system intend to work in indoor environment such as shopping malls, government institutions, universities, hospitals, museums and airports.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Sentiance", "Sentiance is a data science company turning IoT sensor data into rich insights about people’s behavior and real-time context. These insights enable companies to understand how customers go through their everyday lives, discover and anticipate the moments that matter most, and adapt their engagement to real-world behavior and real-time context.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "XYO", "XYO is an effort to create a vast, geospatial, blockchain-powered location network currently under development with the goal to provide accurate, certainty-driven location data on everything from cars to smartphones. By combining location beacons with IoT and mobile devices, the XYO ecosystem plans to deliver the verified coordinates and data needed to execute smart contracts, run smart cities, foster financial transactions, and power a legion of location-centric applications.", null, null, null, null, null, null, null, null, null),
            ]
            list.bsStartups[0].imgURL = `${mediaRoot}/Geolocation/startups/1.png`
            list.bsStartups[1].imgURL = `${mediaRoot}/Geolocation/startups/2.png`
            list.bsStartups[2].imgURL = `${mediaRoot}/Geolocation/startups/3.png`
            list.bsStartups[3].imgURL = `${mediaRoot}/Geolocation/startups/4.jpg`
            list.bsStartups[4].imgURL = `${mediaRoot}/Geolocation/startups/5.png`
            list.bsStartups[5].imgURL = `${mediaRoot}/Geolocation/startups/6.png`
            list.bsStartups[6].imgURL = `${mediaRoot}/Geolocation/startups/7.png`

            break; 
          }
          case "Connected Car": { 
            list.commonName = "ConnectedCar"
            list.imgURL = "ConnectedCar"
            list.description = "Sensors (waiting approval)"
            list.imgDark = true
            list.chatHeads = [
              {url:"assets/imgs/chatheads/Jim_chathead.png"},
              {url:"assets/imgs/chatheads/michael_chathead.png"},
              {url:"assets/imgs/chatheads/pam_chathead.png"},
              {url:"assets/imgs/chatheads/angela_chathead.png"}
            ]
            list.bsStartups = [
              new Startup(null, "Algolux", "Algolux is an AI software company empowering vision systems with the most robust perception technology, on any sensor, in all conditions. Developed by an industry-recognized team of researchers led by Dr. Felix Heide, our award-winning machine learning technologies address the complex task of developing robust and scalable vision systems. This approach significantly improves safety and system performance while reducing cost, time-to-market, and scalability risks.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Cloud Car ", "CloudCar provides the most powerful platform for building next generation connected vehicle experiences. Our cloud based services and content is constantly evolving, ensuring an ever-green experience to your customers. The CloudCar platform is distinct in that it offers the OEM: a driver-centric intuitive experience, control of data, rapid deployment of services, and expansion to new geographic regions without requiring firmware updates.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "ContinUse Biometrics", "ContinUse Biometrics is bringing to the market the only remote, effortless and non-touch sensing technology that both authenticates users and monitors their physiological state. The sensor, which can communicate with common consumer electronic devices (e.g. mobile phones, home assistants and more), enables people to get access to continuous medical monitoring – wherever they are: in the clinic, at home, at work or while driving. The sensor enables remote detection of heart and respiration rates, including auscultation of both heart and lung sounds, blood pressure, myography, peripheral hemodynamics and even biochemical screens – all from a distance, without any physical contact.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Innovusion", "Innovusion is a leading developer of image grade LiDAR sensor systems for the level 4 and 5 of the autonomous vehicle and ADAS markets. Their unique combination of range, resolution, hardware accelerated sensor fusion, compact size, ease of integration and cost effectiveness makes our products the ideal choice for the most demanding applications.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Lisnr", "LISNR powers transactions across the customer journey globally with the most advanced Ultrasonic Data Platform developed yet. Today, companies like Jaguar Land Rover, Ticketmaster, and Visa use this solution to create secure & frictionless moments for consumers around the world.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Reviver Auto", "The world’s first connected license plate has arrived. For the first time ever, you can digitally connect to your car anywhere, anytime through the Rplate app. With features that include vanity customization, accurate tracking and smart registration renewal – we guarantee that Rplate will revive the way you drive.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Savari", "Savari seeks to make the world’s roadways and vehicles automated and safer by deploying advanced wireless sensor technologies and software. Savari builds software and hardware sensor solutions for automotive car manufacturers, the automotive aftermarket and smart cities. The company pioneered V2X radio technology, which is crucial for vehicles to achieve Level 4 and Level 5 of automation. The technology allows vehicles to share data with other vehicles, traffic lights and smartphones. With more than 150 man-years of V2X learning and development and 15 million-plus miles per year of public testing, Savari is a leader in V2X technology.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Sibros", "Sibros connects and manages the end-to-end vehicle software and data lifecycle, from R&D to end-of-life, helping OEMs deliver never-before-available Connected Vehicle services at scale.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Floow", "The Floow is a leading telematics provider delivering innovative solutions to insurers, automotive manufacturers and fleet operators worldwide. Our intelligent telematics solutions allow insurers to price policies fairly and accurately, help drivers improve their performance and enable auto manufacturers to design vehicles that respond to evolving needs. We do this by combining amazing technology, excellence in data science and unique behavioural insights from social science to create rich mobility solutions from the starting point of superior driving data accumulated from billions of journey miles.", null, null, null, null, null, null, null, null, null),

            ]
            list.bsStartups[0].imgURL = `${mediaRoot}/ConnectedCar/startups/1.png`
            list.bsStartups[1].imgURL = `${mediaRoot}/ConnectedCar/startups/2.png`
            list.bsStartups[2].imgURL = `${mediaRoot}/ConnectedCar/startups/3.jpg`
            list.bsStartups[3].imgURL = `${mediaRoot}/ConnectedCar/startups/4.jpg`
            list.bsStartups[4].imgURL = `${mediaRoot}/ConnectedCar/startups/5.png`
            list.bsStartups[5].imgURL = `${mediaRoot}/ConnectedCar/startups/6.jpg`
            list.bsStartups[6].imgURL = `${mediaRoot}/ConnectedCar/startups/7.png`
            list.bsStartups[7].imgURL = `${mediaRoot}/ConnectedCar/startups/8.png`
            list.bsStartups[8].imgURL = `${mediaRoot}/ConnectedCar/startups/9.png`
            
            break; 
          }
          case "Usage Based Insurance": { 
            list.commonName = "UsageBasedInsurance"
            list.imgURL = "UsageBasedInsurance"
            list.description = "Connected Car and Telematics"
            list.chatHeads = [
              {url:"assets/imgs/chatheads/dwight_chathead.png"},
              {url:"assets/imgs/chatheads/Jim_chathead.png"},
              {url:"assets/imgs/chatheads/creed_chathead.png"},
              {url:"assets/imgs/chatheads/pam_chathead.png"}
            ]
            list.bsStartups = [
              new Startup(null, "Avinew", "Avinew is helping to insure a safer road with insurance technologies that enable the safety, value and freedom that comes with automated driving systems and autonomous vehicles.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "By Miles", "By Miles offers fairer, more flexible car insurance for low mileage drivers. Aside from a fixed annual cost, each policy is paid by the mile so it's totally tailored to you. See every journey and use handy tools in their mobile app to make your driving life easier.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Floow", "The Floow is a leading telematics provider delivering innovative solutions to insurers, automotive manufacturers and fleet operators worldwide. Our intelligent telematics solutions allow insurers to price policies fairly and accurately, help drivers improve their performance and enable auto manufacturers to design vehicles that respond to evolving needs.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "HAAS Alert", "HAAS Alert is the leading mobility and smart city data service provider keeping emergency crews, drivers and the public safe through Cellular V2V (Vehicle-to-Vehicle) communication. Drivers and emergency crews use the information to avoid collisions and reduce traffic delays. The HAAS Alert Safety Cloud is a real-time data stream connecting first responders, commercial, municipal, and slow moving fleets with motorists, connected and autonomous vehicles. Connected \"smart\"​ communities use the service to inform infrastructure, planning and real-time traffic management. The company is currently working with the U.S. Department of Homeland Security on advanced solutions and has support from leading safety organizations including NSC (National Safety Council), TSR (Together for Safer Roads), FAMA (Fire Apparatus Manufacturers' Association) and NFPA (National Fire Protection Association).", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Mojio", "Mojio is an open platform that offers a solution for the rapid deployment of secure and scalable aftermarket connected car services to enterprise customers, including mobile operators, automotive OEMs, car dealers, service centers, auto insurers, and fleets. The platform enables intelligent data analysis that unlocks previously unavailable revenue streams and cost-saving opportunities. It facilitates the efficient integration of vehicle data into new and existing applications for developers. Mojio, which was launched in 2011, enables developers to access advanced tools and resources, including interactive documentation and tutorials, mobile SDKs, and a vehicle simulator.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Nauto", "Nauto is an AI-technology company that’s improving the safety of commercial fleets today and the autonomous fleets of tomorrow. Nauto’s intelligent driver safety system assesses how drivers interact with the vehicle and the road ahead to reduce distracted driving and prevent collisions. Nauto’s intelligent driver safety system assesses how drivers interact with the vehicle and the road ahead to reduce distracted driving and prevent collisions. With this knowledge, Nauto is powering the development of self-driving technology that brings the best of human driving to autonomy.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Smart Car", "Smartcar developed a car API for mobility applications. The company is ingesting data from connected cars and making that data available to developers who want to enable their apps to locate, unlock, and read the odometers from cars across more than a dozen car brands. Drivers need to link their cars to the developer’s app before the developer can start making API requests. In addition to viewing their odometers, developers can also see the fuel tank level, location, VIN number, and other vehicle attributes for drivers who have opted-in. Among Smartcar’s many potential use cases could be peer-to-peer car sharing and mobile car washing apps.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "True Motion", "TrueMotion (formerly Censio) is shaping the future of driving safety - through data and technology - while redefining how insurance is priced and delivered. TrueMotion’s technology platform enables insurance companies to distinguish between safe and risky drivers, reward safe drivers with discounts on their insurance and help reduce the number of driving accidents, leading to safer roads for all.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Veniam", "Veniam is building the Internet of Moving Things. We turn vehicles into Wi-Fi hotspots and build city-scale vehicular networks that expand wireless coverage and collect terabytes of urban data. Veniam’s game-changing solutions are composed by hardware, software and cloud components that deliver managed services to intelligent transportation systems in New York and Singapore, as well as in the world's largest network of connected vehicles, which includes taxis, waste collection trucks and the entire public bus fleet in Porto, Portugal, offering free Wi-Fi to more than 500,000 active customers.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Zubie", "Zubie is a connected vehicle services company focused on providing consumers and businesses relevant vehicle health, location, and safety information. With a simple plug-in of the Zubie key, users can easily monitor their vehicle data through our Zubie mobile apps for both iOS and Android.", null, null, null, null, null, null, null, null, null),
            ]
            list.bsStartups[0].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/1.jpg`
            list.bsStartups[1].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/2.png`
            list.bsStartups[2].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/3.jpg`
            list.bsStartups[3].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/4.png`
            list.bsStartups[4].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/5.png`
            list.bsStartups[5].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/6.png`
            list.bsStartups[6].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/7.png`
            list.bsStartups[7].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/8.png`
            list.bsStartups[8].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/9.png`
            list.bsStartups[9].imgURL = `${mediaRoot}/UsageBasedInsurance/startups/10.jpg`
            break; 
          }
          case "Hygiene": { 
            list.commonName = "Hygiene"
            list.imgURL = "Hygiene"
            list.description = "Potential Integration Tech"
            list.chatHeads = [
              {url:"assets/imgs/chatheads/pam_chathead.png"},
              {url:"assets/imgs/chatheads/erin_chathead.png"},
              {url:"assets/imgs/chatheads/dwight_chathead.png"},
              {url:"assets/imgs/chatheads/michael_chathead.png"},
            ]
            list.bsStartups = [
              new Startup(null, "EMist", "E-Mist Innovations isn’t about teaching old dogs new tricks. They don’t just apply the best EPA registered and labeled disinfectants. They do it using our proven electrostatic mister, which is technology we invented and have perfected using. Schools, health care facilities, public transportation and real estate properties are in constant need of disinfecting and sanitizing. Their techniques provide excellent three-dimensional coverage over both smooth and porous surfaces. The wrapping effect of the electrostatically charged mist applies the disinfectant into every nook and cranny, ensuring a thorough job.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Kinnos", "Kinnos is raising the standard of health by protecting patients, health workers, and the general public from preventable infections. The company's flagship product, Highlight, is a patented and award-winning color additive platform that greatly improves disinfection technique and compliance in real-time. Highlight is used internationally by hospitals, first responders, and humanitarian agencies.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Nimble", "Nimble is a child-friendly household cleaning products are made with plant-based ingredients to fight the mess your little ones make. At Nimble Babies, they understand that looking after your babies is fun but can be quite tiring. But cleaning up after them is not fun at all and can be quite frustrating, that's why they are here! They are the UK's first baby brand to clean up after babies a little easier and a little more fun.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Novaerus", "Novaerus's mission is to improve the business and quality of care through the application of airborne pathogen control technology. Novaerus believes that the preventative approach is the proper path to improved business and quality results in skilled nursing and assisted living facilities. Traditionally, important steps have been taken to clean hands and surfaces. Protocols exist on hand washing, surface cleaning and disinfectant and even isolation used as a tactic to prevent pathogens. When used in conjunction with these traditional methods, the Novaerus technology can go beyond just scrubbing hands and surfaces.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "RayVio", "RayVio Corp. is an advanced health and hygiene company that delivers clean water and environments. RayVio helps protect billions from germs and creates new markets and revenue streams by enabling a new class of products. Its powerful and efficient UV LED technology can be integrated into a variety of applications, powering versatile on-demand solutions that give consumers control over health without chemicals or costly consumables.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Ready Dock", "ReadyDock is a privately held company whose products are used around the globe to support workflow and the overall management of tablet computers in hospitals, retail, food service, and other applications that require secure storage, charging, and disinfection. It is a docking station that provides secure storage, charging, and chemical-free disinfection of tablets, smartphones, and other mobile devices.", null, null, null, null, null, null, null, null, null),
              new Startup(null, "Thymox", "Laboratoire M2 manufactures innovative disinfection products from its proprietary platform named THYMOX TECHNOLOGY. Laboratoire M2 is also working on expanding its line of THYMOX TECHNOLOGY products and applications.the lab which has developed this technology branded as THYMOX.In order to ensure its exclusive ownership of the technology, Laboratoire M2 acquired the intellectual property rights to Thymox. The company holds Canadian and US and South-American patents on the product’s formulation and application, and has applied for patents in 40 other countries.", null, null, null, null, null, null, null, null, null),

            ]
            list.bsStartups[0].imgURL = `${mediaRoot}/Hygiene/startups/1.jpg`
            list.bsStartups[1].imgURL = `${mediaRoot}/Hygiene/startups/2.png`
            list.bsStartups[2].imgURL = `${mediaRoot}/Hygiene/startups/3.png`
            list.bsStartups[3].imgURL = `${mediaRoot}/Hygiene/startups/4.jpg`
            list.bsStartups[4].imgURL = `${mediaRoot}/Hygiene/startups/5.jpeg`
            list.bsStartups[5].imgURL = `${mediaRoot}/Hygiene/startups/6.jpg`
            list.bsStartups[6].imgURL = `${mediaRoot}/Hygiene/startups/7.png`
            break; 
          }
        } 
        list.imgURL = `assets/imgs/lists/${list.imgURL}/head.jpg`;
        list.comparisonIMG = `assets/imgs/lists/${list.imgURL}/list.jpg`;
        
      });

    })

  }

  activateFilter(filter){
    if (filter.active){
      filter.active = false;
      //do something here
    }
    else {
      filter.active = true;
    }
  }

  toggleFavorite(startUp: Startup){
    if (startUp.isFavorite){
      startUp.isFavorite = false;
    }
    else {
      startUp.isFavorite = true;
    }
  }

  addUserToList(list: List){
    alert("coming soon")
  }

  getRandomChatHeads(){
    var chatHeads = [
      {url:"assets/imgs/chatheads/angela_chathead.png"},
      {url:"assets/imgs/chatheads/creed_chathead.png"},
      {url:"assets/imgs/chatheads/dwight_chathead.png"},
      {url:"assets/imgs/chatheads/erin_chathead.png"},
      {url:"assets/imgs/chatheads/Jim_chathead.png"},
      {url:"assets/imgs/chatheads/michael_chathead.png"},
      {url:"assets/imgs/chatheads/pam_chathead.png"}
    ]
    var randomChatHeads = [
      chatHeads[Math.floor(Math.random() * chatHeads.length)],
      chatHeads[Math.floor(Math.random() * chatHeads.length)], 
      chatHeads[Math.floor(Math.random() * chatHeads.length)], 
      chatHeads[Math.floor(Math.random() * chatHeads.length)],  
  ];

    return randomChatHeads;
  }
  
}
