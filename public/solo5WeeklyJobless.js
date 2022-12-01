"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlWeeklyJobless = 'https://tradingeconomics.com/united-states/jobless-claims';
export let arrWeeklyJobless = [];
export async function afuncWeeklyJobless(url) {
  arrWeeklyJobless = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.tab-content.te-tab-content', html).each(function() {
    arrWeeklyJobless.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrWeeklyJobless)
}