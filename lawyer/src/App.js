
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { CssBaseline } from "@mui/material";
// HOMEPAGE
import Home from "./home/home";

// Lawyer'S PAGES
import LawyerSignup from "./lawyer/Signup";
import LawyerSignin from "./lawyer/Signin";

// Client'S PAGES
import ClientSignup from "./client/signup";
import ClientSignin from "./client/signin";

// ADMIN'S PAGES
import AdminSignin from "./admin/signin";


const App = () => {


  return (
    <>
      
          <CssBaseline>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/lawyersignup" component={LawyerSignup} />
                <Route exact path="/lawyersignin" component={LawyerSignin} />
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/clientsignup"
                  component={ClientSignup}
                />
                <Route
                  exact
                  path="/clientsignin"
                  component={ClientSignin}
                />
                <Route exact path="/adminsignin" component={AdminSignin} />
              </Switch>
            </Router>
          </CssBaseline>
      
      
    </>
  );
};

export default App;
