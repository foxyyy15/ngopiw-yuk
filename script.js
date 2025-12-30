function openLogin(){
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin(){
  document.getElementById("loginModal").style.display = "none";
}

function openRegister(){
  closeLogin();
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegister(){
  document.getElementById("registerModal").style.display = "none";
}

function switchToLogin(){
  closeRegister();
  openLogin();
}

// ================== REGISTER ==================
function register(){
  const name = document.getElementById("regName");
  const email = document.getElementById("regEmail");
  const pass = document.getElementById("regPassword");

  const nameErr = document.getElementById("regNameErr");
  const emailErr = document.getElementById("regEmailErr");
  const passErr = document.getElementById("regPassErr");

  nameErr.textContent = "";
  emailErr.textContent = "";
  passErr.textContent = "";

  let valid = true;

  if(!name.value.trim()){
    nameErr.textContent = "Nama wajib diisi.";
    valid = false;
  }

  if(!email.value.trim()){
    emailErr.textContent = "Email wajib diisi.";
    valid = false;
  } else if(!email.value.includes("@")){
    emailErr.textContent = "Email harus mengandung @";
    valid = false;
  }

  if(!pass.value.trim()){
    passErr.textContent = "Password wajib diisi.";
    valid = false;
  }

  if(!valid) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exist = users.find(u => u.email === email.value);

  if(exist){
    emailErr.textContent = "Email sudah terdaftar.";
    return;
  }

  users.push({
    name: name.value,
    email: email.value,
    password: pass.value
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Pendaftaran berhasil  Silakan login.");

  closeRegister();
  openLogin();
}

// ================== LOGIN ==================
function login(){
  const email = document.getElementById("loginEmail");
  const pass = document.getElementById("loginPassword");

  const emailErr = document.getElementById("loginEmailErr");
  const passErr = document.getElementById("loginPassErr");

  emailErr.textContent = "";
  passErr.textContent = "";

  let valid = true;

  if(!email.value.trim()){
    emailErr.textContent = "Email wajib diisi.";
    valid = false;
  } else if(!email.value.includes("@")){
    emailErr.textContent = "Email harus mengandung @";
    valid = false;
  }

  if(!pass.value.trim()){
    passErr.textContent = "Password wajib diisi.";
    valid = false;
  }

  if(!valid) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const found = users.find(
    u => u.email === email.value && u.password === pass.value
  );

  if(found){
    alert("Login berhasil. Selamat datang, " + found.name + " ");
    localStorage.setItem("loggedIn", found.name);
    closeLogin();
    showLoggedInState();
  } else {
    passErr.textContent = "Email atau password salah.";
  }
}

// ================== LOGOUT ==================
function logout(){
  localStorage.removeItem("loggedIn");
  alert("Logout berhasil.");
  showLoggedInState();
}

// ================== NAVBAR STATUS ==================
function showLoggedInState(){
  const navLinks = document.getElementById("navLinks");
  const loggedIn = localStorage.getItem("loggedIn");

  if(loggedIn){
    navLinks.innerHTML = `
      <a href="#tentang">Tentang</a>
      <a href="#menu">Menu</a>
      <a href="#kontak">Kontak</a>
      <span class="greeting-badge">Halo, ${loggedIn}</span>
      <a href="javascript:void(0)" onclick="logout()">Logout</a>
    `;
  } else {
    navLinks.innerHTML = `
      <a href="#tentang">Tentang</a>
      <a href="#menu">Menu</a>
      <a href="#kontak">Kontak</a>
      <a href="javascript:void(0)" onclick="openLogin()">Membership</a>
    `;
  }
}

// jalan saat buka halaman
showLoggedInState();
