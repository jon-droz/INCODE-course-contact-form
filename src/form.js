/*eslint-disable*/
const form = document.querySelector("form");
const textareaValid = document.querySelector("textarea");
const inputName = form.querySelector("input[name=name]")
const inputSurname = form.querySelector("input[name=surname]")
const inputPhone = form.querySelector("input[name=phone]")
const inputEmail = form.querySelector("input[name=email]")
const textareaMessage = form.querySelector("textarea[name=message]")

form.setAttribute("novalidate", true);

const phoneRegex = /^(\+)?(\d{2})?\s?\d{3}[ -]?\d{3}[ -]?\d{3}$/
const emailRegex = /^[a-zA-Z1-9-_+.]+@[a-zA-Z1-9-_\.]+\.[a-zA-Z]+$/

const modal = document.querySelector("#modal")
const closeModalButton = document.querySelector("#close-button")

function showModal () {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

closeModalButton.addEventListener("click", closeModal)

function validation (event) {
    event.preventDefault()
    
    if(inputName.value.length < 1) {
        console.log("Error name");
    } else if(inputSurname.value.length <1) {
        console.log("Error surname");
    } else if (inputPhone.value !== "" && !phoneRegex.test(inputPhone.value)) {
        console.log("Error phone")
    } else if (!emailRegex.test(inputEmail.value)) {
        console.log("Error mail");
    } else if (textareaMessage.value.length < 3) {
        console.log("error message");
    } else {
        //form.submit();
        showModal();
        console.log(`Name: ${inputName.value}
                     Surname: ${inputSurname.value}
                     Phone: ${inputPhone.value}
                     Email: ${inputEmail.value}
                     Message: ${textareaMessage.value}
                     `);
    }
    }

form.addEventListener("submit", validation);

// form.addEventListener("submit", v => {
//     v.preventDefault()
// console.log("testowe wywołaine z funkcją strzałkową");
// });
