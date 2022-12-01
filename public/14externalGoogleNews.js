"use strict";
import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
export let funcFullUrl = (urlKeyVariable) => `https://www.google.com/search?q=${urlKeyVariable}&tbm=nws&sxsrf=lnt&tbs=qdr:d&sa`
export let test1 = funcFullUrl('russia')
export let test2 = funcFullUrl('china+covid')
export let test3 = funcFullUrl('covid-19')
export let test4 = funcFullUrl('iran')
export let test5 = funcFullUrl('Venezuela+oil')
export let test6 = funcFullUrl('Saudi+Arabia')
export let arrCumulative = []
export let arrGoogleSchedule = []

export async function funcSharedGoogleScrape(url, torl, corl, aorl, url5, url6) {
  arrCumulative = []
  arrGoogleSchedule = []

  // let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache', headless: true, executablePath:executablePath() }).then(async browser => {
  //   let page = (await browser.pages())[0]
  //   await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 })
  //   let arrGoogleDates = []

  //   let arrDate2 = await page.evaluate(() => {
  //     return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
  //   })
  //   arrGoogleDates.push(arrDate2[0], arrDate2[1], arrDate2[2], arrDate2[3], arrDate2[4], arrDate2[5], arrDate2[6], arrDate2[7])

  //   for (let m = 0; m < arrGoogleDates.length; m++) {
  //     arrGoogleSchedule.push(arrGoogleDates[m] + '<br/>')
  //   }
  //   arrGoogleSchedule = arrGoogleSchedule.join('')
  //   arrCumulative.push(arrGoogleSchedule)
  //   browser.close()
  // })




  let browser = await puppeteer.launch({ userDataDir: './puppeteerWebCache', headless: true, executablePath:executablePath() })
    let page = (await browser.pages())[0]
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleDates = []

    let arrDate2 = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates.push(arrDate2[0], arrDate2[1], arrDate2[2], arrDate2[3], arrDate2[4], arrDate2[5], arrDate2[6], arrDate2[7])

    for (let m = 0; m < arrGoogleDates.length; m++) {
      arrGoogleSchedule.push(arrGoogleDates[m] + '<br/>')
    }
    arrGoogleSchedule = arrGoogleSchedule.join('')
    arrCumulative.push(arrGoogleSchedule)
    browser.close()



  /////////////
  let browser2 = await puppeteer.launch({ userDataDir: './ZZdata', headless: true, executablePath:executablePath() }).then(async browser2 => {
    let page2 = await browser2.newPage()
    await page2.goto(torl, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleSchedule2 = []
    let arrGoogleDates2 = []
    let arrDate1 = await page2.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates2.push(arrDate1[0], arrDate1[1], arrDate1[2], arrDate1[3], arrDate1[4], arrDate1[5], arrDate1[6], arrDate1[7])

    for (let y = 0; y < arrGoogleDates2.length; y++) {
      arrGoogleSchedule2.push(arrGoogleDates2[y] + '<br/>')
    }
    arrGoogleSchedule2 = arrGoogleSchedule2.join('')
    arrCumulative.push(arrGoogleSchedule2)
    browser2.close()
  })
  /////////////////

  let browser3 = await puppeteer.launch({ userDataDir: './ZZdata', headless: true, executablePath:executablePath() }).then(async browser3 => {
    let page3 = await browser3.newPage()
    await page3.goto(corl, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleDates3 = []
    let arrGoogleSchedule3 = []
    let arrDate3 = await page3.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates3.push(arrDate3[0], arrDate3[1], arrDate3[2], arrDate3[3], arrDate3[4], arrDate3[5], arrDate3[6], arrDate3[7])

    for (let y = 0; y < arrGoogleDates3.length; y++) {
      arrGoogleSchedule3.push(arrGoogleDates3[y] + '<br/>')
    }
    arrGoogleSchedule3 = arrGoogleSchedule3.join('')
    arrCumulative.push(arrGoogleSchedule3)
    browser3.close()
  })

  //////////////////////
  let browser4 = await puppeteer.launch({ userDataDir: './ZZdata', headless: true, executablePath:executablePath() }).then(async browser4 => {
    let page4 = await browser4.newPage()
    await page4.goto(aorl, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleDates4 = []
    let arrGoogleSchedule4 = []
    let arrDate4 = await page4.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates4.push(arrDate4[0], arrDate4[1], arrDate4[2], arrDate4[3], arrDate4[4], arrDate4[5], arrDate4[6], arrDate4[7])

    for (let y = 0; y < arrGoogleDates4.length; y++) {
      arrGoogleSchedule4.push(arrGoogleDates4[y] + '<br/>')
    }
    arrGoogleSchedule4 = arrGoogleSchedule4.join('')
    arrCumulative.push(arrGoogleSchedule4)
    browser4.close()
  })
  //////////////////
  let browser5 = await puppeteer.launch({ userDataDir: './ZZdata', headless: true, executablePath:executablePath() }).then(async browser5 => {
    let page5 = await browser5.newPage()
    await page5.goto(url5, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleDates5 = []
    let arrGoogleSchedule5 = []
    let arrDate5 = await page5.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates5.push(arrDate5[0], arrDate5[1], arrDate5[2], arrDate5[3], arrDate5[4], arrDate5[5], arrDate5[6], arrDate5[7])

    for (let y = 0; y < arrGoogleDates5.length; y++) {
      arrGoogleSchedule5.push(arrGoogleDates5[y] + '<br/>')
    }
    arrGoogleSchedule5 = arrGoogleSchedule5.join('')
    arrCumulative.push(arrGoogleSchedule5)
    browser5.close()
  })


  let browser6 = await puppeteer.launch({ userDataDir: './ZZdata', headless: true, executablePath:executablePath() }).then(async browser6 => {
    let page6 = await browser6.newPage()
    await page6.goto(url6, { waitUntil: "domcontentloaded", timeout: 0 })
    let arrGoogleDates6 = []
    let arrGoogleSchedule6 = []
    let arrDate6 = await page6.evaluate(() => {
      return Array.from(document.querySelectorAll('.mCBkyc.ynAwRc.MBeuO.nDgy9d')).map(x => x.textContent)
    })
    arrGoogleDates6.push(arrDate6[0], arrDate6[1], arrDate6[2], arrDate6[3], arrDate6[4], arrDate6[5], arrDate6[6], arrDate6[7])

    for (let y = 0; y < arrGoogleDates6.length; y++) {
      arrGoogleSchedule6.push(arrGoogleDates6[y] + '<br/>')
    }
    arrGoogleSchedule6 = arrGoogleSchedule6.join('')
    arrCumulative.push(arrGoogleSchedule6)
    browser6.close()
  })
}


////////////GoogleNews Code Set////////////