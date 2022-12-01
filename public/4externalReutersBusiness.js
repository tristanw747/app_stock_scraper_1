"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlReutersBusiness = 'https://www.reuters.com/news/archive/businessNews';
export let arrReutersBusiness = [];
export async function afuncReutersBusiness (url) {
  arrReutersBusiness = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $('.story-title', html).each(function () {
    let title = $(this).text();
    arrReutersBusiness.push(title)
  })
  
}