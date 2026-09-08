import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";
import "../styles/Auth.css";

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      }
      if (formState === 1) {
        let result = await handleRegister(name, username, password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response.data.message;
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="authContainer">
        <CssBaseline />

        <div className="authLeftPanel">
          <div>
            <p className="authLogo">
              Link<span>Live</span>
            </p>
            <p className="authTagline">Connect with your loved ones</p>
          </div>
        </div>

        <div className="authRightPanel">
          <div className="authFormBox">
            <Avatar className="authAvatar">
              <LockOutlined className="authLockIcon" />
            </Avatar>

            <div className="authToggleButtons">
              <Button
                className={
                  formState === 0 ? "authToggleActive" : "authToggleInactive"
                }
                onClick={() => setFormState(0)}
              >
                Sign in
              </Button>
              <Button
                className={
                  formState === 1 ? "authToggleActive" : "authToggleInactive"
                }
                onClick={() => setFormState(1)}
              >
                Sign up
              </Button>
            </div>

            <div className="authForm">
              {formState === 1 ? (
                <TextField
                  className="authTextField"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Full Name"
                  name="username"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <></>
              )}

              <TextField
                className="authTextField"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                className="authTextField"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />

              <p className="authError">{error}</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                className="authSubmitButton"
                onClick={handleAuth}
              >
                {formState === 0 ? "Login" : "Register"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}
