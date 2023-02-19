import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const STORAGE_INPUT_KEY = 'feedback-form-state';

function getFormData() {
  return { email: refs.email.value, message: refs.message.value };
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(getFormData());
  refs.email.value = '';
  refs.message.value = '';
  localStorage.removeItem(STORAGE_INPUT_KEY);
}

refs.form.addEventListener('submit', onFormSubmit);

function onInput() {
  localStorage.setItem(STORAGE_INPUT_KEY, JSON.stringify(getFormData()));
}

const updateStorage = throttle(onInput, 500);

refs.form.addEventListener('input', updateStorage);

function innitData() {
  const formData = localStorage.getItem(STORAGE_INPUT_KEY);
  if (formData) {
    const { email, message } = JSON.parse(formData);
    refs.email.value = email;
    refs.message.value = message;
  }
}

innitData();
