import axios from "axios";

export async function getUser() {
  try {
    const results = await axios("/users/profile", {
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
