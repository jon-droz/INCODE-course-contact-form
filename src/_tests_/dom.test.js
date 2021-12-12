/*eslint-disable*/

/**
 * @jest-environment jsdom
 */
const fs = require('fs')
const html = fs.readFileSync('./src/contact.html');
const { JSDOM } = require('jsdom');
//const page = new JSDOM(html)

let dom;
beforeEach(async function() {
  dom = await JSDOM.fromFile('./src/contact.html', {
    resources: 'usable',
    runScripts: 'dangerously'
  });

  await new Promise((resolve) =>
    dom.window.addEventListener('load', resolve)
  );
});

describe("jsdom environment", () => {
    test("input field exists", () => {
        expect(dom.window.document.getElementById('name')).toBeTruthy()
    })
});

describe("submit form validation", () => {
    test("button submit works", () => {
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('errorMessage')[0].innerHTML).toEqual("Les données saisies sont incorrectes ou incomplètes (nom, prenom, adresse mail, message).")
     
    })
});