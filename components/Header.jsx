import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import styles from "../styles/Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");


  const handleRegister = () => {
  // console.log("REGISTER CLICKED");
  // console.log(signUpUsername, signUpPassword);
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(login(signUpUsername));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });

    // - reset des champs signup
    // - fermer la modale
  };

  // 🧠 À COMPLÉTER
  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(login(signInUsername));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });

    
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h2 className={styles.title}>Morning News</h2>

        {user.isConnected ? (
          <div className={styles.userSection}>
            <span>Welcome {user.username} /</span>
            <button className={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button
            className={styles.button}
            onClick={() => setIsModalVisible(true)}
          >
            Login
          </button>
        )}
      </div>

      {isModalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <strong>Authentication</strong>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalVisible(false)}
            >
              X
            </button>
          </div>

          <div className={styles.authBlock}>
            <p>Sign-up</p>
            <input
              id="signUpUsername"
              className={styles.input}
              type="text"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
            />
            <input
              id="signUpPassword"
              className={styles.input}
              type="password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <button className={styles.button} onClick={handleRegister}>
              Register
            </button>
          </div>

          <div className={styles.authBlock}>
            <p>Sign-in</p>
            <input
              id="signInUsername"
              className={styles.input}
              type="text"
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
            />
            <input
              id="signInPassword"
              className={styles.input}
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            <button className={styles.button} onClick={handleConnection}>
              Connect
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
