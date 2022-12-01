"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlReleaseCPI = 'https://www.bls.gov/cpi/';
export let arrReleaseCPI = [];
export async function afuncReleaseCPI(url) {
  arrReleaseCPI = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.p', html).each(function() {
    arrReleaseCPI.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrReleaseCPI)
}