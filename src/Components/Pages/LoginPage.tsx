import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../../Styles/Login.css";
function LoginPage() {
  return (
    <div className="login">
      <form className="login-form">
        <h2 className="title">Login</h2>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="User Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button fullWidth variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
}
export default LoginPage;
