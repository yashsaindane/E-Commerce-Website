// For login
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("lusername").value;
    const password = document.getElementById("lpassword").value;

    // Send login data to the backend
    fetch("/login_sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, action: "login" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const messageElement = document.getElementById("lmessage");
        if (data.success) {
          messageElement.style.color = "green";
          window.location.href = "/home";
        } else {
          messageElement.style.color = "red";
        }
        messageElement.textContent = data.message;
      })
      .catch((error) => console.error("Error:", error));
  });

// For registration
document
  .getElementById("registration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("rusername").value;
    const password = document.getElementById("rpassword").value;

    // Send registration data to the backend
    fetch("/login_sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, action: "register" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const messageElement = document.getElementById("rmessage");
        if (data.success) {
          messageElement.style.color = "green";
        } else {
          messageElement.style.color = "red";
        }
        messageElement.textContent = data.message;
      })
      .catch((error) => console.error("Error:", error));
  });

/* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/

const time_to_show_login = 400;
const time_to_hidden_login = 200;

function change_to_login() {
  document.querySelector(".cont_forms").className =
    "cont_forms cont_forms_active_login";
  document.querySelector(".cont_form_login").style.display = "block";
  document.querySelector(".cont_form_sign_up").style.opacity = "0";

  setTimeout(function () {
    document.querySelector(".cont_form_login").style.opacity = "1";
  }, time_to_show_login);

  setTimeout(function () {
    document.querySelector(".cont_form_sign_up").style.display = "none";
  }, time_to_hidden_login);
}

const time_to_show_sign_up = 100;
const time_to_hidden_sign_up = 400;

function change_to_sign_up(at) {
  document.querySelector(".cont_forms").className =
    "cont_forms cont_forms_active_sign_up";
  document.querySelector(".cont_form_sign_up").style.display = "block";
  document.querySelector(".cont_form_login").style.opacity = "0";

  setTimeout(function () {
    document.querySelector(".cont_form_sign_up").style.opacity = "1";
  }, time_to_show_sign_up);

  setTimeout(function () {
    document.querySelector(".cont_form_login").style.display = "none";
  }, time_to_hidden_sign_up);
}

const time_to_hidden_all = 500;

function hidden_login_and_sign_up() {
  document.querySelector(".cont_forms").className = "cont_forms";
  document.querySelector(".cont_form_sign_up").style.opacity = "0";
  document.querySelector(".cont_form_login").style.opacity = "0";

  setTimeout(function () {
    document.querySelector(".cont_form_sign_up").style.display = "none";
    document.querySelector(".cont_form_login").style.display = "none";
  }, time_to_hidden_all);
}
