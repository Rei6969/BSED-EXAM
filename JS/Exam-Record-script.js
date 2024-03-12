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

const currentUserEmail = localStorage.getItem("currentUserEmail");

if (currentUserEmail) {
  const dataRef = ref(db, `record/${currentUserEmail}`);

  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const tableBody = document.querySelector(".container table tbody");

        console.log("currentUserEmail", currentUserEmail);
        console.log("dataRef", dataRef);
        console.log("data", data);

        tableBody.innerHTML = "";

        Object.values(data).forEach((record) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${record.examLevel}</td>
            <td>${record.score}</td>
            <td>${record.grade}</td>
            <td>${record.dateTaken}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.log("No currentUserEmail available");
}
