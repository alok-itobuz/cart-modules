export const keys = Object.freeze({
  OTP: "otp",
  USERS: "users",
  CURRENT_USER: "curr_user",
  WISHLIST: "wishlist",
  CART: "cart",
});

export function generateOtp() {
  let otp = "";
  for (let i = 1; i <= 6; i++) {
    otp += Math.trunc(Math.random() * 9) + 1;
  }
  return otp;
}

export async function sendOtp(emailjs, fromName, toEmail, message) {
  const emailParams = {
    from_name: fromName,
    to_email: toEmail,
    message: message,
  };

  try {
    const res = await emailjs.send(
      "service_udd6kie",
      "template_n0o6o2q",
      emailParams
    );
    console.log(res);
  } catch (error) {
    console.log("error", err);
  }
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function redirect(path, message) {
  message && alert(message);
  location.href = `${location.origin}/pages/${path}`;
}

export function redirectToIndex() {
  redirect("index.html");
}
export function redirectToLogin() {
  redirect("login.html");
}

export function createCustomizedElement(
  tagName,
  classNames,
  attributes,
  innerText
) {
  const elem = document.createElement(tagName);
  if (classNames) elem.classList.add(...classNames);
  attributes?.forEach((att) => {
    elem.setAttribute(att[0], att[1]);
  });
  if (innerText) elem.innerText = innerText;

  return elem;
}
