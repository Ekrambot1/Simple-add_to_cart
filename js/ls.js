

//login and signup validation
// Get and check local user using getItem

function login(e) {
    event.preventDefault();
    var name = document.getElementById('uname').value;
    let pass = document.getElementById('password').value;
    let result = document.getElementById('result');

    var userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);

    if (userData == null) {
        result.style.color = "red";
        result.innerHTML = 'please enter value';
    } else if (name == userData.username && pass == userData.password) {
        result.style.color = "green";
        result.innerHTML = 'Login successful';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        result.style.color = "red";
        result.innerHTML = 'Wrong password';
    }
    document.getElementById('uname').value = '';
    document.getElementById('password').value = '';
}



// Store local user using setItem
function signup(e) {
    event.preventDefault();

    var name = document.getElementById('uname').value;
    var email = document.getElementById('mail').value;
    var pass = document.getElementById('password').value;
    var cpass = document.getElementById('confirm-password').value;
    var result = document.getElementById('result');

    if (pass != cpass) {
        result.style.color = "red";
        result.innerHTML = "Passwords do not match";
    }
    else if(name==''&&email==''&&pass==''&&cpass==''){
        result.style.color = "red";
        result.innerHTML = "Please enter all input field";
    }  
    else {
        result.style.color = "green";
        result.innerHTML = "Registration Successful";     
    var user = {
        email: email,
        username: name,
        password: pass,
        cfpassword: cpass
    }

    var userval = JSON.stringify(user);
    localStorage.setItem('user', userval);

    document.getElementById('uname').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }

}

let toggleBtn = document.getElementById("toggleBtn");
let toggleBtn1 = document.getElementById("toggleBtn1");
let passinput = document.getElementById("password");
let cfinput= document.getElementById("confirm-password");

let password = true;
toggleBtn.addEventListener("click", function () {
  if (password) {
    passinput.setAttribute("type", "text");
    toggleBtn.classList.remove("fa-eye");
    toggleBtn.classList.add("fa-eye-slash");
    password = false;
  } else {
    passinput.setAttribute("type", "password");
    toggleBtn.classList.remove("fa-eye-slash");
    toggleBtn.classList.add("fa-eye");
    password = true;
  }
});
toggleBtn1.addEventListener("click", function () {
    if (password) {
      cfinput.setAttribute("type", "text");
      toggleBtn1.classList.remove("fa-eye");
      toggleBtn1.classList.add("fa-eye-slash");
      password = false;
    } else {
      cfinput.setAttribute("type", "password");
      toggleBtn1.classList.remove("fa-eye-slash");
      toggleBtn1.classList.add("fa-eye");
      password = true;
    }
  });