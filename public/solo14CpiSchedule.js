"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlCpiSchedule = 'https://www.bls.gov/schedule/news_release/cpi.htm';
export let arrCpiSchedule = [];
export async function afuncCpiSchedule(url) {
  arrCpiSchedule = [];
  let temp1=[];
  let temp2=[];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.release-list-even-row', html).each(function() {
    temp1.push($(this).text())
  })
  temp1= [temp1[0],temp1[1],temp1[2],temp1[3]]
 
  $('.release-list-odd-row', html).each(function() {
    temp2.push($(this).text())
  })
  temp2= [temp2[0],temp2[1],temp2[2],temp2[3]]

  for (let m = 0; m < temp1.length; m++) {
    arrCpiSchedule.push(temp1[m] + '<br/> ' + temp2[m] + '<br/>')
  }
  arrCpiSchedule = arrCpiSchedule.join('')
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrCpiSchedule)
}


