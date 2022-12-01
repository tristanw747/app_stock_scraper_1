"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlFedSchedule = 'https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm';
export let arrFedSchedule = [];
export async function afuncFedSchedule(url) {
  arrFedSchedule = [];
  let temp1=[];
  let temp2=[];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.fomc-meeting__month.col-xs-5.col-sm-3.col-md-2', html).each(function() {
    temp1.push($(this).text())
  })
  temp1= [temp1[0],temp1[1],temp1[2],temp1[3],temp1[4],temp1[5],temp1[6],temp1[7]]
 
  $('.fomc-meeting__date.col-xs-4.col-sm-9.col-md-10.col-lg-1', html).each(function() {
    temp2.push($(this).text())
  })
  temp2= [temp2[0],temp2[1],temp2[2],temp2[3],temp2[4],temp2[5],temp2[6],temp2[7]]

  for (let m = 0; m < temp1.length; m++) {
    arrFedSchedule.push(temp1[m] + ': ' + temp2[m] + '<br/>')
  }
  arrFedSchedule = arrFedSchedule.join('')
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrFedSchedule)
}
