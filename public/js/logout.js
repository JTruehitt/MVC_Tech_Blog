const logoutBtn = document.querySelector(".logoutBtn");

const handleLogout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });

    if (response.ok) {
      alert("Logged out successfully.");
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
    alert("Error logging out.");
  }
};

logoutBtn.addEventListener('click', handleLogout)