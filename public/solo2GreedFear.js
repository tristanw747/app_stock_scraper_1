"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlGreedFear = 'https://pyinvesting.com/fear-and-greed/';
export let arrGreedFear = [];
export async function afuncGreedFear(url) {
  arrGreedFear = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.text-danger', html).each(function() {
    arrGreedFear.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrGreedFear)
}