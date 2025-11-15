import { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("isAuthenticated", "true");
        onLogin();
      } else {
        setError("Incorrect password");
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className={`login-window ${isShaking ? "shake" : ""}`}>
        {/* Title Bar */}
        <div className="login-title-bar">
          <span className="login-title">LAN Party - Login</span>
        </div>

        {/* Login Content */}
        <div className="login-content">
          {/* Profile Picture */}
          <div className="login-profile">
            <div className="profile-pic">
              <img src="/images/guest-avatar.png" alt="Guest" />
            </div>
          </div>

          {/* Username Display */}
          <div className="login-username">
            <span>Guest</span>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="password">Enter Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <div className="login-actions">
              <button type="submit" className="login-btn">
                Log In
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="login-help">
            <p>Contact the host for the password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
