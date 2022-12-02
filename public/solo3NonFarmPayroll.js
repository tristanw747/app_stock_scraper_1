"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlNonFarmPayroll = 'https://tradingeconomics.com/united-states/non-farm-payrolls#';
export let arrNonFarmPayroll = [];
export let arrNonFarmPayroll2 = [];
export async function afuncNonFarmPayroll(url) {
  arrNonFarmPayroll = [];
  arrNonFarmPayroll2 = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.an-estimate-row', html).each(function() {
    arrNonFarmPayroll.push($(this).text())
  })

  let www = arrNonFarmPayroll[0].replaceAll(/\n\n\n.*2022/gi, '<br> 2022').replaceAll(/non farm payrolls/gi, '')
    let www2 = arrNonFarmPayroll[1].replaceAll(/\n\n\n.*2022/gi, '<br> 2022').replaceAll(/non farm payrolls/gi, '')
    // let www3 = arrNonFarmPayroll[2].replaceAll(/non farm payrolls/gi, '')
      .replaceAll(/\n/gi, '')
      // arrNonFarmPayroll2.push(www3, '<br>', www2, '<br>', www)
      arrNonFarmPayroll2.push( www2, '<br>', www)
      arrNonFarmPayroll2 = arrNonFarmPayroll2.join('')
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrNonFarmPayroll)
}
