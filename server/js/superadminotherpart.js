dishplayallDataSuFun();

async function dishplayallDataSuFun() {
  try {
    let res = await fetch("http://localhost:3000/superAdminLoginData/1");
    allData = await res.json();
    document.getElementById("usernameDisplayOption").innerHTML = users.name;
  } catch (err2) {
    console.log(err2);
  }
}

function openButton(val) {
  document.querySelector(".viewProfileSection").style.display = "none";
  document.querySelector(".updateProfileSection").style.display = "none";
  document.querySelector(".updatePasswordSection").style.display = "none";
  document.querySelector(".creatAdminSection").style.display = "none";
  document.querySelector(".creatStudentSection").style.display = "none";
  document.querySelector(".creatCouresLectureSection").style.display = "none";
  document.querySelector(".creatCouresSection").style.display = "none";
  document.querySelector(val).style.display = "block";
}

function closeButton(val) {
  document.querySelector(val).style.display = "none";
}

let tableBodySupAdminpart = document.querySelectorAll("tbody");
// =================================================
// =================================================
// creatAdminUser
// =================================================
// =================================================
async function creatAdminUser() {
  try {
    let res = await fetch("http://localhost:3000/adminLoginData");
    users = await res.json();
    addAdminUserData(users);
  } catch (err) {
    console.log(err);
  }
}
function addAdminUserData(alreadUserList) {
  let name = document.getElementById("CADname").value;
  let userName = document.getElementById("CADuserName").value;
  let password = document.getElementById("CADpassword").value;
  let email = document.getElementById("CADemail").value;
  let number = document.getElementById("CADnumber").value;
  let gender = document.getElementById("CADgender").value;
  let dateOfBirth = document.getElementById("CADdateOfBirth").value;
  let address = document.getElementById("CADaddress").value;
  let userLogID = `MAU_${Date.now()}`;

  let UserLoginOrNOt = false;
  alreadUserList.forEach((ele) => {
    if (ele.email == email || ele.phone == number || ele.userName == userName) {
      UserLoginOrNOt = true;
    }
  });

  if (UserLoginOrNOt) {
    alert("User Already Exists");
  } else {
    fetch("http://localhost:3000/adminLoginData", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        userName: userName,
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
    creatAdminUserShowList();
    alert("Add member successfully");
  }
}

creatAdminUserShowList();
async function creatAdminUserShowList() {
  try {
    let res = await fetch("http://localhost:3000/adminLoginData");
    let users = await res.json();
    dataTableAdminListFun(users);
  } catch (err) {
    console.log(err);
  }
}

function dataTableAdminListFun(users) {
  tableBodySupAdminpart[0].innerHTML = "";
  users.forEach((ele) => {
    let val = `
        <td>${ele.id}</td>
        <td>${ele.name}</td>
        <td>${ele.phone}</td>
        <td>${ele.email}</td>
        <td>${ele.dateOfBirth}</td>
        <td><p onclick="dataTableAdminListRemove('${ele.id}')">Remove</p></td>
        `;
    let tr = document.createElement("tr");
    tr.innerHTML = val;
    tableBodySupAdminpart[0].append(tr);
  });
}

function dataTableAdminListRemove(id) {
  fetch(`http://localhost:3000/adminLoginData/${id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });
}

// =================================================
// =================================================
// creatStudentUser
// =================================================
// =================================================

async function creatStudentUser() {
  try {
    let res = await fetch("http://localhost:3000/studentLoginData");
    users = await res.json();
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
  tableBodySupAdminpart[1].innerHTML = "";
  users.forEach((ele) => {
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
    tableBodySupAdminpart[1].append(tr);
  });
}
function dataTableStudentListRemove(id) {
  fetch(`http://localhost:3000/studentLoginData/${id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });
}

async function creatCouresFun() {
  try {
    let res = await fetch("http://localhost:3000/coures");
    let user = await res.json();
    creatCouresFunByOWN(user);
  } catch (err) {
    console.log(err);
  }
}

function creatCouresFunByOWN(user) {
  let coursesName = document.getElementById("NCname").value;
  let coursesFees = document.getElementById("CFreat").value;
  let coursesAbout = document.getElementById("ACdis").value;
  let coursesLecture = [];
  if (coursesName != "" && coursesFees != "" && coursesAbout != "") {
    let listOrNOt = false;
    user.forEach((ele) => {
      if (ele.coursesName === coursesName) {
        listOrNOt = true;
      }
    });
    if (listOrNOt) {
      alert("Coures Already Exists");
    } else {
      fetch("http://localhost:3000/coures", {
        method: "POST",
        body: JSON.stringify({
          coursesName: coursesName,
          coursesFees: coursesFees,
          coursesAbout: coursesAbout,
          coursesLecture: coursesLecture,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    alert("Enter Course Data");
  }
}

creatcouresUserShowList();
async function creatcouresUserShowList() {
  try {
    let res = await fetch("http://localhost:3000/coures");
    let users = await res.json();
    dataTablecouresListFun(users);
  } catch (err) {
    console.log(err);
  }
}

function dataTablecouresListFun(users) {
  tableBodySupAdminpart[2].innerHTML = "";
  users.forEach((ele) => {
    let val = `
        <td>${ele.id}</td>
        <td>${ele.coursesName}</td>
        <td>${ele.coursesFees}</td>
        <td>${ele.coursesAbout}</td>
        <td><p onclick="dataTableCouresListRemove('${ele.id}')">Remove</p></td>
        `;
    let tr = document.createElement("tr");
    tr.innerHTML = val;
    tableBodySupAdminpart[2].append(tr);
    let optionSet = document.createElement("option");
    optionSet.setAttribute("value", `${ele.id}`);
    optionSet.innerText = ele.coursesName;
    document.getElementById("selectCoursesOption").append(optionSet);
  });
}

function dataTableCouresListRemove(id) {
  fetch(`http://localhost:3000/coures/${id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });
}

async function creatcouresLectureUserShowList() {
  try {
    let id = document.getElementById("selectCoursesOption").value;
    if (id != "") {
      let res = await fetch(`http://localhost:3000/coures/${id}`);
      let users = await res.json();
      dataTablecouresLectureListFun(users.coursesLecture);
    } else {
      alert("Select Coures");
    }
  } catch (err) {
    console.log(err);
  }
}

function dataTablecouresLectureListFun(users) {
  let id = document.getElementById("selectCoursesOption").value;
  let lectureName = document.getElementById("NCLname").value;
  let lectureUrl = document.getElementById("CLUreat").value;
  let lectureAdout = document.getElementById("CLDdis").value;
  if (id != "" && lectureName != "" && lectureUrl != "") {
    let obj = {
      lectureName: lectureName,
      lectureUrl: lectureUrl,
      lectureAdout: lectureAdout,
      id: Date.now(),
    };

    users.push(obj);
    fetch(`http://localhost:3000/coures/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        coursesLecture: users,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    alert("Enter Lecture Data");
  }
}

dishPlaycreatcouresLectureUserShowList();
async function dishPlaycreatcouresLectureUserShowList() {
  try {
    let res = await fetch(`http://localhost:3000/coures`);
    let users = await res.json();
    dishPlaydataTablecouresLectureListFun(users);
  } catch (err) {
    console.log(err);
  }
}

function dishPlaydataTablecouresLectureListFun(users) {
  tableBodySupAdminpart[3].innerHTML = "";
  users.forEach((obj) => {
    obj.coursesLecture.forEach((ele) => {
      let val = `
          <td>${ele.id}</td>
          <td>${ele.lectureName}</td>
          <td>${ele.lectureUrl}</td>
          <td>${ele.lectureAdout}</td>
          <td>${obj.coursesName}</td>
          <td><p onclick="dataTableCouresLectureListRemove('${ele.id}')">Remove</p></td>
          `;
      let tr = document.createElement("tr");
      tr.innerHTML = val;
      tableBodySupAdminpart[3].append(tr);
    });
  });
}

async function dataTableCouresLectureListRemove(id) {
  try {
    let res = await fetch(`http://localhost:3000/coures`);
    let users = await res.json();
    dataTableCouresLectureListRemoveFunbyDFun(users, id);
  } catch (err) {
    console.log(err);
  }
}

function dataTableCouresLectureListRemoveFunbyDFun(user, id) {
  let objId;
  let eleInd;
  user.forEach((obj) => {
    obj.coursesLecture.forEach((ele, ind) => {
      if (ele.id == id) {
        objId = obj.id;
        eleInd = ind;
      }
    });
  });
  console.log(objId, eleInd);

  tableCouresLectureListRemoveFunbyDFun(objId, eleInd);
}
async function tableCouresLectureListRemoveFunbyDFun(objId, eleInd) {
  try {
    let res = await fetch(`http://localhost:3000/coures/${objId}`);
    let users = await res.json();

    let newArr = users.coursesLecture;
    console.log(newArr);
    newArr.splice(eleInd, 1);
    console.log(newArr);
    fetch(`http://localhost:3000/coures/${objId}`, {
      method: "PATCH",
      body: JSON.stringify({
        coursesLecture: newArr,
      }),
      headers: { "Content-Type": "application/json" },
    });

    dishPlaycreatcouresLectureUserShowList();
  } catch (error) {
    console.log(error);
  }
}
