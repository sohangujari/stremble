const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "stremble" && password === "iamsecret@08") {
        alert("You have successfully logged in.");
        location.href = "https://sohangujari.github.io/Stremble/home";
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

const togglePassword = 
document.querySelector('#togglePassword');
  
const password = document.querySelector('#password-field');

togglePassword.addEventListener('click', function (e) {

// Toggle the type attribute
const type = password.getAttribute(
    'type') === 'password' ? 'text' : 'password';
password.setAttribute('type', type);

// Toggle the eye slash icon
if (togglePassword.src.match(
"https://stremble.ml/image/eye-off.svg")) {
    togglePassword.src =
"https://stremble.ml/image/eye.svg";
} else {
    togglePassword.src =
"https://stremble.ml/image/eye-off.svg";
}
});
