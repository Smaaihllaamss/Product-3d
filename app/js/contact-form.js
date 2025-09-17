'use strict';

const userForm = document.forms['user-form'];
const userFormElements = userForm.elements;
const userFormInputs = userForm.querySelectorAll('.input__control');

// Adding focus/blur event handlers to input fields
for (let input of userFormInputs) {
  input.addEventListener('focus', inputFocusHandler);
  input.addEventListener('blur', inputBlurHandler);
}

// Event handlers focus/blur
function inputFocusHandler() {
  clearInput(this);
}

function clearInput(input) {
  input.classList.remove('is-valid', 'is-invalid');
  const inputFeedbackElement = input
    .closest('div')
    .querySelector('.validation-feedback');
  inputFeedbackElement.classList.remove('valid-feedback', 'invalid-feedback');
  inputFeedbackElement.textContent = '';
}

function inputBlurHandler() {
  switch (this.id) {
    case 'userName':
      validateName(this);
      break;
    case 'userEmail':
      validateEmail(this);
      break;
    case 'userPhone':
      validatePhone(this);
      break;
    case 'comment':
      validateComment(this);
      break;
  }
}

//Field validation
function validateName(nameInput) {
  const name = nameInput.value;
  if (name.match(/^[a-zа-яё\s\-]{2,60}$/i)) {
    markValide(nameInput);
    return true;
  } else {
    markInvalid(nameInput, 'Enter the valid name.');
    return false;
  }
}

function validateEmail(emailInput) {
  const email = emailInput.value;
  if (email.match(/^[-.\w]+@([\w-]+\.)+[\w-]+$/i)) {
    markValide(emailInput);
    return true;
  } else {
    markInvalid(emailInput, 'Enter the valid email.');
    return false;
  }
}

function validatePhone(phoneInput) {
  const phone = phoneInput.value;
  if (
    phone.match(
      /^\+\d{1,3}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/
    )
  ) {
    markValide(phoneInput);
    return true;
  } else {
    markInvalid(
      phoneInput,
      'Enter the phone number in international format: +370 (8x) xxx-xx-xx.'
    );
    return false;
  }
}

function validateComment(commentInput) {
  const comment = commentInput.value;
  if (comment.match(/^[\wа-яё\d\s\-\.]{10,500}$/i)) {
    markValide(commentInput);
    return true;
  } else {
    markInvalid(
      commentInput,
      'Describe your project in 500 characters or less.'
    );
    return false;
  }
}

function markValide(inputElement, feedbackMessage = 'Looks good!') {
  inputElement.classList.add('is-valid');
  const inputFeedbackElement = inputElement
    .closest('div')
    .querySelector('.validation-feedback');
  inputFeedbackElement.classList.add('valid-feedback');
  inputFeedbackElement.textContent = feedbackMessage;
}

function markInvalid(inputElement, feedbackMessage = 'Invalid data!') {
  inputElement.classList.add('is-invalid');
  const inputFeedbackElement = inputElement
    .closest('div')
    .querySelector('.validation-feedback');
  inputFeedbackElement.classList.add('invalid-feedback');
  inputFeedbackElement.textContent = feedbackMessage;
}

//Form submit handler
userForm.onsubmit = function (event) {
  event.preventDefault();
  if (
    validateName(this.userName) &&
    validateEmail(this.userEmail) &&
    validatePhone(this.userPhone) &&
    validateComment(this.comment)
  ) {
    // this.submit();
    clearForm(this);
    showSuccessSubmitFeedback(this);
  }
};

function showSuccessSubmitFeedback(
  submitElement,
  feedbackMessage = 'Your request has been successfully sent to the server.'
) {
  const submitFeedbackElement = submitElement.querySelector('.submit-feedback');
  submitFeedbackElement.classList.add('success-feedback', 'show');
  submitFeedbackElement.textContent = feedbackMessage;
  setTimeout(() => {
    submitFeedbackElement.classList.remove('show');
  }, 5000);
}

function clearForm(form) {
  userFormInputs.forEach((input) => {
    input.value = '';
    input.classList.remove('is-valid', 'is-invalid');
  });

  const inputFeedbackElements = form.querySelectorAll('.validation-feedback');
  inputFeedbackElements.forEach((feedback) => {
    feedback.classList.remove('valid-feedback', 'invalid-feedback');
    feedback.textContent = '';
  });
}
