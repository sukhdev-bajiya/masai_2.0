function profileOptionsShowFun() {
  document.getElementById("profile-container").style.display = "block";
  setTimeout(() => {
    document.getElementById("profile-container").style.display = "none";
  }, 2000);
}

setInterval(() => {
  document.querySelector(".seeTimeNow").innerHTML = new Date();
}, 1000);

let flagDashbordP = JSON.parse(localStorage.getItem("myuserpasscode"));

let tableBody = document.querySelectorAll("tbody");
// =================================================
// =================================================
// updatepassword
// =================================================
// =================================================

async function updatepassworduserfun() {
  try {
    let mycheck = flagDashbordP[1].slice(0, 3);
    let url;
    if (mycheck === "SAU") {
      url = `https://jsonserver-twny.onrender.com/superAdminLoginData/${flagDashbordP[0]}`;
    } else if (mycheck === "MAU") {
      url = `https://jsonserver-twny.onrender.com/adminLoginData/${flagDashbordP[0]}`;
    } else {
      url = `https://jsonserver-twny.onrender.com/studentLoginData/${flagDashbordP[0]}`;
    }
    let res = await fetch(url);
    users = await res.json();

    let oldpass = document.getElementById("oldpasscheck");
    let newpass = document.getElementById("newpasscheck");
    let cnewpass = document.getElementById("cnewpasscheck");

    if (oldpass.value == users.password) {
      if (newpass.value == cnewpass.value) {
        updatepassword(newpass.value);
      } else {
        alert("Enter same password");
      }
    } else {
      alert("Enter correct password");
    }
  } catch (err) {
    console.log(err);
  }
}

function updatepassword(newpass) {
  let mycheck = flagDashbordP[1].slice(0, 3);
  let url;
  if (mycheck === "SAU") {
    url = `https://jsonserver-twny.onrender.com/superAdminLoginData/${flagDashbordP[0]}`;
  } else if (mycheck === "MAU") {
    url = `https://jsonserver-twny.onrender.com/adminLoginData/${flagDashbordP[0]}`;
  } else {
    url = `https://jsonserver-twny.onrender.com/studentLoginData/${flagDashbordP[0]}`;
  }

  fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      password: newpass,
    }),
    headers: { "Content-Type": "application/json" },
  });
  alert("Password update successful");
}

// =================================================
// =================================================
// updateprofiledata
// =================================================
// =================================================

function updateprofiledata() {
  let mycheck = flagDashbordP[1].slice(0, 3);
  let url;
  if (mycheck === "SAU") {
    url = `https://jsonserver-twny.onrender.com/superAdminLoginData/${flagDashbordP[0]}`;
  } else if (mycheck === "MAU") {
    url = `https://jsonserver-twny.onrender.com/adminLoginData/${flagDashbordP[0]}`;
  } else {
    url = `https://jsonserver-twny.onrender.com/studentLoginData/${flagDashbordP[0]}`;
  }

  fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      name: document.getElementById("name").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
      dateOfBirth: document.getElementById("dateOfBirth").value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  alert("Profile update successful");
}

// =================================================================
// =================================================================
// displayuserprofile
// =================================================================
// =================================================================

displayuserprofile();
async function displayuserprofile() {
  let mycheck = flagDashbordP[1].slice(0, 3);
  let url;
  if (mycheck === "SAU") {
    url = `https://jsonserver-twny.onrender.com/superAdminLoginData/${flagDashbordP[0]}`;
  } else if (mycheck === "MAU") {
    url = `https://jsonserver-twny.onrender.com/adminLoginData/${flagDashbordP[0]}`;
  } else {
    url = `https://jsonserver-twny.onrender.com/studentLoginData/${flagDashbordP[0]}`;
  }
  let user;
  try {
    let res = await fetch(url);
    user = await res.json();
  } catch (error) {
    console.log(error);
  }

  let data = `
  <img src="../assist/images/profile.png" class="userprofilepicoption"/>
  <p>Name : <b>${user.name}</b></p>
  <p>Email : <b>${user.email}</b></p>
  <p>Mobile Number : <b>${user.phone}</b></p>
  <p>DOB : <b>${user.dateOfBirth}</b></p>
  <p>User Log Id : <b>${user.userLogID}</b></p>
  <p>Gender : <b>${user.gender}</b></p>
  <p>Address : <b>${user.address}</b></p>     
`;
  document.querySelector("#viewProfileData").innerHTML = data;
}
