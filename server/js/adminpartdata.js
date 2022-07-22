function openButton(val) {
  document.querySelector(".viewProfileSection").style.display = "none";
  document.querySelector(".updateProfileSection").style.display = "none";
  document.querySelector(".updatePasswordSection").style.display = "none";
  document.querySelector(".creatStudentSection").style.display = "none";
  document.querySelector(".creatCouresLectureSection").style.display = "none";
  document.querySelector(val).style.display = "block";
}

function closeButton(val) {
  document.querySelector(val).style.display = "none";
}
let tableBodyAdminpa = document.querySelectorAll("tbody");

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
  tableBodyAdminpa[0].innerHTML = "";
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
    tableBodyAdminpa[0].append(tr);
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
  tableBodyAdminpa[1].innerHTML = "";
  users.forEach((obj) => {
    obj.coursesLecture.forEach((ele, ind) => {
      let val = `
          <td>${ele.id}</td>
          <td>${ele.lectureName}</td>
          <td>${ele.lectureUrl}</td>
          <td>${ele.lectureAdout}</td>
          <td>${obj.coursesName}</td>
          <td><p onclick="dataTableCouresLectureListRemove(${obj.id}, ${ind})">Remove</p></td>
          `;
      let tr = document.createElement("tr");
      tr.innerHTML = val;
      tableBodyAdminpa[1].append(tr);
    });
    let optionSet = document.createElement("option");
    optionSet.setAttribute("value", `${obj.id}`);
    optionSet.innerText = obj.coursesName;
    document.getElementById("selectCoursesOption").append(optionSet);
  });
}

async function dataTableCouresLectureListRemove(objId, eleInd) {
  try {
    let res = await fetch(`http://localhost:3000/coures/${objId}`);
    let users = await res.json();

    let newArr = users.coursesLecture;

    newArr.splice(eleInd, 1);

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