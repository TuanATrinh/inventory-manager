import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInContext } from "./Logged-In-Context";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedIn, setUser_id, user_id } = useContext(loggedInContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password
    };
    fetch("http://localhost:8081/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 200) {
        let jsonres = await res.json();

        if (jsonres && jsonres[0] && jsonres[0].id) {
          setUser_id(jsonres[0].id);
          setLoggedIn(true);
          console.log(user_id);
          navigate("/UserItems");
        } else {
          alert("Invalid response format");
        }
      } else {
        alert("Username/Password not found!");
      }
    }).catch(error => {
      console.error("Error:", error);
      alert("An error occurred while logging in");
    });
  };


  const handleNewAccount = () => {
    navigate("/create-user");
  };


  return (
    <div>
      <h2>Log In</h2>
      <form>
        <label style={{ marginBottom: 15 }}>
          <input
            required
            type="text"
            name="username"
            placeholder="Enter Username"
            onInput={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
        <input
          type="submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
      <br></br>
      <button
        type="button"
        onClick={() => handleNewAccount()}
      >
        Create New Account
      </button>
    </div>
  );
}