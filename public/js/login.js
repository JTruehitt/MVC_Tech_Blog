const signupSelectBtn = document.querySelector(".signupSelect");
const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");

const handleSignupSelect = (e) => {
  e.preventDefault();
  console.log("hello");
  loginForm.style.display = "none";
  signupForm.style.display = "block";
};

signupSelectBtn.addEventListener("click", handleSignupSelect);
