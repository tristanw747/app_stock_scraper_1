"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urlUnemployment = 'https://www.bls.gov/cps/';
export let arrUnemployment = [];
export async function afuncUnemployment(url) {
  arrUnemployment = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  try{
  let $ = load(html);
  
  // $('.highlight-box-green', html).each(function() {
    $('#home-latest-news-release > div:nth-child(2) > span > a', html).each(function() {


    arrUnemployment.push($(this).text())
  })
} catch(e){
  console.log(e)
}
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrUnemployment)
}