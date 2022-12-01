//index
import { afunctptp, urltptp, arrtptp } from './public/'

app.get("/tptp", async (req, res) => {
  await afunctptp(urltptp)
  res.send({ product1: arrtptp });
});

//main
afunctptpPuppeteer()

//////////Puppeteer-tptp//////////
let runCounttptp = 0;
let responseJsontptp;
async function afunctptpPuppeteer() {
  let responsetptp = await fetch("/tptp");
  responseJsontptp = await responsetptp.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsontptp.product1[0] === undefined) {
    document.querySelector("#tptpSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#tptpSendtoHTML1").innerHTML =responseJsontptp.product1
  }
}
//////////Puppeteer-tptp//////////

//newfile

"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))


export const urltptp = '';
export let arrtptp = [];
export async function afunctptp(url) {
  arrtptp = [];
  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache',headless: true, executablePath: executablePath() })
  let page = (await browser.pages())[0]
  await page.goto(url, { waitUntil: "domcontentloaded"})
  // await page.goto(url, { waitUntil: "networkidle2" })
  // await page.goto(url);
  // await page.waitForSelector(".");
  
  arrtptp = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".")).map(x => x.textContent)
  })
  //uncomment below to Troubleshoot
  // await fs.writeFile("troubleshootSentData.html", arrtptp)
  await browser.close()
}



//html
<h3>tptp<br>
    <span id="tptpSendtoHTML1"></span>
  </h3>