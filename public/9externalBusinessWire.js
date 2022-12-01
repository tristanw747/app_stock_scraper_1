"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlBusinessNewswire = 'https://www.businesswire.com/portal/site/home/news/';
export let arrBusinessNewswire = [];
export async function afuncBusinessNewswire(url) {
  arrBusinessNewswire = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.bwTitleLink', html).each(function () {
    let title = $(this).text();
    arrBusinessNewswire.push(title)
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrBusinessNewswire)
}