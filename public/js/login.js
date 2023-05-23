const signupSelectBtn = document.querySelector(".signupSelect");
const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");

const handleSignupSelect = (e) => {
  e.preventDefault();
  console.log("hello");
  loginForm.style.display = "none";
  signupForm.style.display = "block";
};

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  const user_name = document.querySelector("#user_name-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (user_name && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        alert("Successfully logged in!")
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const handleSignupSubmit = async (e) => {
  e.preventDefault();
  const first_name = document.querySelector("#first_name").value.trim();
  const last_name = document.querySelector("#last_name").value.trim();
  const user_name = document.querySelector("#user_name-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (first_name && last_name && user_name && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ first_name, last_name, user_name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

signupSelectBtn.addEventListener("click", handleSignupSelect);
loginForm.addEventListener("submit", handleLoginSubmit);
signupForm.addEventListener("submit", handleSignupSubmit);
