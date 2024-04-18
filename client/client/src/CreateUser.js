import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const navigate = useNavigate();

  const handleCheckUsername = async () => {
    try {
      const response = await fetch("http://localhost:8081/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsernameExists(data.exists);
      } else {
        console.error("Failed to check username");
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const handleCreateUser = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (usernameExists) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/login");
        alert("User created successfully");
      } else {
        alert("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={handleCheckUsername} // Check username onBlur
          />
          {usernameExists && <p>Username already exists</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleCreateUser}>Create New User</button>
      </form>
    </div>
  );
}

export default CreateUser;
