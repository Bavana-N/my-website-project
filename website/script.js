// Enhanced Login & Registration Functions with proper validation
// Add this to your script.js file or inside a <script> tag

// ==================== LOGIN FUNCTION ====================
function login() {
  // Get input values
  let username = document.getElementById('username').value.trim();
  let password = document.getElementById('password').value.trim();
  let messageDiv = document.getElementById('loginMessage');
  
  // Create message div if it doesn't exist
  if (!messageDiv) {
    const btn = document.querySelector('button');
    const parent = btn.parentNode;
    const newDiv = document.createElement('div');
    newDiv.id = 'loginMessage';
    newDiv.style.marginTop = '15px';
    newDiv.style.fontSize = '14px';
    newDiv.style.padding = '8px';
    newDiv.style.borderRadius = '8px';
    btn.parentNode.insertBefore(newDiv, btn.nextSibling);
    messageDiv = document.getElementById('loginMessage');
  }
  
  // Validation checks
  if (username === "" || password === "") {
    messageDiv.innerHTML = "⚠️ Please enter both username and password.";
    messageDiv.style.color = "#dc2626";
    messageDiv.style.background = "#fee2e2";
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "8px";
    return false;
  }
  
  // Demo credentials (you can modify these)
  // For testing: username: "student" or "student@example.com", any password (min 1 char)
  // Or specific demo account: demo / demo123
  
  const validUsers = [
    { username: "student", password: "student123" },
    { username: "student@example.com", password: "pass123" },
    { username: "demo", password: "demo123" },
    { username: "admin", password: "admin123" }
  ];
  
  let isValid = false;
  
  // Check against valid users
  for (let user of validUsers) {
    if (username === user.username && password === user.password) {
      isValid = true;
      break;
    }
  }
  
  // Also allow any password if username is student (for flexibility)
  if (username === "student" && password.length >= 1) {
    isValid = true;
  }
  if (username === "student@example.com" && password.length >= 1) {
    isValid = true;
  }
  
  if (isValid) {
    // Store login state in sessionStorage
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loggedUser", username);
    sessionStorage.setItem("loginTime", new Date().toISOString());
    
    messageDiv.innerHTML = "✅ Login successful! Redirecting to Dashboard...";
    messageDiv.style.color = "#166534";
    messageDiv.style.background = "#dcfce7";
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "8px";
    
    // Redirect after 1 second
    setTimeout(function() {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    messageDiv.innerHTML = "❌ Invalid credentials. Try: student / any password OR demo / demo123";
    messageDiv.style.color = "#dc2626";
    messageDiv.style.background = "#fee2e2";
    messageDiv.style.padding = "10px";
    messageDiv.style.borderRadius = "8px";
  }
  
  return false;
}

// ==================== REGISTER FUNCTION ====================
function register() {
  // Get input values
  let fullName = document.getElementById('fullName')?.value.trim();
  let email = document.getElementById('email')?.value.trim();
  let password = document.getElementById('password')?.value;
  let confirmPassword = document.getElementById('confirmPassword')?.value;
  let messageDiv = document.getElementById('registerMessage');
  
  // Create message div if it doesn't exist
  if (!messageDiv) {
    const btn = document.querySelector('button');
    if (btn) {
      const parent = btn.parentNode;
      const newDiv = document.createElement('div');
      newDiv.id = 'registerMessage';
      newDiv.style.marginTop = '15px';
      newDiv.style.fontSize = '14px';
      newDiv.style.padding = '8px';
      newDiv.style.borderRadius = '8px';
      btn.parentNode.insertBefore(newDiv, btn.nextSibling);
      messageDiv = document.getElementById('registerMessage');
    }
  }
  
  // Helper function to show error
  function showError(msg) {
    if (messageDiv) {
      messageDiv.innerHTML = msg;
      messageDiv.style.color = "#dc2626";
      messageDiv.style.background = "#fee2e2";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "8px";
    } else {
      alert(msg);
    }
  }
  
  function showSuccess(msg) {
    if (messageDiv) {
      messageDiv.innerHTML = msg;
      messageDiv.style.color = "#166534";
      messageDiv.style.background = "#dcfce7";
      messageDiv.style.padding = "10px";
      messageDiv.style.borderRadius = "8px";
    } else {
      alert(msg);
    }
  }
  
  // Validation checks
  if (!fullName || !email || !password || !confirmPassword) {
    showError("⚠️ All fields are required!");
    return false;
  }
  
  if (fullName.length < 3) {
    showError("❌ Full name must be at least 3 characters long.");
    return false;
  }
  
  // Email format validation
  const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showError("❌ Please enter a valid email address (e.g., name@example.com).");
    return false;
  }
  
  if (password.length < 6) {
    showError("❌ Password must be at least 6 characters long.");
    return false;
  }
  
  if (password !== confirmPassword) {
    showError("❌ Passwords do not match. Please re-enter.");
    return false;
  }
  
  // All valid - store registration info
  const userData = {
    name: fullName,
    email: email,
    registeredOn: new Date().toLocaleString()
  };
  
  // Store in localStorage for persistence across pages
  localStorage.setItem("registeredUser_" + email, JSON.stringify(userData));
  sessionStorage.setItem("justRegistered", "true");
  sessionStorage.setItem("registeredEmail", email);
  
  showSuccess("✅ Registration successful! Redirecting to Login page...");
  
  // Redirect to login page after 1.5 seconds
  setTimeout(function() {
    window.location.href = "login.html";
  }, 1500);
  
  return false;
}

// ==================== CHECK LOGIN STATUS (for protected pages) ====================
function checkAuth() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const currentPage = window.location.pathname.split("/").pop();
  
  // List of pages that require login
  const protectedPages = ["dashboard.html"];
  
  if (protectedPages.includes(currentPage) && isLoggedIn !== "true") {
    // Redirect to login if not authenticated
    window.location.href = "login.html";
    return false;
  }
  
  // Optional: Display logged-in user info on dashboard
  if (currentPage === "dashboard.html" && isLoggedIn === "true") {
    const loggedUser = sessionStorage.getItem("loggedUser");
    const userDisplay = document.getElementById("loggedUserDisplay");
    if (userDisplay) {
      userDisplay.innerHTML = `👋 Welcome, ${loggedUser}!`;
    }
  }
  
  return true;
}

// ==================== LOGOUT FUNCTION ====================
function logout() {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("loggedUser");
  sessionStorage.removeItem("loginTime");
  window.location.href = "login.html";
}

// ==================== AUTO-RUN CHECK ON PAGE LOAD ====================
// Call this when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAuth);
} else {
  checkAuth();
}

// ==================== SIMPLE ALTERNATIVE FUNCTIONS (if you prefer the original style) ====================
// These are the basic versions you originally had - kept for reference

function simpleLoginAlert() {
  alert("Login successful!");
  window.location.href = "dashboard.html";
}

function simpleRegisterAlert() {
  alert("Registered successfully!");
}

// Export for use if needed (for module systems)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { login, register, checkAuth, logout };
}