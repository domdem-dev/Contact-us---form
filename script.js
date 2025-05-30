function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

//handle query
let query = "";
const options = document.querySelectorAll(".radio-option");
options.forEach((opt) => {
  opt.addEventListener("click", (e) => {
    e.preventDefault();
    //reset
    document
      .querySelectorAll(".active")
      .forEach((elm) => elm.classList.add("hidden"));
    document
      .querySelectorAll(".inactive")
      .forEach((elm) => elm.classList.remove("hidden"));
    //select
    opt.querySelector(".inactive").classList.add("hidden");
    opt.querySelector(".active").classList.remove("hidden");
    query = opt.dataset.value;
  });
});

//handle submit
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const fields = [
    {
      element: document.getElementById("fname"),
      isValid: () => document.getElementById("fname").value.trim() !== "",
    },
    {
      element: document.getElementById("lname"),
      isValid: () => document.getElementById("lname").value.trim() !== "",
    },
    {
      element: document.getElementById("message"),
      isValid: () => document.getElementById("message").value.trim() !== "",
    },
    {
      element: document.getElementById("consent"),
      isValid: () => document.getElementById("consent").checked,
    },
  ];

  let valid = true;

  //show all errors except query and email
  fields.forEach(({ element, isValid }) => {
  const error =
    element.querySelector(".errors") ||
    element.parentElement.querySelector(".errors");
  if (!isValid()) {
    if (error) error.classList.remove("invisible");
    valid = false;
  } else {
    if (error) error.classList.add("invisible");
  }
});

  // show query error
const queryError = document.getElementById("query-wrapper").querySelector(".errors");
if (!query) {
  queryError.classList.remove("invisible");
  valid = false;
} else {
  queryError.classList.add("invisible");
}

// show email errors
const email = document.getElementById("email");
const emptyEmailError = document.getElementById("empty-email");
const notValidEmailError = document.getElementById("not-valid-email");

if (!email.value) {
  emptyEmailError.classList.remove("invisible");
  notValidEmailError.classList.add("invisible");
  valid = false;
} else if (!isValidEmail(email.value)) {
  notValidEmailError.classList.remove("invisible");
  emptyEmailError.classList.add("invisible");
  valid = false;
} else {
  emptyEmailError.classList.add("invisible");
  notValidEmailError.classList.add("invisible");
}


  //show success
  const allErrors = document.querySelectorAll(".errors");
  let howManyErr = 0;
  allErrors.forEach((err) => {
    if (
      err.classList.contains("invisible") ||
      err.classList.contains("hidden")
    ) {
      return null;
    } else {
      howManyErr += 1;
    }
  });
  if ((howManyErr === 0)) {
    document.getElementById("success").classList.remove("hidden");

    //reset everything
    document.querySelector("form").reset();
    query = "";
    document
      .querySelectorAll(".active")
      .forEach((elm) => elm.classList.add("hidden"));
    document
      .querySelectorAll(".inactive")
      .forEach((elm) => elm.classList.remove("hidden"));
  }
      
  window.scroll(0, 0);
});
