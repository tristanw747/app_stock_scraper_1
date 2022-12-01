"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlMortgageRates = 'https://www.nerdwallet.com/mortgages/mortgage-rates';
export let arrMortgageRates = [];
export async function afuncMortgageRates(url) {
  arrMortgageRates = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $("#rate-trends > div > div:nth-child(1) > div > table > tbody > tr.n_9DFJ.V9hf9O > td:nth-child(3)", html).each(function() {
    arrMortgageRates.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrMortgageRates)
}