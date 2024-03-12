import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyByVMZ4eBrPZEPP3AG08A5JecUmimsuGf8",
  authDomain: "bsed-math-628a0.firebaseapp.com",
  projectId: "bsed-math-628a0",
  storageBucket: "bsed-math-628a0.appspot.com",
  messagingSenderId: "992114594215",
  appId: "1:992114594215:web:7e841cf3ff189b67a4e682",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function sanitizeEmail(email) {
  return email.replace(/[.#$[\]]/g, "_");
}

document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = sanitizeEmail(document.getElementById("email").value);
    const password = document.getElementById("password").value;

    try {
      const snapshot = await get(child(ref(db), `users/${email}`));

      const users = snapshot.val();

      const userEmail = users.email;
      const userPassword = users.password;

      if (
        userEmail &&
        userEmail.toLowerCase() === email.toLowerCase() &&
        userPassword === password
      ) {
        localStorage.setItem("currentUserEmail", userEmail);
        window.location.href = "HTML/main.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  });
