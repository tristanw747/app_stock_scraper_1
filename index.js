"use strict";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import executablePath from 'puppeteer';
import fs from 'fs/promises';
import express from "express";
import { arrExternalStocksList } from './public/0-stock-list.js';
import { arrExternalExclusionList } from './public/0-stock-exclude.js';
import { afuncFinancialTimes, urlFinancialTimes, arrFinancialTimes } from './public/1externalFinancialTimes.js';
import { afuncGlobalNewswire, urlGlobalNewswire } from './public/2externalGlobalNewswire.js';
import { afuncprNewswire, urlprNewswire, arrprNewswire } from './public/3externalprNewswire.js';
import { afuncReutersBusiness, urlReutersBusiness, arrReutersBusiness } from './public/4externalReutersBusiness.js';
import { afuncWsjFinance, urlWsjFinance, arrWsjFinance } from './public/5externalWsjFinance.js';
import { afuncWsjNews, urlWsjNews, arrWsjNews } from './public/6externalWsjNews.js';
import { afuncCNBC, urlCNBC, arrCNBC } from './public/7externalCNBC.js';
import { afuncYahoo, urlYahoo, arrYahoo } from './public/16externalYahoo.js';
import { afuncBarrons, urlBarrons, arrBarrons } from './public/8externalBarrons.js';
import { afuncBusinessNewswire, urlBusinessNewswire, arrBusinessNewswire } from './public/9externalBusinessWire.js';
import { afuncSEC13dFilings, urlSEC13dFilings, arrObject1 } from './public/10externalSEC13dFilings.js';
import { afuncSEC13g, urlSEC13g, arrObject2 } from './public/11externalSEC13g.js';
import { afuncReverseRepo, urlReverseRepo, arrReverseRepo } from './public/solo1ReverseRepo.js';
import { afuncNonFarmPayroll, urlNonFarmPayroll, arrNonFarmPayroll2 } from './public/solo3NonFarmPayroll.js';
import { afuncJolts, urlJolts, arrJolts, arrJolts2 } from './public/solo4Jolts.js';
import { afuncWeeklyJobless, urlWeeklyJobless, arrWeeklyJobless } from './public/solo5WeeklyJobless.js';
import { afuncMichConsumer, urlMichConsumer, arrMichConsumer } from './public/solo7MichConsumer.js';
import { afuncFedRates, urlFedRates, arrFedRates } from './public/solo8FedRates.js';
import { afuncMortgageRates, urlMortgageRates, arrMortgageRates } from './public/solo9MortgageRates.js';
import { afuncReleasePPI, urlReleasePPI, arrReleasePPI } from './public/solo11PPI.js';
import { afuncReleaseCPI, urlReleaseCPI, arrReleaseCPI } from './public/solo12CPI.js';
import { afuncFedSchedule, urlFedSchedule, arrFedSchedule } from './public/solo13FedSchedule.js';
import { afuncCpiSchedule, urlCpiSchedule, arrCpiSchedule } from './public/solo14CpiSchedule.js';
import { afuncUnemployment, urlUnemployment, arrUnemployment } from './public/solo15Unemployment.js';
import { afuncIndexPCE, urlIndexPCE, arrIndexPCE } from './public/solo6PCEIndex.js';
import { afuncFomcMinutes, urlFomcMinutes, arrFomcMinutes } from './public/solo10FomcMinutes.js';
import { afuncRatioPE, urlRatioPE, arrRatioPE, arrNumbersOnly } from './public/solo17RatioPE.js';
import { afuncCalendarIPO, urlCalendarIPO, arrCalendarIPO } from './public/solo16CalendarIPO.js';
import { afuncAccessNewswire, searchTagAccessNewswire, urlAccessNewswire, arrAccessNewswire } from './public/12externalAccessNewswire.js';
import { afuncSeekingAlpha, urlSeekingAlpha, arrSeekingAlpha } from './public/13externalSeekingAlpha.js';
import { funcSharedGoogleNews2Scrape, closeBrowser, startBrowser, arrCumulative2, link1, link2, link3, link4, link5, link6 } from './public/15externalGoogleNews2.js';
const port = process.env.PORT || 3000;
const app = express();

//////////Initialization//////////

app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Scraper listening at http://localhost:${port}`);
});
//////////Initialization//////////



app.get("/localstocklist", async (req, res) => {
  res.send({ product1: arrExternalStocksList, product2: arrExternalExclusionList });
});

app.get("/FinancialTimes", async (req, res) => {
  await afuncFinancialTimes(urlFinancialTimes)
  res.send({ product1: arrFinancialTimes });
});

app.get("/GlobalNewswire", async (req, res) => {
  res.send({ product1: await afuncGlobalNewswire(urlGlobalNewswire) });
});

app.get("/prNewswire", async (req, res) => {
  await afuncprNewswire(urlprNewswire)
  res.send({ product1: arrprNewswire });
});

app.get("/ReutersBusiness", async (req, res) => {
  await afuncReutersBusiness(urlReutersBusiness)
  res.send({ product1: arrReutersBusiness });
});

app.get("/WsjFinance", async (req, res) => {
  await afuncWsjFinance(urlWsjFinance)
  res.send({ product1: arrWsjFinance });
});

app.get("/WsjNews", async (req, res) => {
  await afuncWsjNews(urlWsjNews)
  res.send({ product1: arrWsjNews });
});

app.get("/CNBC", async (req, res) => {
  await afuncCNBC(urlCNBC)
  res.send({ product1: arrCNBC });
});

app.get("/Yahoo", async (req, res) => {
  await afuncYahoo(urlYahoo)
  res.send({ product1: arrYahoo });
});

app.get("/Barrons", async (req, res) => {
  await afuncBarrons(urlBarrons)
  res.send({ product1: arrBarrons });
});

app.get("/BusinessNewswire", async (req, res) => {
  await afuncBusinessNewswire(urlBusinessNewswire)
  res.send({ product1: arrBusinessNewswire });
});

app.get("/SEC13dFilings", async (req, res) => {
  await afuncSEC13dFilings(urlSEC13dFilings)
  res.send({ product1: arrObject1.map(x => x.title), product2:arrObject1 });
  // console.log(arrObject1.map(x => x.title))
});

app.get("/SEC13g", async (req, res) => {
  await afuncSEC13g(urlSEC13g)
  res.send({ product1: arrObject2.map(x => x.title), product2:arrObject2 });
});

app.get("/AccessNewswire", async (req, res) => {
  await afuncAccessNewswire(urlAccessNewswire, searchTagAccessNewswire)
  res.send({ product1: arrAccessNewswire });
});

app.get("/SeekingAlpha", async (req, res) => {
  await afuncSeekingAlpha(urlSeekingAlpha)
  res.send({ product1: arrSeekingAlpha });
});


//////////Single Instance Run//////////
app.get("/ReverseRepo", async (req, res) => {
  await afuncReverseRepo(urlReverseRepo)
  res.send({ product1: arrReverseRepo });
});

app.get("/NonFarmPayroll", async (req, res) => {
  await afuncNonFarmPayroll(urlNonFarmPayroll)
  res.send({ product1: arrNonFarmPayroll2 });
});

app.get("/Jolts", async (req, res) => {
  await afuncJolts(urlJolts)
  res.send({ product1: arrJolts, product2: arrJolts2 });
});

app.get("/WeeklyJobless", async (req, res) => {
  await afuncWeeklyJobless(urlWeeklyJobless)
  res.send({ product1: arrWeeklyJobless });
});

app.get("/MichConsumer", async (req, res) => {
  await afuncMichConsumer(urlMichConsumer)
  res.send({ product1: arrMichConsumer });
});

app.get("/FedRates", async (req, res) => {
  await afuncFedRates(urlFedRates)
  res.send({ product1: arrFedRates });
});

app.get("/MortgageRates", async (req, res) => {
  await afuncMortgageRates(urlMortgageRates)
  res.send({ product1: arrMortgageRates });
});

app.get("/ReleasePPI", async (req, res) => {
  await afuncReleasePPI(urlReleasePPI)
  res.send({ product1: arrReleasePPI });
});

app.get("/ReleaseCPI", async (req, res) => {
  await afuncReleaseCPI(urlReleaseCPI)
  res.send({ product1: arrReleaseCPI });
});

app.get("/FedSchedule", async (req, res) => {
  await afuncFedSchedule(urlFedSchedule)
  res.send({ product1: arrFedSchedule });
});

app.get("/CpiSchedule", async (req, res) => {
  await afuncCpiSchedule(urlCpiSchedule)
  res.send({ product1: arrCpiSchedule });
});

app.get("/Unemployment", async (req, res) => {
  await afuncUnemployment(urlUnemployment)
  res.send({ product1: arrUnemployment });
});

app.get("/IndexPCE", async (req, res) => {
  await afuncIndexPCE(urlIndexPCE)
  res.send({ product1: arrIndexPCE });
});

app.get("/FomcMinutes", async (req, res) => {
  await afuncFomcMinutes(urlFomcMinutes)
  res.send({ product1: arrFomcMinutes });
});

app.get("/RatioPE", async (req, res) => {
  await afuncRatioPE(urlRatioPE)
  res.send({ product1: arrRatioPE, product2:arrNumbersOnly });
});

app.get("/CalendarIPO", async (req, res) => {
  await afuncCalendarIPO(urlCalendarIPO)
  res.send({ product1: arrCalendarIPO });
});


//keep for speed testing purposes
// app.get("/google", async (req, res) => {
//   let timer = new Date()
//   await funcSharedGoogleScrape(test1, test2, test3, test4, test5, test6)
//   res.send({ product1: arrCumulative[0], product2: arrCumulative[1], product3: arrCumulative[2], product4: arrCumulative[3], product5: arrCumulative[4], product6: arrCumulative[5] });
//   let timer2 = new Date()
//   console.log(`first type: ${timer2.getTime() - timer.getTime()}`)
// });

app.get("/GoogleNews2", async (req, res) => {
  // let timer = new Date()
  await startBrowser()
  await funcSharedGoogleNews2Scrape(link1)
  await funcSharedGoogleNews2Scrape(link2)
  await funcSharedGoogleNews2Scrape(link3)
  await funcSharedGoogleNews2Scrape(link4)
  await funcSharedGoogleNews2Scrape(link5)
  await funcSharedGoogleNews2Scrape(link6)
  await closeBrowser()
  res.send({ product1: arrCumulative2[0], product2: arrCumulative2[1], product3: arrCumulative2[2], product4: arrCumulative2[3], product5: arrCumulative2[4], product6: arrCumulative2[5] });
  // let timer2 = new Date()
  // console.log(`second type: ${timer2.getTime() - timer.getTime()}`)
});