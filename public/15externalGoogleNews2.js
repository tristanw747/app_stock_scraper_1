"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
export let funcFullUrl = (urlKeyVariable) => `https://www.google.com/search?q=${urlKeyVariable}&tbm=nws&sxsrf=lnt&tbs=qdr:d&sa`;
export let link1 = funcFullUrl('russia');
export let link2 = funcFullUrl('china+covid');
export let link3 = funcFullUrl('covid-19');
export let link4 = funcFullUrl('iran');
export let link5 = funcFullUrl('venezuela+oil');
export let link6 = funcFullUrl('Saudi+Arabia');
export let arrCumulative2 = [];
export let arrGoogleNews2Schedule = [];
export async function startBrowser() {
  global.browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache', headless: true, executablePath: executablePath() });
}
export async function closeBrowser() {
  await browser.close()
}
export async function funcSharedGoogleNews2Scrape(url) {
  arrGoogleNews2Schedule = [];
  let arrGoogleDates = [];
  const page = (await browser.pages())[0]
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
  let arrDate2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent);
  })
  arrGoogleDates.push(arrDate2[0], arrDate2[1], arrDate2[2], arrDate2[3], arrDate2[4], arrDate2[5], arrDate2[6], arrDate2[7]);
  
  for (let m = 0; m < arrGoogleDates.length; m++) {
    arrGoogleNews2Schedule.push(arrGoogleDates[m] + '<br/>')
  }
  arrGoogleNews2Schedule = arrGoogleNews2Schedule.join('')
  arrCumulative2.push(arrGoogleNews2Schedule)
 
}
////////////GoogleNews Code Set////////////