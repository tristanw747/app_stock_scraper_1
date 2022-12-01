"use strict";
import { load } from 'cheerio';
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlSEC13dFilings = 'https://www.sec.gov/cgi-bin/browse-edgar?company=&CIK=&type=SC+13D&owner=include&count=40&action=getcurrent';
 let arrSEC13dFilings
 let arrSEC13dFilings2
export let arrObject1 = [];
export async function afuncSEC13dFilings(url) {
  arrObject1 = [];
  arrSEC13dFilings = [];
  arrSEC13dFilings2 = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('a', html).each(function () {
    arrSEC13dFilings.push($(this).text().replace(/\s\(\d{10}\)\s/gi, '').replace(/\(.+\)/gi, ''))
  })
  $('a', html).each(function () {
    arrSEC13dFilings2.push('https://www.sec.gov' + $(this).attr('href'))
  })
  for (let i = 0; i < arrSEC13dFilings.length; i++) {
    arrObject1.push({
      title: arrSEC13dFilings[i],
      url: arrSEC13dFilings2[i]
    })
  }
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", JSON.stringify(arrObject1))
  // console.log(arrObject1)
}