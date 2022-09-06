async function superAdminlogin789546() {
  try {
    let res = await fetch(
      "https://masai-server.herokuapp.com/superAdminLoginData"
    );
    users = await res.json();
    // console.log(users);
    findUserData(users, "superadmin");
  } catch (err) {
    console.log(err);
  }
}

async function adminlogin789546() {
  try {
    let res = await fetch("https://masai-server.herokuapp.com/adminLoginData");
    users = await res.json();
    // console.log(users);
    findUserData(users, "admin");
  } catch (err) {
    console.log(err);
  }
}

function findUserData(users, typeOfUser) {
  let userName = document.getElementById("logName").value;
  let userPass = document.getElementById("logPass").value;
  let UserLoginOrNOt = false;
  users.forEach((ele) => {
    // console.log(ele)
    if (ele.userName === userName && ele.password === userPass) {
      UserLoginOrNOt = true;
      let myuserpasscode = [ele.id, ele.userLogID];
      localStorage.setItem("myuserpasscode", JSON.stringify(myuserpasscode));
    }
  });

  if (UserLoginOrNOt) {
    alert("login successful");
    if (typeOfUser == "admin") {
      window.open("./dashbord.html", "_self");
    } else {
      window.open("./dashbord.html", "_self");
    }
  } else {
    alert("wrong credentials");
  }

  userName.value = "";
  userPass.value = "";
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
