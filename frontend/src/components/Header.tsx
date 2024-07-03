import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="lightgreen"
                to="/chat"
                text="Start a chat"
                textColor="black"
              ></NavigationLink>
              <NavigationLink
                bg="black"
                to="/"
                text="Logout"
                textColor="white"
                onClick={auth.logout}
              ></NavigationLink>
            </>
          ) : (
            <>
              <NavigationLink
                bg="lightgreen"
                to="/login"
                text="Login"
                textColor="black"
              ></NavigationLink>
              <NavigationLink
                bg="black"
                to="/signup"
                text="Signup"
                textColor="white"
              ></NavigationLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
