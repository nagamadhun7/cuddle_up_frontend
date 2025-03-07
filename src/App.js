// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import SignupPage from "./components/SignupPage";
// import MoodCapture from "./components/MoodCapture";
// import HomePage from "./components/HomePage";
// import Navbar from "./components/Navbar";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/ProfilePage";
// import { auth } from "./firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import PremiumFeaturePage from "./components/PremiumFeaturesPage";

// function App() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation(); // Get current route

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//   //     if (currentUser) {
//   //       setUser(currentUser); // Set the user if they are logged in
//   //       navigate("/mood-capture"); // Redirect to mood-capture if logged in
//   //     } else {
//   //       setUser(null); // Set to null if no user is logged in
//   //     }
//   //   });

//   //   return () => unsubscribe(); // Cleanup listener on component unmount
//   // }, [navigate]);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser); // Set the user if they are logged in
//         // Only redirect if the user is on the login or signup page
//         if (location.pathname === "/login" || location.pathname === "/signUp") {
//           navigate("/mood-capture");
//         }
//       } else {
//         setUser(null); // Set to null if no user is logged in
//       }
//     });

//     return () => unsubscribe(); // Cleanup listener on component unmount
//   }, [navigate, location.pathname]); // Add location.pathname to dependencies

//   // Define routes where Navbar should be hidden
//   const hideNavbarRoutes = ["/login", "/signUp"];
//   const shouldShowNavbar =
//     user && !hideNavbarRoutes.includes(location.pathname);

//   return (
//     <>
//       {/* Conditionally render Navbar */}
//       {shouldShowNavbar && <Navbar />}

//       <div className="pt-16">
//         <Routes>
//           <Route path="/" element={user ? <MoodCapture /> : <HomePage />} />

//           <Route
//             path="/login"
//             element={user ? <MoodCapture /> : <LoginPage />}
//           />

//           <Route
//             path="/signUp"
//             element={user ? <MoodCapture /> : <SignupPage />}
//           />

//           <Route
//             path="/mood-capture"
//             element={user ? <MoodCapture /> : <LoginPage />}
//           />

//           <Route path="/profile" element={user ? <Profile /> : <LoginPage />} />
//           <Route
//             path="/premium-features"
//             element={user ? <PremiumFeaturePage /> : <LoginPage />}
//           />
//           <Route
//             path="/dashboard"
//             element={user ? <Dashboard /> : <LoginPage />}
//           />

//           <Route path="*" element={<h1>404 - Not Found</h1>} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MoodCapture from "./components/MoodCapture";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/ProfilePage";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import PremiumFeaturePage from "./components/PremiumFeaturesPage";

function App() {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if they are logged in
        setIsGuest(false); // Not a guest if logged in
        // Only redirect if the user is on the login or signup page
        if (location.pathname === "/login" || location.pathname === "/signUp") {
          navigate("/mood-capture");
        }
      } else {
        setUser(null); // Set to null if no user is logged in
      }
    });
    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [navigate, location.pathname]); // Add location.pathname to dependencies

  // Function to enable guest mode
  const enableGuestMode = () => {
    setIsGuest(true);
    navigate("/mood-capture");
  };

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signUp"];
  
  // Show navbar for logged in users or guests, but not on login/signup pages
  const shouldShowNavbar = 
    (user || isGuest) && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar with isGuest prop */}
      {shouldShowNavbar && <Navbar user={user} isGuest={isGuest} />}
      <div className="pt-16">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? <MoodCapture user={user} isGuest={false} /> : 
              isGuest ? <MoodCapture isGuest={true} /> : 
              <HomePage enableGuestMode={enableGuestMode} />
            } 
          />
          <Route
            path="/login"
            element={user ? <MoodCapture user={user} isGuest={false} /> : <LoginPage />}
          />
          <Route
            path="/signUp"
            element={user ? <MoodCapture user={user} isGuest={false} /> : <SignupPage />}
          />
          <Route
            path="/mood-capture"
            element={
              user ? <MoodCapture user={user} isGuest={false} /> : 
              isGuest ? <MoodCapture isGuest={true} /> : 
              <LoginPage />
            }
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <LoginPage />} 
          />
          <Route
            path="/premium-features"
            element={user ? <PremiumFeaturePage user={user} isGuest={false} /> : 
            isGuest ? <PremiumFeaturePage isGuest={true} /> : 
            <LoginPage />}
          />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard user={user} isGuest={false} /> : 
              <LoginPage />
            }
          />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}
export default App;