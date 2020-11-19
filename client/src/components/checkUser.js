export async function checkUser() {
  try {
    const results = await fetch("/users/profile", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(results);
    if (results) return true;
  } catch (err) {
    console.log(err.message);
  }
}
