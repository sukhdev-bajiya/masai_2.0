function openButton(val) {
  document.querySelector(".viewProfileSection").style.display = "none";
  document.querySelector(".updateProfileSection").style.display = "none";
  document.querySelector(".updatePasswordSection").style.display = "none";
  document.querySelector(".creatStudentSection").style.display = "none";
  document.querySelector(val).style.display = "block";
}

function closeButton(val) {
  document.querySelector(val).style.display = "none";
}
let tableBodyAdminpa = document.querySelector("tbody");

// =================================================
// =================================================
// creatStudentUser
// =================================================
// =================================================

async function creatStudentUser() {
  try {
    let res = await fetch("http://localhost:3000/studentLoginData");
    users = await res.json();
    // console.log(users);
    addStudentUserData(users);
  } catch (err) {
    console.log(err);
  }
}

function addStudentUserData(alreadUserList) {
  let name = document.getElementById("MSAname").value;
  let password = document.getElementById("MSApassword").value;
  let email = document.getElementById("MSAemail").value;
  let number = document.getElementById("MSAnumber").value;
  let gender = document.getElementById("MSAgender").value;
  let dateOfBirth = document.getElementById("MSAdateOfBirth").value;
  let address = document.getElementById("MSAaddress").value;
  let userLogID = `MSU_${Date.now()}`;

  let UserLoginOrNOt = false;
  alreadUserList.forEach((ele) => {
    // console.log(ele)
    if (ele.email === email || ele.phone === number) {
      UserLoginOrNOt = true;
    }
  });

  if (UserLoginOrNOt) {
    alert("User Already Exists");
  } else {
    fetch("http://localhost:3000/studentLoginData", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
        phone: number,
        gender: gender,
        address: address,
        dateOfBirth: dateOfBirth,
        userLogID: userLogID,
      }),
      headers: { "Content-Type": "application/json" },
    });
    creatStudentUserShowList();
    alert("Add member successfully");
  }
}

creatStudentUserShowList();
async function creatStudentUserShowList() {
  try {
    let res = await fetch("http://localhost:3000/studentLoginData");
    let users = await res.json();
    dataTableStudentListFun(users);
  } catch (err) {
    console.log(err);
  }
}

function dataTableStudentListFun(users) {
  // console.log(users)
  tableBodyAdminpa.innerHTML = "";
  users.forEach((ele) => {
    // console.log(ele);
    let val = `
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${ele.phone}</td>
        <td>${ele.email}</td>
        <td>${ele.dateOfBirth}</td>
        <td><p onclick="dataTableStudentListRemove('${ele.id}')">Remove</p></td>
        `;
    let tr = document.createElement("tr");
    tr.innerHTML = val;
    tableBodyAdminpa.append(tr);
  });
}
function dataTableStudentListRemove(id) {
  fetch(`http://localhost:3000/studentLoginData/${id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });
}


dishplayallDataSuFun();

async function dishplayallDataSuFun() {
  try {
    let res = await fetch(`http://localhost:3000/superAdminLoginData/${JSON.parse(localStorage.getItem("myuserpasscode"))[0]}`);
    allData = await res.json();
    // console.log(allData);
    document.getElementById("usernameDisplayOption").innerHTML=users.name;
  } catch (err2) {
    console.log(err2);
  }
}