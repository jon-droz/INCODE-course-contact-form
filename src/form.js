const form = document.querySelector('form');
const inputName = form.querySelector('input[name=name]');
const inputSurname = form.querySelector('input[name=surname]');
const inputPhone = form.querySelector('input[name=phone]');
const inputEmail = form.querySelector('input[name=email]');
const textareaMessage = form.querySelector('textarea[name=message]');

form.setAttribute('novalidate', true);

const phoneRegex = /^(\+)?(\d{2})?\s?\d{3}[ -]?\d{3}[ -]?\d{3}$/;
const emailRegex = /^[a-zA-Z1-9-_+.]+@[a-zA-Z1-9-_.]+\.[a-zA-Z]+$/;

const errorMessage = document.createElement('div');
errorMessage.className = 'errorMessage';
errorMessage.style.margin = '40px 0';
errorMessage.style.fontWeight = 'bold';
form.append(errorMessage);

const modal = document.querySelector('#modal');
const closeModalButton = document.querySelector('#close-button');

function showModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  form.submit();
}

closeModalButton.addEventListener('click', closeModal);

function validation(event) {
  event.preventDefault();

  const errorMessages = [];

  if (inputName.value.length < 1) {
    errorMessages.push('nom');
  }
  if (inputSurname.value.length < 1) {
    errorMessages.push('prenom');
  }
  if (inputPhone.value !== '' && !phoneRegex.test(inputPhone.value)) {
    errorMessages.push('telephone');
  }
  if (!emailRegex.test(inputEmail.value)) {
    errorMessages.push('adresse mail');
  }
  if (textareaMessage.value.length < 3) {
    errorMessages.push('message');
  }

  if (errorMessages.length > 0) {
    errorMessage.innerHTML = `Les données saisies sont incorrectes ou incomplètes (${errorMessages.join(', ')}).`;
  } else {
    showModal();
    const userData = {
      Name: inputName.value,
      Surname: inputSurname.value,
      Phone: inputPhone.value,
      Email: inputEmail.value,
      Message: textareaMessage.value,
    };
    console.log(userData);
  }
}

form.addEventListener('submit', validation);
