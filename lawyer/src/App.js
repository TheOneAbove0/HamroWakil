import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./Firebase";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline } from "@mui/material";

// HOMEPAGE
import Home from "./home/home";

// Lawyer'S PAGES
import LawyerSignup from "./lawyer/Signup";
import LawyerSignin from "./lawyer/Signin";
import LawyerDashboard from "./lawyer/dashboard/Dashboard";
import LawyerProfile from "./lawyer/Profile";
import Appointments from "./lawyer/Appointments";
import LawyerNotifications from "./lawyer/Lawyernotifications";
import LawyerLatestUpdates from "./lawyer/Latestupdates";
import Client from "./lawyer/Client";
import YourClients from "./lawyer/Yourclients";
import LawyerScheduleMeeting from "./lawyer/Scheduledmeetings";
import LawyerRoom from "./lawyer/videoMeeting/Room";

// Client'S PAGES
import ClientSignup from "./client/Signup";
import ClientSignin from "./client/Signin";
import ClientDashboard from "./client/dashboard/Dashboard";
import ClientProfile from "./client/Profile";
import ClientNotifications from "./client/ClientNotifications";
import ViewLawyers from "./client/Viewlawyers";
import BookAppointment from "./client/Bookappointment";
import Lawyer from "./client/Lawyer";
import ClientScheduledMeetings from "./client/Scheduledmeetings";
import ClientLatestUpdates from "./client/Latestupdates";
import PastAppointments from "./client/Pastappointments";
import ClientRoom from "./client/videoMeeting/Room";
// ADMIN'S PAGES
import AdminSignin from "./admin/AdminSignin";
import AdminDashboard from "./admin/Dashboard";
import Lawyers from "./admin/Lawyers";
import Clients from "./admin/Clients";
import CreatePost from "./admin/Createpost";
import LatestUpdates from "./admin/Latestupdates";
import Feedbacks from "./admin/Feedbacks";



const App = () => {
  const [user, setUser] = useState("");

  //SETTING THE USER IF HE IS AUTHENTICATED
  const authlistener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authlistener();
  }, []);

  return (
    <>
      {user ? (
        // ROUTES AVAILABLE IF THE USER IS AUTHENTICATED
        <>
          <CssBaseline>
            <Router>
              <AuthProvider>
              <Switch>
                <Route exact path="/" component={Home} />

                {/* Lawyer Pages */}
                <Route exact path="/lawyersignup" component={LawyerSignup} />
                <Route exact path="/lawyersignin" component={LawyerSignin} />
                <Route
                    exact
                    path="/lawyer/dashboard"
                    component={LawyerDashboard}
                  />
                  <Route
                    exact
                    path="/lawyer/profile"
                    component={LawyerProfile}
                  />
                  <Route
                    exact
                    path="/lawyer/appointments"
                    component={Appointments}
                  />
                  <Route
                    exact
                    path="/lawyer/notifications"
                    component={LawyerNotifications}
                  />
                  <Route
                    exact
                    path="/lawyer/latestupdates"
                    component={LawyerLatestUpdates}
                  />
                   <Route
                    exact
                    path="/lawyer/room/:roomID"
                    component={LawyerRoom}
                  />
                  <Route
                    exact
                    path="/clientprofile/:uid"
                    component={Client}
                  />
                  <Route
                    exact
                    path="/lawyer/yourclients"
                    component={YourClients}
                  />
                  <Route
                    exact
                    path="/lawyer/scheduledmeetings"
                    component={LawyerScheduleMeeting}
                  />


                {/* Client Pages */}
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
                <Route
                  exact
                  path="/client/dashboard"
                  component={ClientDashboard}
                />
                <Route
                  exact
                  path="/client/profile"
                  component={ClientProfile}
                />
                <Route
                  exact
                  path="/client/notifications"
                  component={ClientNotifications}
                />
                <Route
                  exact
                  path="/client/viewlawyers"
                  component={ViewLawyers}
                />
                <Route
                  exact
                  path="/client/bookappointment"
                  component={BookAppointment}
                />
                <Route exact path="/lawyerprofile/:uid" component={Lawyer} />
                <Route
                  exact
                  path="/client/notifications"
                  component={ClientNotifications}
                />
                <Route
                  exact
                  path="/client/scheduledmeetings"
                  component={ClientScheduledMeetings}
                />
                 <Route
                    exact
                    path="/client/room/:roomID"
                    component={ClientRoom}
                  />
                <Route
                  exact
                  path="/client/latestupdates"
                  component={ClientLatestUpdates}
                />
                <Route
                  exact
                  path="/client/pastappointments"
                  component={PastAppointments}
                />
              

                {/* Admin Pages */}
                <Route exact path="/adminsignin" component={AdminSignin} />
                <Route
                    exact
                    path="/admin/dashboard"
                    component={AdminDashboard}
                  />
                  <Route exact path="/lawyers" component={Lawyers} />
                  <Route exact path="/clients" component={Clients} />
                  <Route exact path="/createpost" component={CreatePost} />
                  <Route exact path="/feedbacks" component={Feedbacks} />
                  <Route
                    exact
                    path="/latestupdates"
                    component={LatestUpdates}
                  />

              </Switch>
              </AuthProvider>
            </Router>
          </CssBaseline>
    </>
  ) : (
    // ROUTES AVAILABLE IF THE USER IS NOT AUTHENTICATED
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
)}
</>
);
};

export default App;
