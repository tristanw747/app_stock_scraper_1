"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";

export const urlCNBC = 'https://www.cnbc.com/latest/';
export let arrCNBC = [];
export async function afuncCNBC (url) {
  arrCNBC = [];
  let response = await fetch(url);
  let html = await response.text();
  let $ = load(html);
  $(".Card-title", html).each(function () {
    let title = $(this).text();
    arrCNBC.push(title)
  })
 
}