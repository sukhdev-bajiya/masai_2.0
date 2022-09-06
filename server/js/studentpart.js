setInterval(() => {
  checkUserOrNOt();
}, 2000);
checkUserOrNOt();
function checkUserOrNOt() {
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
      if (mycheck === "MSU") {
        url = `https://masai-server.herokuapp.com/studentLoginData/${flag[0]}`;
      } else {
        window.open("./login.html", "_self");
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
}

function logoutfunforall() {
  localStorage.clear();
  window.open("./login.html", "_self");
}
let flagDashborStudentdP = JSON.parse(localStorage.getItem("myuserpasscode"));
profileupdateorNotcheck();
async function profileupdateorNotcheck() {
  try {
    let url = `https://masai-server.herokuapp.com/studentLoginData/${flagDashborStudentdP[0]}`;

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
// ===================================================
// ===================================================
//  Tab open and close functions
// ===================================================
// ===================================================
function openButton(val) {
  document.querySelector(".viewProfileSection").style.display = "none";
  document.querySelector(".updateProfileSection").style.display = "none";
  document.querySelector(".masaipaymentGateway").style.display = "none";
  document.querySelector(".openCoursesvideoclassgroup").style.display = "none";
  document.querySelector(".updatePasswordSection").style.display = "none";
  document.querySelector(".seeAllClassMyCoursesAddCardVideo").style.display =
    "none";
  document.querySelector(val).style.display = "block";
}

function closeButton(val) {
  document.querySelector(val).style.display = "none";
}

// ===================================================
// ===================================================
//  My Courses
// ===================================================
// ===================================================

dishplayDataAllCourses1();
async function dishplayDataAllCourses1() {
  document.getElementById("seeAllClassMyCoursesVideo").innerHTML = "";
  try {
    let res = await fetch(`https://masai-server.herokuapp.com/coures`);
    let users = await res.json();

    users.forEach((ele) => {
      let mydata = `
      <h2>${ele.coursesName}</h2>
      <h5>${ele.coursesAbout.slice(0, 100)}....</h5>
      <span></span>
      <div>
      <button onclick="opeanclassesmycourses(${
        ele.id
      })">Go to Lectures &#128214;</button>
      </div>
      <span></span>
      `;
      let ContantCont = document.createElement("div");
      ContantCont.innerHTML = mydata;
      if (ele.coursesPrech) {
        document
          .getElementById("seeAllClassMyCoursesVideo")
          .append(ContantCont);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function opeanclassesmycourses(id) {
  try {
    document.getElementById("openCoursesvideoclasses").innerHTML = "";
    openButton(".openCoursesvideoclassgroup");
    let res = await fetch(`https://masai-server.herokuapp.com/coures/${id}`);
    let users = await res.json();
    users.coursesLecture.forEach((ele, ind) => {
      let mydata = `
      <h2>${ele.lectureName}</h2>
      <h5>${ele.lectureAdout.slice(0, 100)}....</h5>
      <span></span>
      <div>
      <button onclick="openplayerclass(${
        users.id
      }, ${ind})">Play Class &#128214;</button>
      </div>
      <span></span>
      `;
      let ContantCont = document.createElement("div");
      ContantCont.innerHTML = mydata;

      document.getElementById("openCoursesvideoclasses").append(ContantCont);
    });
  } catch (error) {
    console.log(error);
  }
}
async function openplayerclass(id, ind) {
  try {
    document.getElementById("openCoursesvideoclasses").innerHTML = "";
    openButton(".playvidothimclassgroup");
    let res = await fetch(`https://masai-server.herokuapp.com/coures/${id}`);
    let users = await res.json();

    let val = users.coursesLecture[ind].lectureUrl;

    document.getElementById("playvidothim").innerHTML = `
      <h1>${ind + 1}. ${users.coursesLecture[ind].lectureName} - [${
      users.coursesName
    }]</h1>
      <iframe width="842" height="455" src="https://www.youtube.com/embed/${val}" title="Boost your career with Part-Time courses at Masai" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
      <p>${users.coursesLecture[ind].lectureAdout}</p>`;
  } catch (error) {
    console.log(error);
  }
}

// ===================================================
// ===================================================
//  All Courses
// ===================================================
// ===================================================

dishplayDataAllCourses2();
async function dishplayDataAllCourses2() {
  document.getElementById("seeAllClassAllCoursesVideo").innerHTML = "";
  try {
    let res = await fetch(`https://masai-server.herokuapp.com/coures`);
    let users = await res.json();

    users.forEach((ele) => {
      let imgUrl1;
      let imgUrl2;
      if (ele.coursesFavorite) {
        imgUrl1 = "../assist/images/addedfav.png";
      } else {
        imgUrl1 = "../assist/images/notaddedfav.png";
      }
      if (ele.coursesCart) {
        imgUrl2 = "../assist/images/removetocart.png";
      } else {
        imgUrl2 = "../assist/images/addtocart.png";
      }

      let mydata = `
      <h2>${ele.coursesName}</h2>
      <h5>${ele.coursesAbout.slice(0, 100)}....</h5>
      <span></span>
      <div>
      <img src="${imgUrl1}" alt="" onclick="addCoursesToAddFevList(${ele.id}, ${
        ele.coursesFavorite
      })"><img src="${imgUrl2}" alt="" onclick="addCoursesToCartList(${
        ele.id
      }, ${ele.coursesCart}, ${ele.coursesPrech})">
      </div>
      `;
      let ContantCont = document.createElement("div");
      ContantCont.innerHTML = mydata;

      document.getElementById("seeAllClassAllCoursesVideo").append(ContantCont);
    });
  } catch (error) {
    console.log(error);
  }
}

// ===================================================
// ===================================================
// Favorite Courses
// ===================================================
// ===================================================
dishplayDataAllCourses3();
async function dishplayDataAllCourses3() {
  document.getElementById("seeAllClassFavoriteCoursesVideo").innerHTML = "";
  try {
    let res = await fetch(`https://masai-server.herokuapp.com/coures`);
    let users = await res.json();

    users.forEach((ele) => {
      let imgUrl1;
      let imgUrl2;
      if (ele.coursesFavorite) {
        imgUrl1 = "../assist/images/addedfav.png";
      } else {
        imgUrl1 = "../assist/images/notaddedfav.png";
      }
      if (ele.coursesCart) {
        imgUrl2 = "../assist/images/removetocart.png";
      } else {
        imgUrl2 = "../assist/images/addtocart.png";
      }

      let mydata = `
      <h2>${ele.coursesName}</h2>
      <h5>${ele.coursesAbout.slice(0, 100)}....</h5>
      <span></span>
      <div>
      <img src="${imgUrl1}" alt="" onclick="addCoursesToAddFevList(${ele.id}, ${
        ele.coursesFavorite
      })"><img src="${imgUrl2}" alt="" onclick="addCoursesToCartList(${
        ele.id
      }, ${ele.coursesCart}, ${ele.coursesPrech})">
      </div>
      `;
      let ContantCont = document.createElement("div");
      ContantCont.innerHTML = mydata;

      if (ele.coursesFavorite) {
        document
          .getElementById("seeAllClassFavoriteCoursesVideo")
          .append(ContantCont);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// ===================================================
// ===================================================
//  Cart Courses
// ===================================================
// ===================================================

dishplayDataAllCourses4();
async function dishplayDataAllCourses4() {
  document.getElementById("seeAllClassMyCoursesAddCardVideo").innerHTML = "";
  try {
    let res = await fetch(`https://masai-server.herokuapp.com/coures`);
    let users = await res.json();

    users.forEach((ele) => {
      let imgUrl2;
      if (ele.coursesCart) {
        imgUrl2 = "../assist/images/removetocart.png";
      } else {
        imgUrl2 = "../assist/images/addtocart.png";
      }

      let mydata = `
      <h2>${ele.coursesName}</h2>
      <h5>${ele.coursesAbout.slice(0, 100)}....</h5>
 
      <div>
      <button onclick="buyoverCourses(${ele.id}, ${
        ele.coursesFees
      })">Buy now</button>
      <img src="${imgUrl2}" alt="" onclick="addCoursesToCartList(${ele.id}, ${
        ele.coursesCart
      })">
      </div>
      `;
      let ContantCont = document.createElement("div");
      ContantCont.innerHTML = mydata;
      if (ele.coursesCart) {
        document
          .getElementById("seeAllClassMyCoursesAddCardVideo")
          .append(ContantCont);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// ===================================================
// ===================================================
//  Add and remove Favorite Courses
// ===================================================
// ===================================================
function addCoursesToAddFevList(id, val) {
  let flag;
  if (val) {
    flag = false;
  } else {
    flag = true;
  }
  fetch(`https://masai-server.herokuapp.com/coures/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      coursesFavorite: flag,
    }),
    headers: { "Content-Type": "application/json" },
  });
  dishplayDataAllCourses1();
  dishplayDataAllCourses2();
  dishplayDataAllCourses3();
}

// ===================================================
// ===================================================
//  Add and remove cart Courses
// ===================================================
// ===================================================
function addCoursesToCartList(id, val, buy) {
  let flag = val;
  if (val) {
    flag = false;
  } else {
    if (buy) {
      alert(`You have already purchased this course, please visit my courses`);
    } else {
      flag = true;
    }
  }
  fetch(`https://masai-server.herokuapp.com/coures/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      coursesCart: flag,
    }),
    headers: { "Content-Type": "application/json" },
  });
  dishplayDataAllCourses1();
  dishplayDataAllCourses2();
  dishplayDataAllCourses3();
}

// ===================================================
// ===================================================
//  buyoverCourses
// ===================================================
// ===================================================

function buyoverCourses(id, payment) {
  openButton(".masaipaymentGateway");
  document.getElementById("makePay").value = `Make Payment : ${payment}`;
  document.getElementById("sendOtp").setAttribute("onclick", `sendOtp(${id})`);
}

function sendOtp(id) {
  var cardNum = document.getElementById("cardNum").value;
  var cardCvv = document.getElementById("cardCvv").value;
  var cardDate = document.getElementById("cardDate").value;

  if (
    cardNum === "1234567891234567" &&
    cardCvv === "123" &&
    cardDate == "12/22"
  ) {
    document.getElementById(
      "otppartres"
    ).innerHTML = `<input type="text" id="payOtp" placeholder="Enter 4 digit otp" required="required" value=""></input>`;
    document
      .getElementById("makePay")
      .setAttribute("onclick", `makepaymentnow(${id})`);
    alert("Your 4 digit otp 8652, otp valid for two minutes");
  } else {
    alert("Please fill correct data");
  }
}

function makepaymentnow(id) {
  var otp = document.getElementById("payOtp").value;
  if (otp === "8652") {
    purchachcourses(id);
  }
}

function purchachcourses(id) {
  fetch(`https://masai-server.herokuapp.com/coures/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      coursesCart: false,
      coursesPrech: true,
    }),
    headers: { "Content-Type": "application/json" },
  });
  closeButton(".masaipaymentGateway");
}
