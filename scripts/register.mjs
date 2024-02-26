import {
  generateOtp,
  getLocalStorage,
  keys,
  redirectToIndex,
  sendOtp,
  setLocalStorage,
} from "./helpers.mjs";
import { UserAuth } from "./modules/userModules.mjs";

const inputName = document.querySelector(".user-name");
const inputEmail = document.querySelector(".user-email");
const inputPassword = document.querySelector(".user-password");
const btnGetOtp = document.querySelector(".btn-get-otp");
const inputOtp = document.querySelector(".user-otp");

let currentUser = getLocalStorage(keys.CURRENT_USER);
if (currentUser) redirectToIndex();

const userAuth = new UserAuth();
currentUser = null;
let otp = null;

(function () {
  emailjs.init({
    publicKey: "ncD_lPd3l5AXg9fSl",
  });
})();

function getOtp(e) {
  e.preventDefault();
  const name = inputName.value;
  const email = inputEmail.value;
  const password = inputPassword.value;

  const result = userAuth.validateUser({ name, email, password });
  if (result instanceof Error) {
    alert(result.message);
    return;
  }

  currentUser = result;
  otp = getLocalStorage(keys.OTP);
  if (!otp) {
    otp = generateOtp();
    setLocalStorage(keys.OTP, otp);
  }

  sendOtp(emailjs, "Alok", email, `Your otp to register in the app is: ${otp}`);
}

function registerUser(e) {
  e.preventDefault();

  const enteredOtp = inputOtp.value;
  if (otp !== enteredOtp) {
    alert("Otp is not valid");
    return;
  }

  userAuth.saveUser(currentUser);
  inputName.value =
    inputEmail.value =
    inputPassword.value =
    inputOtp.value =
      "";

  setLocalStorage(keys.CURRENT_USER, currentUser);
  redirectToIndex();
}

btnGetOtp.addEventListener("click", getOtp);
form.addEventListener("submit", registerUser);
