const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// functions
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

// check is the email is valid
const isValidEmail = (input) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

//  Capitalize the first string
const capitalizeFirstString = (input) => {
  return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
};

// check -> required
const checkRequired = (inputArr) => {
  inputArr.map((input) => {
    if (input.value.trim() === "") {
      showError(input, `${capitalizeFirstString(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// check -> input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalizeFirstString(input)} must be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalizeFirstString(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

//  Check password match
const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "passwords don't match");
  }
};

// event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 10);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordMatch(password, password2);
});
