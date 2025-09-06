import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "superadmin" && password === "superadmin") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  const inputBase = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "#fafafa",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "28px",
          backgroundColor: "#fff",
          borderRadius: "14px",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ marginBottom: "18px", textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Login
          </h2>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: "13px" }}>
            Continue to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                color: "#374151",
                fontWeight: 600,
              }}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputBase}
              onFocus={(e) => {
                e.target.style.border = "1px solid #4CAF50";
                e.target.style.boxShadow = "0 0 0 4px rgba(76,175,80,0.12)";
                e.target.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #e5e7eb";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#fafafa";
              }}
              autoComplete="username"
            />
          </div>

          {/* Password + ko'rsatish tugmasi */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                color: "#374151",
                fontWeight: 600,
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputBase }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #4CAF50";
                  e.target.style.boxShadow = "0 0 0 4px rgba(76,175,80,0.12)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid #e5e7eb";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#fafafa";
                }}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!username || !password}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: !username || !password ? "#9ee0a3" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: !username || !password ? "not-allowed" : "pointer",
              transition: "transform 0.1s, background-color 0.2s",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.98)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>

        {/* Error */}
        {error && (
          <p
            style={{
              marginTop: "14px",
              fontSize: "13px",
              color: "#b91c1c",
              background: "rgba(185,28,28,0.06)",
              border: "1px solid rgba(185,28,28,0.25)",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {/* Demo yordamchi */}
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          Demo: <code>superadmin / superadmin</code>
        </p>
      </div>
    </div>
  );
};

export default Login;
