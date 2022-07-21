let flag = JSON.parse(localStorage.getItem("myuserpasscode"));
if (flag == null || flag.length == 0 || flag == undefined) {
  window.open("./login.html", "_self");
}
checkuserloginornot();

// console.log(flag[1].slice(0, 3)=="SAU");
async function checkuserloginornot() {
  try {
    let mycheck = flag[1].slice(0, 3);
    let url;
    if (mycheck === "SAU") {
      url = `http://localhost:3000/superAdminLoginData/${flag[0]}`;
    } else if (mycheck === "MAU") {
      url = `http://localhost:3000/adminLoginData/${flag[0]}`;
    } else if (mycheck === "MSU"){
      url = `http://localhost:3000/studentLoginData/${flag[0]}`;
    }
    let res = await fetch(url);
    users = await res.json();
    if (users.userLogID != flag[1]) {
      window.open("./login.html", "_self");
    }
  } catch (err) {
    console.log(err);
  }
}
function logoutfunforall() {
  localStorage.clear();
  window.open("./login.html", "_self");
}
