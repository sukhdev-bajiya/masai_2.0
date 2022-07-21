console.log("Hello")

// let flagDashbordPadminanfsu = JSON.parse(localStorage.getItem("myuserpasscode"));

// let tableBodySupAdminpart454 = document.querySelectorAll("tbody");

// // =================================================
// // =================================================
// // creatAdminUser
// // =================================================
// // =================================================
// async function creatAdminUser() {
//   try {
//     let res = await fetch("http://localhost:3000/adminLoginData");
//     users = await res.json();
//     // console.log(users);
//     addAdminUserData(users);
//   } catch (err) {
//     console.log(err);
//   }
// }
// function addAdminUserData(alreadUserList) {
//   let name = document.getElementById("CADname").value;
//   let userName = document.getElementById("CADuserName").value;
//   let password = document.getElementById("CADpassword").value;
//   let email = document.getElementById("CADemail").value;
//   let number = document.getElementById("CADnumber").value;
//   let gender = document.getElementById("CADgender").value;
//   let dateOfBirth = document.getElementById("CADdateOfBirth").value;
//   let address = document.getElementById("CADaddress").value;
//   let userLogID = `MAU_${Date.now()}`;

//   let UserLoginOrNOt = false;
//   alreadUserList.forEach((ele) => {
//     console.log(ele);
//     if (ele.email == email || ele.phone == number || ele.userName == userName) {
//       UserLoginOrNOt = true;
//     }
//   });

//   if (UserLoginOrNOt) {
//     alert("User Already Exists");
//   } else {
//     fetch("http://localhost:3000/adminLoginData", {
//       method: "POST",
//       body: JSON.stringify({
//         name: name,
//         userName: userName,
//         password: password,
//         email: email,
//         phone: number,
//         gender: gender,
//         address: address,
//         dateOfBirth: dateOfBirth,
//         userLogID: userLogID,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     creatAdminUserShowList();
//     alert("Add member successfully");
//   }
// }

// creatAdminUserShowList();
// async function creatAdminUserShowList() {
//   try {
//     let res = await fetch("http://localhost:3000/adminLoginData");
//     let users = await res.json();
//     dataTableAdminListFun(users);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function dataTableAdminListFun(users) {
//   // console.log(users)
//   tableBodySupAdminpart454[0] = "";
//   users.forEach((ele) => {
//     // console.log(ele);
//     let val = `
//         <td>${ele.id}</td>
//         <td>${ele.name}</td>
//         <td>${ele.phone}</td>
//         <td>${ele.email}</td>
//         <td>${ele.dateOfBirth}</td>
//         <td><p onclick="dataTableAdminListRemove('${ele.id}')">Remove</p></td>
//         `;
//     let tr = document.createElement("tr");
//     tr.innerHTML = val;
//     tableBodySupAdminpart454[0].append(tr);
//   });
// }

// function dataTableAdminListRemove(id) {
//   fetch(`http://localhost:3000/adminLoginData/${id}`, {
//     method: "DELETE",
//     body: JSON.stringify({}),
//     headers: { "Content-Type": "application/json" },
//   });
// }

// // =================================================
// // =================================================
// // creatStudentUser
// // =================================================
// // =================================================

// async function creatStudentUser() {
//   try {
//     let res = await fetch("http://localhost:3000/studentLoginData");
//     users = await res.json();
//     // console.log(users);
//     addStudentUserData(users);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function addStudentUserData(alreadUserList) {
//   let name = document.getElementById("MSAname").value;
//   let password = document.getElementById("MSApassword").value;
//   let email = document.getElementById("MSAemail").value;
//   let number = document.getElementById("MSAnumber").value;
//   let gender = document.getElementById("MSAgender").value;
//   let dateOfBirth = document.getElementById("MSAdateOfBirth").value;
//   let address = document.getElementById("MSAaddress").value;
//   let userLogID = `MSU_${Date.now()}`;

//   let UserLoginOrNOt = false;
//   alreadUserList.forEach((ele) => {
//     // console.log(ele)
//     if (ele.email === email || ele.phone === number) {
//       UserLoginOrNOt = true;
//     }
//   });

//   if (UserLoginOrNOt) {
//     alert("User Already Exists");
//   } else {
//     fetch("http://localhost:3000/studentLoginData", {
//       method: "POST",
//       body: JSON.stringify({
//         name: name,
//         password: password,
//         email: email,
//         phone: number,
//         gender: gender,
//         address: address,
//         dateOfBirth: dateOfBirth,
//         userLogID: userLogID,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     creatStudentUserShowList();
//     alert("Add member successfully");
//   }
// }

// creatStudentUserShowList();
// async function creatStudentUserShowList() {
//   try {
//     let res = await fetch("http://localhost:3000/studentLoginData");
//     let users = await res.json();
//     dataTableStudentListFun(users);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function dataTableStudentListFun(users) {
//   // console.log(users)
//   tableBodySupAdminpart454[1].innerHTML = "";
//   users.forEach((ele) => {
//     // console.log(ele);
//     let val = `
//         <td>${ele.id}</td>
//         <td>${ele.name}</td>
//         <td>${ele.phone}</td>
//         <td>${ele.email}</td>
//         <td>${ele.dateOfBirth}</td>
//         <td><p onclick="dataTableStudentListRemove('${ele.id}')">Remove</p></td>
//         `;
//     let tr = document.createElement("tr");
//     tr.innerHTML = val;
//     tableBodySupAdminpart454[1].append(tr);
//   });
// }
// function dataTableStudentListRemove(id) {
//   fetch(`http://localhost:3000/studentLoginData/${id}`, {
//     method: "DELETE",
//     body: JSON.stringify({}),
//     headers: { "Content-Type": "application/json" },
//   });
// }

