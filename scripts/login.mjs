import { UserAuth } from "./modules/userModules.mjs";
import {
  getLocalStorage,
  keys,
  redirectToIndex,
  setLocalStorage,
} from "./helpers.mjs";

const form = document.querySelector("form");
const inputEmail = document.querySelector(".user-email");
const inputPassword = document.querySelector(".user-password");

const userAuth = new UserAuth();
const currentUser = getLocalStorage(keys.CURRENT_USER);
if (currentUser) redirectToIndex();

function loginUser(e) {
  e.preventDefault();

  const email = inputEmail.value;
  const password = inputPassword.value;

  const user = userAuth.login({ email, password });

  if (user instanceof Error) return alert(user.message);

  setLocalStorage(keys.CURRENT_USER, user);
  redirectToIndex();
}

form.addEventListener("submit", loginUser);
