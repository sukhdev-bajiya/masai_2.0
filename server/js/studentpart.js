let flagDashborStudentdP = JSON.parse(localStorage.getItem("myuserpasscode"));
profileupdateorNotcheck();
async function profileupdateorNotcheck() {
  try {
    let url = `http://localhost:3000/studentLoginData/${flagDashborStudentdP[0]}`;

    let res = await fetch(url);
    users = await res.json();
    // console.log(users);
    dishplayallDataSuFun(users);
    if (users.name == undefined || users.name == null || users.name == "") {
      document.querySelector(".updateProfileSection").style.display = "block";
    }
  } catch (err) {
    console.log(err);
  }
}
function dishplayallDataSuFun() {
  document.getElementById("usernameDisplayOption").innerHTML = users.name;
}

function openButton(val) {
  document.querySelector(".viewProfileSection").style.display = "none";
  document.querySelector(".updateProfileSection").style.display = "none";
  document.querySelector(".updatePasswordSection").style.display = "none";
  document.querySelector(val).style.display = "block";
}

function closeButton(val) {
  document.querySelector(val).style.display = "none";
}
