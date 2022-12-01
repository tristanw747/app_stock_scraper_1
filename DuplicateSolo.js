//index
import { afunctptp, urltptp, arrtptp } from './public/'


app.get("/tptp", async (req, res) => {
  await afunctptp(urltptp)
  res.send({ product1: arrtptp });
});


//main
afunctptpLoop()

//////////tptp//////////
let runCounttptp = 0;
let responseJsontptp;
async function afunctptpLoop() {
  let responsetptp = await fetch("/tptp");
  responseJsontptp = await responsetptp.json().catch(err => console.log("Notice from Developer: Incorrect server page url, check url directory. ", err));
  if (responseJsontptp.product1[0] === undefined) {
    document.querySelector("#tptpSendtoHTML1").innerHTML = "Error! Scraping Search Tag Not Found!"
  } else {
    document.querySelector("#tptpSendtoHTML1").innerHTML =responseJsontptp.product1
  }
}
//////////tptp//////////

//newfile
"use strict";
import { load } from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs/promises';

export const urltptp = '';
export let arrtptp = [];
export async function afunctptp(url) {
  arrtptp = [];
  let response = await fetch(url);
  let html = await response.text();
  // * uncomment below to check full HTML data
  // await fs.writeFile("troubleshootFullHTML.html", html)
  let $ = load(html);
  $('.', html).each(function() {
    arrtptp.push($(this).text())
  })
  // * uncomment below to check array data being sent
  // await fs.writeFile("troubleshootSentData.html", arrtptp)
}


//html
<h3>tptp<br>
    <span id="tptpSendtoHTML1"></span>
  </h3>