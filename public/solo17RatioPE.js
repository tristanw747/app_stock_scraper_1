"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


export const urlRatioPE = 'https://www.wsj.com/market-data/stocks/peyields';
export let arrRatioPE = [];
export let arrNumbersOnly=[];
export async function afuncRatioPE(url) {
  // let timer = new Date()
  arrRatioPE = [];
  arrNumbersOnly=[]
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  // await page.goto(url, { waitUntil: "domcontentloaded"})
  // await page.goto(url, { waitUntil: "networkidle2" })
  await page.goto(url)
  // await page.waitForSelector('.WSJTables--table__cell--2u6629rx.WSJTables--u-positive--3zGr9GY4.WSJTables--u-bold--2_c3d2OG.WSJBase--u-positive--2jiH4U3E.WSJBase--u-bold--3PsmXC8Q', {visible: true})
  
  let temp = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".WSJTables--table__cell--2u6629rx.WSJTables--u-positive--3zGr9GY4.WSJTables--u-bold--2_c3d2OG.WSJBase--u-positive--2jiH4U3E.WSJBase--u-bold--3PsmXC8Q")).map(x => x.textContent)
  })

  arrRatioPE=[`Dow Jones P/E Ratio: ${temp[0]}`, "<br>", `Nasdaq 100 P/E Ratio: ${temp[8]}`, "<br>", `S&P 500 P/E Ratio: ${temp[10]}`]
  arrNumbersOnly=[temp[0],temp[8],temp[10]];
  arrRatioPE = arrRatioPE.join(' ');
  // let timer2 = new Date()
  // console.log(`second type: ${timer2.getTime() - timer.getTime()}`)
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrRatioPE)
  await browser.close()
}