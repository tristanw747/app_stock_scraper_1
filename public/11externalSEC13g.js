"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlSEC13g = 'https://www.sec.gov/cgi-bin/browse-edgar?company=&CIK=&type=SC+13g+&owner=include&count=40&action=getcurrent';
 let arrSEC13g = [];
 let arrSEC13g2 = [];
 export let arrObject2 = [];
export async function afuncSEC13g(url) {
   arrObject2 = [];
  arrSEC13g = [];
  arrSEC13g2 = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('a', html).each(function() {
    arrSEC13g.push($(this).text().replace(/\s\(\d{10}\)\s/gi,'').replace(/\(.+\)/gi, ''))
  })
  $('a', html).each(function () {
    arrSEC13g2.push('https://www.sec.gov' + $(this).attr('href'))
  })
  for (let i = 0; i < arrSEC13g.length; i++) {
    arrObject2.push({
      title: arrSEC13g[i],
      url: arrSEC13g2[i]
    })
  }

  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrSEC13g)
  // console.log(arrObject2)
}