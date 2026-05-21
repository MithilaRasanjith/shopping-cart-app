import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Login({ user, setUser, setCurrentPage }) {
  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      setUser(result.user);
      setCurrentPage("home");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
      setCurrentPage("home");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Login</h1>
        <p>Sign in to continue shopping and place orders.</p>
      </section>

      <div className="login-box">
        {user ? (
          <>
            <h2>You are logged in</h2>

            <p>
              <strong>Name:</strong> {user.displayName}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h2>Welcome to FreshCart</h2>
            <p>Please sign in using your Google account.</p>

            <button className="google-login-btn" onClick={loginWithGoogle}>
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Login;