document.querySelector("form").addEventListener("submit", getMyDataFromApi);

async function getMyDataFromApi(event) {
  event.preventDefault();
  try {
    let res = await fetch(
      "https://jsonservermasai.herokuapp.com/studentLoginData"
    );
    users = await res.json();
    // console.log(users);
    findUserData(users);
  } catch (err) {
    console.log(err);
  }
}

function findUserData(users) {
  let userEmail = document.getElementById("logEmail").value;
  let userPass = document.getElementById("logPass").value;
  let UserLoginOrNOt = false;
  users.forEach((ele) => {
    // console.log(ele)
    if (ele.email === userEmail && ele.password === userPass) {
      UserLoginOrNOt = true;
      let myuserpasscode = [ele.id, ele.userLogID];
      localStorage.setItem("myuserpasscode", JSON.stringify(myuserpasscode));
    }
  });
  // users.filter(function (ele) {
  //   return ele.email === userEmail && ele.password === userPass;
  // });

  if (UserLoginOrNOt) {
    alert("login successful");
    setTimeout(() => {
      window.open("./dashbord.html", "_self");
    }, 500);
  } else {
    alert("wrong credentials");
  }

  logEmail.value = "";
  logPass.value = "";
}

function seePass() {
  var viz = document.getElementById("logPass");
  var img = document.getElementById("icon");
  if (viz.type === "password") {
    viz.type = "text";
    img.src = "../assist/images/eye-solid.svg";
  } else {
    viz.type = "password";
    img.src = "../assist/images/eye-slash-solid.svg";
  }
}
