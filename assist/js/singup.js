document.querySelector("form").addEventListener("submit", getMyDataFromApi);

async function getMyDataFromApi(event) {
  event.preventDefault();
  try {
    let res = await fetch(
      "https://jsonserver-twny.onrender.com/studentLoginData"
    );
    users = await res.json();
    // console.log(users);
    addUserData(users);
  } catch (err) {
    console.log(err);
  }
}

function addUserData(alreadUserList) {
  let userEmail = document.getElementById("email").value;
  let userNumber = document.getElementById("mobile").value;
  let userPass = document.getElementById("password").value;

  let UserLoginOrNOt = false;
  alreadUserList.forEach((ele) => {
    // console.log(ele)
    if (ele.email === userEmail || ele.phone === userNumber) {
      UserLoginOrNOt = true;
    }
  });

  if (UserLoginOrNOt) {
    alert("User Already Exists");
  } else {
    let userLog = `MSU_${Date.now()}`;
    fetch("https://jsonserver-twny.onrender.com/studentLoginData", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        phone: userNumber,
        password: userPass,
        userLogID: userLog,
      }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Signup successfully");
    setTimeout(() => {
      window.open("./login.html", "_self");
    }, 500);
  }

  email.value = "";
  mobile.value = "";
  password.value = "";
}

function seePass() {
  let viz = document.getElementById("password");
  let img = document.getElementById("icon");
  if (viz.type === "password") {
    viz.type = "text";
    img.src = "../assist/images/eye-solid.svg";
  } else {
    viz.type = "password";
    img.src = "../assist/images/eye-slash-solid.svg";
  }
}
