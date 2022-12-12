
let localStocksList = ['Base List Not Included'];
let localStocksListFetch;
let localExclusion;
let rando = () => Math.random()
let rerunTimer0 = () => Math.round((rando() * 500) + 1000)
let rerunTimer1 = () => Math.round((rando() * 3000) + 7000)
let rerunTimer2 = () => Math.round((rando() * 10000) + 600000)
let rerunTimer3 = () => Math.round((rando() * 1000) + 3000)

//////////Initialization//////////

addEventListener('load', funcStartOnLoad)
function funcStartOnLoad() {
  afuncLocalStocksImport()
  ////// single run scrapes
  afuncNonFarmPayrollLoop()
  afuncJoltsLoop()
  afuncWeeklyJoblessLoop()
  afuncMichConsumerLoop()
  afuncFedRatesPuppeteer()
  afuncMortgageRatesLoop()
  afuncReleasePPILoop()
  afuncReleaseCPILoop()
  afuncFedScheduleLoop()
  afuncCpiScheduleLoop()
  afuncUnemploymentLoop()
  afuncIndexPCELoop()
  afuncFomcMinutesPuppeteer()
  afuncRatioPEPuppeteer()
  afuncReverseRepoPuppeteer()

  ////////////////////////////////////////////
  afuncGoogleNews2()
  afuncAccessNewswirePuppeteer()
  afuncFinancialTimesLoop()
  afuncGlobalNewswireLoop()
  afuncprNewswireLoop()
  afuncReutersBusinessLoop()
  afuncWsjFinanceLoop()
  afuncWsjNewsLoop()
  afuncCNBCLoop()
  afuncBarronsLoop()
  afuncBusinessNewswireLoop()
  afuncSEC13dFilingsLoop()
  afuncSEC13gLoop()

  // the below websites dont work well 
  // Yahoo will have timeout errors, but has been fixed using abortcontroller with try/catch blocks
  // seeking alpha will change their class names every 8 hours or so
  afuncYahooLoop()
  // afuncSeekingAlphaPuppeteer()
  // afuncCalendarIPOPuppeteer()
}
//////////Initialization//////////

//////////Import Local Filtering Files//////////
async function afuncLocalStocksImport() {
  let response = await fetch("/localstocklist");
  let fetchResLocalStocks = await response.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  localStocksListFetch = fetchResLocalStocks.product1
  localExclusion = fetchResLocalStocks.product2
}
//////////Import Local Filtering Files//////////
////////////Shared Code Set////////////
function funcCheckBoxToggle() {
  let getIDCheckBox = document.getElementById('checkBox1');
  if (getIDCheckBox.checked) {
    localStocksList.splice(unshiftCount, 1)
    localStocksList = localStocksList.concat(localStocksListFetch)
    document.querySelector("#localStocksSendtoHTML").innerHTML = localStocksList;
  } else {
    localStocksList.splice(unshiftCount)
    localStocksList.push('Base List Not Included')
    document.querySelector("#localStocksSendtoHTML").innerHTML = localStocksList;
  }
}

let [sharedFinalStocksArray, sharedFinalArticlesArray, sharedFinalIndexArray] = [[], [], []];

async function afuncMatchFilter(data) {
  [sharedFinalStocksArray, sharedFinalArticlesArray, sharedFinalIndexArray] = [[], [], []];
  sharedFinalArticlesArray = [];
  let inputDataArray = data.product1;
  let localStockListRegex = new RegExp(localStocksList.join('|'), "gi");
  if (inputDataArray[0] === undefined) {
    document.querySelector("#error-header").innerHTML = "ERROR: SCRAPE FAILED"
  }
  for (let i = 0; i < inputDataArray.length; i++) {
    let tempSingleTitle = inputDataArray[i].toLowerCase();
    for (let k = 0; k < localExclusion.length; k++) {
      if (tempSingleTitle.includes(localExclusion[k].toLowerCase())) {
        tempSingleTitle = '';
      }
    }
    let tempMatchedStock = tempSingleTitle.match(localStockListRegex);
    if (tempMatchedStock) {
      sharedFinalArticlesArray.push('<br/>' + '* ' + tempSingleTitle)
      if (!sharedFinalStocksArray.includes('<br/>' + '* ' + tempMatchedStock[0])) {
        sharedFinalStocksArray.push('<br/>' + '* ' + tempMatchedStock[0])
      }
      let tempMatchedIndex = localStocksList.indexOf(tempMatchedStock[0])
      if (!sharedFinalIndexArray.includes(tempMatchedIndex)) {
        sharedFinalIndexArray.push(tempMatchedIndex)
      }
    }
  }
}

function funcRemoveDuplicate(inputResponseJson) {
  afuncMatchFilter(inputResponseJson);
  if (sharedFinalIndexArray[0] !== undefined) {
    for (let b = 0; b < sharedFinalIndexArray.length; b++) {
      localExclusion.unshift(sharedFinalStocksArray[b].replace(/\*\s/, '').replace(/\<.*\>/, ''))
    }
  }
  afuncMatchFilter(inputResponseJson)
  // document.querySelector("#localStocksSendtoHTML").innerHTML = localStocksList;
  document.querySelector("#localExclusionSendtoHTML").innerHTML = localExclusion
}

function funcRemoveDuplicate2(inputResponseJson) {
  afuncMatchFilter(inputResponseJson);
  if (sharedFinalIndexArray[0] !== undefined) {
    for (let b = 0; b < sharedFinalIndexArray.length; b++) {
      localExclusion.push(sharedFinalArticlesArray[b].replace(/\*\s/, '').replace(/\<.*\>/, ''))
    }
  }
  afuncMatchFilter(inputResponseJson)
  // document.querySelector("#localStocksSendtoHTML").innerHTML = localStocksList;
  document.querySelector("#localExclusionSendtoHTML").innerHTML = localExclusion
}

document.querySelector('#custom-filter').addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.elements.newItem.value.length>2) {
    
      if (localExclusion.indexOf(e.target.elements.newItem.value) === -1) {
        localExclusion.unshift(e.target.elements.newItem.value)
        document.querySelector("#localExclusionSendtoHTML").innerHTML = localExclusion
      }
    
  }
  e.target.elements.newItem.value = ''
})




let unshiftCount = 0;
document.querySelector('#undelete-stock').addEventListener('submit', (e) => {
  e.preventDefault();
  let indexUndo = localExclusion.indexOf(e.target.elements.newItem.value)
  if (indexUndo > -1) {
    localExclusion.splice(indexUndo, 1);
    document.querySelector("#localExclusionSendtoHTML").innerHTML = localExclusion
  } else if (e.target.elements.newItem.value.length > 2) {
    if (localStocksList.indexOf(e.target.elements.newItem.value) === -1) {
      localStocksList.unshift(e.target.elements.newItem.value)
      // localStocksList.splice(1,0,e.target.elements.newItem.value)
      unshiftCount += 1;
      document.querySelector("#localStocksSendtoHTML").innerHTML = localStocksList;
    }
  }
  e.target.elements.newItem.value = '';
})
function funcShowHideExclusionList() {
  let tempx = document.getElementById("localExclusionSendtoHTML");
  if (tempx.innerHTML === "Exclusion List Hidden") {
    tempx.innerHTML = localExclusion;
  } else {
    tempx.innerHTML = "Exclusion List Hidden";
  }
}
function funcShowHideStockList() {
  let tempx = document.getElementById("localStocksSendtoHTML");
  if (tempx.innerHTML === "Stock List Hidden") {
    tempx.innerHTML = localStocksList;
  } else {
    tempx.innerHTML = "Stock List Hidden";
  }
}
async function sendAlert(htmlID) {
  if (document.querySelector(htmlID).innerHTML) {
    await playAlert();
    setTimeout(playAlert, 3000);
  }
}
async function sendAlert2(htmlID) {
  if (document.getElementById(htmlID).hasChildNodes()) {
    await playAlert();
    setTimeout(playAlert, 3000);
  }
}

async function sendAlert3(htmlID) {
  if (document.getElementById(htmlID).hasChildNodes().hasChildNodes()) {
    await playAlert();
    setTimeout(playAlert, 3000);
  }
}

////////////Shared Code Set////////////

//////////Puppeteer-ReverseRepo//////////
let runCountReverseRepo = 0;
let responseJsonReverseRepo;
async function afuncReverseRepoPuppeteer() {
  let responseReverseRepo = await fetch("/ReverseRepo");
  responseJsonReverseRepo = await responseReverseRepo.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonReverseRepo.product1[0] === undefined) {
    document.querySelector("#ReverseRepoSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#ReverseRepoSendtoHTML1").innerHTML = responseJsonReverseRepo.product1
  }
}

//////////NonFarmPayroll//////////
let runCountNonFarmPayroll = 0;
let responseJsonNonFarmPayroll;
async function afuncNonFarmPayrollLoop() {
  let responseNonFarmPayroll = await fetch("/NonFarmPayroll");
  responseJsonNonFarmPayroll = await responseNonFarmPayroll.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonNonFarmPayroll.product1[0] === undefined) {
    document.querySelector("#NonFarmPayrollSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#NonFarmPayrollSendtoHTML1").innerHTML = responseJsonNonFarmPayroll.product1
  }
}
//////////NonFarmPayroll//////////

//////////Jolts//////////
let runCountJolts = 0;
let responseJsonJolts;
async function afuncJoltsLoop() {
  let responseJolts = await fetch("/Jolts");
  responseJsonJolts = await responseJolts.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonJolts.product1[0] === undefined) {
    document.querySelector("#JoltsSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {

    document.querySelector("#JoltsSendtoHTML1").innerHTML = responseJsonJolts.product1
    document.querySelector("#JoltsSendtoHTML2").innerHTML = responseJsonJolts.product2
  }
}
//////////Jolts//////////
//////////WeeklyJobless//////////
let runCountWeeklyJobless = 0;
let responseJsonWeeklyJobless;
async function afuncWeeklyJoblessLoop() {
  let responseWeeklyJobless = await fetch("/WeeklyJobless");
  responseJsonWeeklyJobless = await responseWeeklyJobless.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonWeeklyJobless.product1[0] === undefined) {
    document.querySelector("#WeeklyJoblessSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#WeeklyJoblessSendtoHTML1").innerHTML = responseJsonWeeklyJobless.product1
  }
}
//////////WeeklyJobless//////////

//////////MichConsumer//////////
let runCountMichConsumer = 0;
let responseJsonMichConsumer;
async function afuncMichConsumerLoop() {
  let responseMichConsumer = await fetch("/MichConsumer");
  responseJsonMichConsumer = await responseMichConsumer.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonMichConsumer.product1[0] === undefined) {
    document.querySelector("#MichConsumerSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#MichConsumerSendtoHTML1").innerHTML = responseJsonMichConsumer.product1
  }
}
//////////MichConsumer//////////

//////////Puppeteer-FedRates//////////
let runCountFedRates = 0;
let responseJsonFedRates;
async function afuncFedRatesPuppeteer() {
  let responseFedRates = await fetch("/FedRates");
  responseJsonFedRates = await responseFedRates.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonFedRates.product1[0] === undefined) {
    document.querySelector("#FedRatesSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#FedRatesSendtoHTML1").innerHTML = responseJsonFedRates.product1
  }
}
//////////Puppeteer-FedRates//////////
//////////MortgageRates//////////
let runCountMortgageRates = 0;
let responseJsonMortgageRates;
async function afuncMortgageRatesLoop() {
  let responseMortgageRates = await fetch("/MortgageRates");
  responseJsonMortgageRates = await responseMortgageRates.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonMortgageRates.product1[0] === undefined) {
    document.querySelector("#MortgageRatesSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
    setTimeout(afuncMortgageRatesLoop, rerunTimer1())
  } else {
    document.querySelector("#MortgageRatesSendtoHTML1").innerHTML = responseJsonMortgageRates.product1
  }
}
//////////MortgageRates//////////
//////////ReleasePPI//////////
let runCountReleasePPI = 0;
let responseJsonReleasePPI;
async function afuncReleasePPILoop() {
  let responseReleasePPI = await fetch("/ReleasePPI");
  responseJsonReleasePPI = await responseReleasePPI.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonReleasePPI.product1[0] === undefined) {
    document.querySelector("#ReleasePPISendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#ReleasePPISendtoHTML1").innerHTML = responseJsonReleasePPI.product1
  }
}
//////////ReleasePPI//////////

//////////ReleaseCPI//////////
let runCountReleaseCPI = 0;
let responseJsonReleaseCPI;
async function afuncReleaseCPILoop() {
  let responseReleaseCPI = await fetch("/ReleaseCPI");
  responseJsonReleaseCPI = await responseReleaseCPI.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonReleaseCPI.product1[0] === undefined) {
    document.querySelector("#ReleaseCPISendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#ReleaseCPISendtoHTML1").innerHTML = responseJsonReleaseCPI.product1
  }
}
//////////ReleaseCPI//////////

//////////FedSchedule//////////
let runCountFedSchedule = 0;
let responseJsonFedSchedule;
async function afuncFedScheduleLoop() {
  let responseFedSchedule = await fetch("/FedSchedule");
  responseJsonFedSchedule = await responseFedSchedule.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonFedSchedule.product1[0] === undefined) {
    document.querySelector("#FedScheduleSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#FedScheduleSendtoHTML1").innerHTML = responseJsonFedSchedule.product1
  }
}
//////////FedSchedule//////////

//////////CpiSchedule//////////
let runCountCpiSchedule = 0;
let responseJsonCpiSchedule;
async function afuncCpiScheduleLoop() {
  let responseCpiSchedule = await fetch("/CpiSchedule");
  responseJsonCpiSchedule = await responseCpiSchedule.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonCpiSchedule.product1[0] === undefined) {
    document.querySelector("#CpiScheduleSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#CpiScheduleSendtoHTML1").innerHTML = responseJsonCpiSchedule.product1
  }
}
//////////CpiSchedule//////////

//////////Unemployment//////////
let runCountUnemployment = 0;
let responseJsonUnemployment;
async function afuncUnemploymentLoop() {
  let responseUnemployment = await fetch("/Unemployment");
  responseJsonUnemployment = await responseUnemployment.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonUnemployment.product1[0] === undefined) {
    document.querySelector("#UnemploymentSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#UnemploymentSendtoHTML1").innerHTML = responseJsonUnemployment.product1
  }
}
//////////Unemployment//////////


//////////IndexPCE//////////
let runCountIndexPCE = 0;
let responseJsonIndexPCE;
async function afuncIndexPCELoop() {
  let responseIndexPCE = await fetch("/IndexPCE");
  responseJsonIndexPCE = await responseIndexPCE.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonIndexPCE.product1[0] === undefined) {
    document.querySelector("#IndexPCESendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#IndexPCESendtoHTML1").innerHTML = responseJsonIndexPCE.product1
  }
}
//////////IndexPCE//////////
//////////Puppeteer-FomcMinutes//////////
let runCountFomcMinutes = 0;
let responseJsonFomcMinutes;
async function afuncFomcMinutesPuppeteer() {
  let responseFomcMinutes = await fetch("/FomcMinutes");
  responseJsonFomcMinutes = await responseFomcMinutes.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonFomcMinutes.product1[0] === undefined) {
    document.querySelector("#FomcMinutesSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#FomcMinutesSendtoHTML1").innerHTML = responseJsonFomcMinutes.product1
  }
}
//////////Puppeteer-FomcMinutes//////////

//////////Puppeteer-RatioPE//////////
let runCountRatioPE = 0;
let responseJsonRatioPE;
let storePeRatio = '';
async function afuncRatioPEPuppeteer() {
  let responseRatioPE = await fetch("/RatioPE");
  responseJsonRatioPE = await responseRatioPE.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonRatioPE.product1[0] === undefined) {
    document.querySelector("#RatioPESendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
    setTimeout(afuncRatioPEPuppeteer, rerunTimer1())
  } else {
    document.querySelector("#RatioPESendtoHTML1").innerHTML = responseJsonRatioPE.product1
    storePeRatio = responseJsonRatioPE.product1
    // console.log(responseJsonRatioPE.product2)
  }

  const roundToHundredth = (value) => {
    return value.toFixed(2);
  }
  // console.log(responseJsonRatioPE.product2[2]-22.5555)
  let currentSP500PE = responseJsonRatioPE.product2[2];
  let PeRatioData0 = currentSP500PE / 22.5
  let PeRatioData1 = `Percent difference from average PE Ratio ${roundToHundredth(PeRatioData0)} <br>`
  let PeRatioData2 = `Actual difference from average PE Ratio ${roundToHundredth(currentSP500PE - 22.5)}<br>`
  let PeRatioData3
  if (PeRatioData0 < 1) {
    PeRatioData3 = "This market is UNDER-VALUED"
  } else if (PeRatioData0 < 1.3) {
    PeRatioData3 = "This market is FAIRLY-VALUED"
  } else {
    PeRatioData3 = "This market is OVER-VALUED"
  }
  document.querySelector("#HistoricalPESendtoHTML1").innerHTML = PeRatioData1
  document.querySelector("#HistoricalPESendtoHTML2").innerHTML = PeRatioData2
  document.querySelector("#HistoricalPESendtoHTML3").innerHTML = PeRatioData3

}
//////////Puppeteer-RatioPE//////////

//////////SEC13dFilings//////////
let runCountSEC13dFilings = 0;
let responseJsonSEC13dFilings;

async function afuncSEC13dFilingsLoop() {
  let responseSEC13dFilings = await fetch("/SEC13dFilings");
  responseJsonSEC13dFilings = await responseSEC13dFilings.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));

  if (responseJsonSEC13dFilings.product1[0] === undefined) {
    document.querySelector("#SEC13dFilingsSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonSEC13dFilings)
    runCountSEC13dFilings += 1;
    funcFindLinks13d()
    funcSendtoBrowserSEC13dFilings()
  }
  setTimeout(afuncSEC13dFilingsLoop, rerunTimer1())
}

let matchedObjects = [];
let arrFinalLinks = [];
function funcFindLinks13d() {
  matchedObjects = [];
  arrFinalLinks = [];
  for (let i = 0; i < sharedFinalArticlesArray.length; i++) {
    matchedObjects.push(responseJsonSEC13dFilings.product2.filter(
      x => x.title.toLowerCase() == sharedFinalArticlesArray[i].replace(/\<br\/\>\*\s/gi, '')
    ))
  }
  for (let i = 0; i < matchedObjects.length; i++) {
    arrFinalLinks.push(matchedObjects[i][0])
  }
}

function funcSendtoBrowserSEC13dFilings() {
  if (sharedFinalArticlesArray[0] === undefined) {
    arrFinalLinks = [];
  }
  document.querySelectorAll('.generatedID').forEach(e => e.remove());
  for (let i = 0; i < arrFinalLinks.length; i++) {
    let aDiv1 = document.createElement('a')
    let newLine = document.createElement("br");
    aDiv1.setAttribute('href', arrFinalLinks[i].url)
    aDiv1.setAttribute('class', "generatedID")
    aDiv1.setAttribute('target', '_blank')
    aDiv1.setAttribute('rel', 'noopener noreferrer')
    let bodyText = document.createTextNode(arrFinalLinks[i].title)
    aDiv1.appendChild(bodyText)
    aDiv1.appendChild(newLine)
    document.getElementById('SEC13dFilingsSendtoHTML2').appendChild(aDiv1)
    //alternative and easier way:
    // let aDiv1 = document.createElement('div')
    // aDiv1.innerHTML = `<a class="generatedID" href= ${arrFinalLinks[i].url}>${arrFinalLinks[i].title}</a>`
    // document.getElementById('SEC13dFilingsSendtoHTML2').appendChild(aDiv1)
  }
  document.querySelector("#SEC13dFilingsSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountSEC13dFilings}`;
  sendAlert2('SEC13dFilingsSendtoHTML2');
}
let filterButtonSEC13dFilings = document.getElementById("remove-button-SEC13dFilings");
filterButtonSEC13dFilings.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonSEC13dFilings);
  funcSendtoBrowserSEC13dFilings();
});

let filterButtonSEC13dFilings2 = document.getElementById("remove-button-SEC13dFilings-2");
filterButtonSEC13dFilings2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonSEC13dFilings);
  funcSendtoBrowserSEC13dFilings()
});
//////////SEC13dFilings//////////
//////////SEC13g//////////
let runCountSEC13g = 0;
let responseJsonSEC13g;
async function afuncSEC13gLoop() {
  let responseSEC13g = await fetch("/SEC13g");
  responseJsonSEC13g = await responseSEC13g.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonSEC13g.product1[0] === undefined) {
    document.querySelector("#SEC13gSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonSEC13g)
    runCountSEC13g += 1;
    funcFindLinks13g()
    funcSendtoBrowserSEC13g()
  }
  setTimeout(afuncSEC13gLoop, rerunTimer1())
}

let matchedObjects13g = [];
let arrFinalLinks13g = [];
function funcFindLinks13g() {
  matchedObjects13g = [];
  arrFinalLinks13g = [];
  for (let i = 0; i < sharedFinalArticlesArray.length; i++) {
    matchedObjects13g.push(responseJsonSEC13g.product2.filter(
      x => x.title.toLowerCase() == sharedFinalArticlesArray[i].replace(/\<br\/\>\*\s/gi, '')
    ))
  }
  for (let i = 0; i < matchedObjects13g.length; i++) {
    arrFinalLinks13g.push(matchedObjects13g[i][0])
  }
}

function funcSendtoBrowserSEC13g() {
  if (sharedFinalArticlesArray[0] === undefined) {
    arrFinalLinks13g = [];
  }
  document.querySelectorAll('.generatedID2').forEach(e => e.remove());
  for (let i = 0; i < arrFinalLinks13g.length; i++) {
    let aDiv1 = document.createElement('a')
    let newLine = document.createElement("br");
    aDiv1.setAttribute('href', arrFinalLinks13g[i].url)
    aDiv1.setAttribute('class', "generatedID2")
    aDiv1.setAttribute('target', '_blank')
    aDiv1.setAttribute('rel', 'noopener noreferrer')
    let bodyText = document.createTextNode(arrFinalLinks13g[i].title)
    aDiv1.appendChild(bodyText)
    aDiv1.appendChild(newLine)
    document.getElementById('SEC13gSendtoHTML2').appendChild(aDiv1)
    // let aDiv1 = document.createElement('div')
    // aDiv1.innerHTML = `<a class="generatedID2" target="_blank" rel="noopener noreferrer" href= ${arrFinalLinks13g[i].url}>${arrFinalLinks13g[i].title} </a>`
    // document.getElementById('SEC13gSendtoHTML2').appendChild(aDiv1);
  }
  document.querySelector("#SEC13gSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountSEC13g}`;
  sendAlert2('SEC13gSendtoHTML2')
  // sendAlert3('SEC13gSendtoHTML2')
}
let filterButtonSEC13g = document.getElementById("remove-button-SEC13g");
filterButtonSEC13g.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonSEC13g);
  funcSendtoBrowserSEC13g()
});
let filterButtonSEC13g2 = document.getElementById("remove-button-SEC13g-2");
filterButtonSEC13g2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonSEC13g);
  funcSendtoBrowserSEC13g()
});
//////////SEC13g//////////


//////////Puppeteer-CalendarIPO//////////
let runCountCalendarIPO = 0;
let responseJsonCalendarIPO;
async function afuncCalendarIPOPuppeteer() {
  let responseCalendarIPO = await fetch("/CalendarIPO");
  responseJsonCalendarIPO = await responseCalendarIPO.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonCalendarIPO.product1[0] === undefined) {
    document.querySelector("#CalendarIPOSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#CalendarIPOSendtoHTML1").innerHTML = responseJsonCalendarIPO.product1
  }
}
//////////Puppeteer-CalendarIPO//////////

//////////FinancialTimes//////////
let runCountFinancialTimes = 0;
let responseJsonFinancialTimes;

async function afuncFinancialTimesLoop() {
  let responseFinancialTimes = await fetch("/FinancialTimes");
  responseJsonFinancialTimes = await responseFinancialTimes.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonFinancialTimes.product1[0] === undefined) {
    document.querySelector("#FinancialTimesSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonFinancialTimes)
    runCountFinancialTimes += 1;
    funcSendtoBrowserFinancialTimes()
  }
  setTimeout(afuncFinancialTimesLoop, rerunTimer1())
}
function funcSendtoBrowserFinancialTimes() {
  document.querySelector("#FinancialTimesSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#FinancialTimesSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#FinancialTimesSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountFinancialTimes} `;
  sendAlert("#FinancialTimesSendtoHTML1")
}

let filterButtonFinancialTimes = document.getElementById("remove-button-FinancialTimes");
filterButtonFinancialTimes.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonFinancialTimes);
  funcSendtoBrowserFinancialTimes()
});
let filterButtonFinancialTimes2 = document.getElementById("remove-button-FinancialTimes-2");
filterButtonFinancialTimes2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonFinancialTimes);
  funcSendtoBrowserFinancialTimes()
});
//////////FinancialTimes//////////
//////////GlobalNewswire//////////
let runCountGlobalNewswire = 0;
let responseJsonGlobalNewswire;

async function afuncGlobalNewswireLoop() {
  let responseGlobalNewswire = await fetch("/GlobalNewswire");
  responseJsonGlobalNewswire = await responseGlobalNewswire.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));

  if (responseJsonGlobalNewswire.product1[0] === undefined) {
    document.querySelector("#GlobalNewswireSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonGlobalNewswire)
    runCountGlobalNewswire += 1;
    funcSendtoBrowserGlobalNewswire()
  }
  setTimeout(afuncGlobalNewswireLoop, rerunTimer1())
}
function funcSendtoBrowserGlobalNewswire() {
  document.querySelector("#GlobalNewswireSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#GlobalNewswireSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#GlobalNewswireSendtoHTML3").innerHTML = `<br>Bot Run Count: ${runCountGlobalNewswire} `;
  sendAlert("#GlobalNewswireSendtoHTML1")
}

let filterButtonGlobalNewswire = document.getElementById("remove-button-GlobalNewswire");
filterButtonGlobalNewswire.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonGlobalNewswire);
  funcSendtoBrowserGlobalNewswire()
});
let filterButtonGlobalNewswire2 = document.getElementById("remove-button-GlobalNewswire-2");
filterButtonGlobalNewswire2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonGlobalNewswire);
  funcSendtoBrowserGlobalNewswire()
});
//////////GlobalNewswire//////////
//////////prNewswire//////////
let runCountprNewswire = 0;
let responseJsonprNewswire;

async function afuncprNewswireLoop() {
  let responseprNewswire = await fetch("/prNewswire");
  responseJsonprNewswire = await responseprNewswire.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonprNewswire.product1[0] === undefined) {
    document.querySelector("#prNewswireSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonprNewswire)
    runCountprNewswire += 1;
    funcSendtoBrowserprNewswire()
  }
  setTimeout(afuncprNewswireLoop, rerunTimer1())
}
function funcSendtoBrowserprNewswire() {
  document.querySelector("#prNewswireSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#prNewswireSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#prNewswireSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountprNewswire} `;
  sendAlert("#prNewswireSendtoHTML1")
}

let filterButtonprNewswire = document.getElementById("remove-button-prNewswire");
filterButtonprNewswire.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonprNewswire);
  funcSendtoBrowserprNewswire()
});
let filterButtonprNewswire2 = document.getElementById("remove-button-prNewswire-2");
filterButtonprNewswire2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonprNewswire);
  funcSendtoBrowserprNewswire()
});
//////////prNewswire//////////
//////////ReutersBusiness//////////
let runCountReutersBusiness = 0;
let responseJsonReutersBusiness;
async function afuncReutersBusinessLoop() {
  let responseReutersBusiness = await fetch("/ReutersBusiness");
  responseJsonReutersBusiness = await responseReutersBusiness.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonReutersBusiness.product1[0] === undefined) {
    document.querySelector("#ReutersBusinessSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonReutersBusiness)
    runCountReutersBusiness += 1;
    funcSendtoBrowserReutersBusiness()
  }
  setTimeout(afuncReutersBusinessLoop, rerunTimer1())
}
function funcSendtoBrowserReutersBusiness() {
  document.querySelector("#ReutersBusinessSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#ReutersBusinessSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#ReutersBusinessSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountReutersBusiness}`;
  sendAlert("#ReutersBusinessSendtoHTML1")
}

let filterButtonReutersBusiness = document.getElementById("remove-button-ReutersBusiness");
filterButtonReutersBusiness.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonReutersBusiness);
  funcSendtoBrowserReutersBusiness()
});

let filterButtonReutersBusiness2 = document.getElementById("remove-button-ReutersBusiness-2");
filterButtonReutersBusiness2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonReutersBusiness);
  funcSendtoBrowserReutersBusiness()
});
//////////ReutersBusiness//////////
//////////WsjFinance//////////
let runCountWsjFinance = 0;
let responseJsonWsjFinance;
async function afuncWsjFinanceLoop() {
  let responseWsjFinance = await fetch("/WsjFinance");
  responseJsonWsjFinance = await responseWsjFinance.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonWsjFinance.product1[0] === undefined) {
    document.querySelector("#WsjFinanceSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonWsjFinance)
    runCountWsjFinance += 1;
    funcSendtoBrowserWsjFinance()
  }
  setTimeout(afuncWsjFinanceLoop, rerunTimer1())
}
function funcSendtoBrowserWsjFinance() {
  document.querySelector("#WsjFinanceSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#WsjFinanceSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#WsjFinanceSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountWsjFinance}`;
  sendAlert("#WsjFinanceSendtoHTML1")
}

let filterButtonWsjFinance = document.getElementById("remove-button-WsjFinance");
filterButtonWsjFinance.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonWsjFinance);
  funcSendtoBrowserWsjFinance()
});
let filterButtonWsjFinance2 = document.getElementById("remove-button-WsjFinance-2");
filterButtonWsjFinance2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonWsjFinance);
  funcSendtoBrowserWsjFinance()
});
//////////WsjFinance//////////

//////////WsjNews//////////
let runCountWsjNews = 0;
let responseJsonWsjNews;
async function afuncWsjNewsLoop() {
  let responseWsjNews = await fetch("/WsjNews");
  responseJsonWsjNews = await responseWsjNews.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonWsjNews.product1[0] === undefined) {
    document.querySelector("#WsjNewsSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonWsjNews)
    runCountWsjNews += 1;
    funcSendtoBrowserWsjNews()
  }
  setTimeout(afuncWsjNewsLoop, rerunTimer1())
}
function funcSendtoBrowserWsjNews() {
  document.querySelector("#WsjNewsSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#WsjNewsSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#WsjNewsSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountWsjNews}`;
  sendAlert("#WsjNewsSendtoHTML1")
}

let filterButtonWsjNews = document.getElementById("remove-button-WsjNews");
filterButtonWsjNews.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonWsjNews);
  funcSendtoBrowserWsjNews()
});

let filterButtonWsjNews2 = document.getElementById("remove-button-WsjNews-2");
filterButtonWsjNews2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonWsjNews);
  funcSendtoBrowserWsjNews()
});
//////////WsjNews//////////

//////////CNBC//////////
let runCountCNBC = 0;
let responseJsonCNBC;
async function afuncCNBCLoop() {
  let responseCNBC = await fetch("/CNBC");
  responseJsonCNBC = await responseCNBC.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonCNBC.product1[0] === undefined) {
    document.querySelector("#CNBCSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonCNBC)
    runCountCNBC += 1;
    funcSendtoBrowserCNBC()
  }
  setTimeout(afuncCNBCLoop, rerunTimer1())
}
function funcSendtoBrowserCNBC() {
  document.querySelector("#CNBCSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#CNBCSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#CNBCSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountCNBC}`;
  sendAlert("#CNBCSendtoHTML1")
}

let filterButtonCNBC = document.getElementById("remove-button-CNBC");
filterButtonCNBC.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonCNBC);
  funcSendtoBrowserCNBC()
});

let filterButtonCNBC2 = document.getElementById("remove-button-CNBC-2");
filterButtonCNBC2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonCNBC);
  funcSendtoBrowserCNBC()
});

//////////CNBC//////////

//////////Yahoo//////////
let runCountYahoo = 0;
let responseJsonYahoo;
async function afuncYahooLoop() {
  let responseYahoo = await fetch("/Yahoo");
  responseJsonYahoo = await responseYahoo.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonYahoo.product1[0] === undefined) {
    document.querySelector("#YahooSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonYahoo)
    runCountYahoo += 1;
    funcSendtoBrowserYahoo()
  }
  setTimeout(afuncYahooLoop, rerunTimer1())
}
function funcSendtoBrowserYahoo() {
  document.querySelector("#YahooSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#YahooSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#YahooSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountYahoo}`;
  sendAlert("#YahooSendtoHTML1");
}

let filterButtonYahoo = document.getElementById("remove-button-Yahoo");
filterButtonYahoo.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonYahoo);
  funcSendtoBrowserYahoo()
});

let filterButtonYahoo2 = document.getElementById("remove-button-Yahoo-2");
filterButtonYahoo2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonYahoo);
  funcSendtoBrowserYahoo()
});
//////////Yahoo//////////

//////////Barrons//////////
let runCountBarrons = 0;
let responseJsonBarrons;
async function afuncBarronsLoop() {
  let responseBarrons = await fetch("/Barrons");
  responseJsonBarrons = await responseBarrons.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonBarrons.product1[0] === undefined) {
    document.querySelector("#BarronsSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonBarrons)
    runCountBarrons += 1;
    funcSendtoBrowserBarrons()
  }
  setTimeout(afuncBarronsLoop, rerunTimer1())
}
function funcSendtoBrowserBarrons() {
  document.querySelector("#BarronsSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#BarronsSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#BarronsSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountBarrons}`;
  sendAlert("#BarronsSendtoHTML1")
}

let filterButtonBarrons = document.getElementById("remove-button-Barrons");
filterButtonBarrons.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonBarrons);
  funcSendtoBrowserBarrons()
});

let filterButtonBarrons2 = document.getElementById("remove-button-Barrons-2");
filterButtonBarrons2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonBarrons);
  funcSendtoBrowserBarrons()
});
//////////Barrons//////////
//////////BusinessNewswire//////////
let runCountBusinessNewswire = 0;
let responseJsonBusinessNewswire;
async function afuncBusinessNewswireLoop() {
  let responseBusinessNewswire = await fetch("/BusinessNewswire");
  responseJsonBusinessNewswire = await responseBusinessNewswire.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonBusinessNewswire.product1[0] === undefined) {
    document.querySelector("#BusinessNewswireSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonBusinessNewswire)
    runCountBusinessNewswire += 1;
    funcSendtoBrowserBusinessNewswire()
  }
  setTimeout(afuncBusinessNewswireLoop, rerunTimer1())
}
function funcSendtoBrowserBusinessNewswire() {
  document.querySelector("#BusinessNewswireSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#BusinessNewswireSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#BusinessNewswireSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountBusinessNewswire}`;
  sendAlert("#BusinessNewswireSendtoHTML1")
}

let filterButtonBusinessNewswire = document.getElementById("remove-button-BusinessNewswire");
filterButtonBusinessNewswire.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonBusinessNewswire);
  funcSendtoBrowserBusinessNewswire()
});

let filterButtonBusinessNewswire2 = document.getElementById("remove-button-BusinessNewswire-2");
filterButtonBusinessNewswire2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonBusinessNewswire);
  funcSendtoBrowserBusinessNewswire()
});
//////////BusinessNewswire//////////

//////////Puppeteer-AccessNewswire//////////
let runCountAccessNewswire = 0;
let responseJsonAccessNewswire;
async function afuncAccessNewswirePuppeteer() {
  let responseAccessNewswire = await fetch("/AccessNewswire");
  responseJsonAccessNewswire = await responseAccessNewswire.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonAccessNewswire.product1[0] === undefined) {
    document.querySelector("#AccessNewswireSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonAccessNewswire)
    runCountAccessNewswire += 1;
    funcSendtoBrowserAccessNewswire()
  }
  setTimeout(afuncAccessNewswirePuppeteer, rerunTimer1())
}
function funcSendtoBrowserAccessNewswire() {
  document.querySelector("#AccessNewswireSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#AccessNewswireSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#AccessNewswireSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountAccessNewswire}`;
  sendAlert("#AccessNewswireSendtoHTML1")
}

let filterButtonAccessNewswire = document.getElementById("remove-button-AccessNewswire");
filterButtonAccessNewswire.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonAccessNewswire);
  funcSendtoBrowserAccessNewswire()
});

let filterButtonAccessNewswire2 = document.getElementById("remove-button-AccessNewswire-2");
filterButtonAccessNewswire2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonAccessNewswire);
  funcSendtoBrowserAccessNewswire()
});
//////////Puppeteer-AccessNewswire//////////

//////////Puppeteer-SeekingAlpha//////////
let runCountSeekingAlpha = 0;
let responseJsonSeekingAlpha;
async function afuncSeekingAlphaPuppeteer() {
  let responseSeekingAlpha = await fetch("/SeekingAlpha");
  responseJsonSeekingAlpha = await responseSeekingAlpha.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsonSeekingAlpha.product1[0] === undefined) {
    document.querySelector("#SeekingAlphaSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    afuncMatchFilter(responseJsonSeekingAlpha)
    runCountSeekingAlpha += 1;
    funcSendtoBrowserSeekingAlpha()
  }
  setTimeout(afuncSeekingAlphaPuppeteer, rerunTimer1())
}
function funcSendtoBrowserSeekingAlpha() {
  document.querySelector("#SeekingAlphaSendtoHTML1").innerHTML = sharedFinalArticlesArray;
  document.querySelector("#SeekingAlphaSendtoHTML2").innerHTML = sharedFinalStocksArray;
  document.querySelector("#SeekingAlphaSendtoHTML3").innerHTML = `<br> Bot Run Count: ${runCountSeekingAlpha}`;
  sendAlert("#SeekingAlphaSendtoHTML1")
}

let filterButtonSeekingAlpha = document.getElementById("remove-button-SeekingAlpha");
filterButtonSeekingAlpha.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate(responseJsonSeekingAlpha);
  funcSendtoBrowserSeekingAlpha()
});

let filterButtonSeekingAlpha2 = document.getElementById("remove-button-SeekingAlpha-2");
filterButtonSeekingAlpha2.addEventListener("click", (e) => {
  playClick()
  e.preventDefault();
  funcRemoveDuplicate2(responseJsonSeekingAlpha);
  funcSendtoBrowserSeekingAlpha()
});
//////////Puppeteer-SeekingAlpha//////////


////////////GoogleNews Code Set////////////
async function afuncGoogleNews2() {
  let responseGoogle2 = await fetch("/GoogleNews2");
  let jsonDataGoogle2 = await responseGoogle2.json().catch(err => console.log(err));
  document.querySelector("#GoogleNews2toHTML1").innerHTML = jsonDataGoogle2.product1;
  document.querySelector("#GoogleNews2toHTML2").innerHTML = jsonDataGoogle2.product2;
  document.querySelector("#GoogleNews2toHTML3").innerHTML = jsonDataGoogle2.product3;
  document.querySelector("#GoogleNews2toHTML4").innerHTML = jsonDataGoogle2.product4;
  document.querySelector("#GoogleNews2toHTML5").innerHTML = jsonDataGoogle2.product5;
  document.querySelector("#GoogleNews2toHTML6").innerHTML = jsonDataGoogle2.product6;
  setTimeout(afuncGoogleNews2, rerunTimer2())
}
////////////GoogleNews Code Set////////////