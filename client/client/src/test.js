// import React, {useState, useEffect, useContext} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loggedInContext } from "./Logged-In-Context";


// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { loggedIn, setLoggedIn, setUser_id } = useContext(loggedInContext);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       username: username,
//       password: password
//     };
//     fetch("http://localhost:8081/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     }).then(async (res) => {
//       if (res.status === 200) {
//         let jsonres = await res.json();
//         setUser_id(jsonres[0].user_id);
//         setLoggedIn(true);
//         navigate("/UserItems");
//       } else {
//         alert("Username/Password not found!");
//       }
//     });
//   };

//   const handleNewAccount = () => {
//     navigate("/new-account");
//   };


//   return (
//     <div>
//       <h2>Log In</h2>
//       <form>
//         <label style={{ marginBottom: 15 }}>
//           <input
//             required
//             type="text"
//             name="username"
//             placeholder="Enter Username"
//             style={{ padding: 15, borderRadius: 5, textAlign: "center" }}
//             onInput={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           <input
//             required
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             onInput={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br></br>
//         <br></br>
//         <input
//           type="submit"
//           value="Submit"
//           onClick={(e) => handleSubmit(e)}
//         />
//       </form>
//       <br></br>
//       <button
//         type="button"
//         onClick={() => handleNewAccount()}
//       >
//         Create New Account
//       </button>
//     </div>
//   );
// }

// /////////////////////////


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import UserItems from './UserItems';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await fetch('http://localhost:8081/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to login');
//       }

//       const data = await response.json();

//       if (data.success) {
//         setLoggedIn(true);
//         alert('Login successful!');
//       } else {
//         alert('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('Error logging in. Please try again.');
//     }
//   };

//   return (
//     <>
//       {loggedIn ? (
//         <UserItems />
//       ) : (
//         <div>
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit">Login</button>
//           </form>
//           <Link to="/create-user">
//             <button>Create New User</button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default Login;
