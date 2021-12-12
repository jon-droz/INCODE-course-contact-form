/*eslint-disable*/

/**
 * @jest-environment jsdom
 */
const fs = require('fs')
//const html = fs.readFileSync('./src/contact.html');
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

    test("name validation works", () => {
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('errorMessage')[0].innerHTML).toEqual("Les données saisies sont incorrectes ou incomplètes (nom).")
    })

    test("email validation works", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('email').value = 'johndoe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('errorMessage')[0].innerHTML).toEqual("Les données saisies sont incorrectes ou incomplètes (adresse mail).")
    })

    test("phone validation works - text", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('phone').value = 'Doe'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('errorMessage')[0].innerHTML).toEqual("Les données saisies sont incorrectes ou incomplètes (telephone).")
    })

    test("phone validation works - num pattern", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('phone').value = '45'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('errorMessage')[0].innerHTML).toEqual("Les données saisies sont incorrectes ou incomplètes (telephone).")
    })

    test("validation passed without phone input", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('modal')[0].style.display).toEqual('block')
    })

    test("modal display works", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('phone').value = '555 555 555'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
       expect(dom.window.document.getElementsByClassName('modal')[0].style.display).toEqual('block')
    })

    test("form submit works", () => {
        dom.window.document.getElementById('name').value = 'John'
        dom.window.document.getElementById('surname').value = 'Doe'
        dom.window.document.getElementById('email').value = 'john@doe.com'
        dom.window.document.getElementById('message').value = 'Great coffee'
        dom.window.document.getElementById('submitBtn').click()
        console.log(dom.window.document.getElementsByClassName('modal')[0].style.display);
        dom.window.document.getElementById('close-button').click()
        console.log(dom.window.document.getElementsByClassName('modal')[0].style.display);
        expect(dom.window.document.getElementsByClassName('modal')[0].style.display).toEqual('none')
    })
});