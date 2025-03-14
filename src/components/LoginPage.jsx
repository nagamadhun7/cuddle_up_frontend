import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const InputField = ({ label, type, id, placeholder, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get Firebase token
      const token = await user.getIdToken(true);

      // Call backend to update status to active
  
      await axios.post('https://cuddle-up-backend.onrender.com/api/users/updateUserStatus', {
          userId: user.uid,
          status: 'active',
      }, {
          headers: { Authorization: `Bearer ${token}` }
      });

      // console.log('User logged in and status updated to active.');
      navigate('/mood-capture');  // Redirect to the mood-capture page after successful login
    } catch (error) {
      console.error(error.message);
      alert('Error logging in. Please check your credentials!');
      // setEmail('')
      // setPassword('')
    }
  };
  // const handleEmailPasswordLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Sign in with email and password
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate('/mood-capture');  // Redirect to the mood-capture page after successful login
  //   } catch (error) {
  //     console.error(error.message);
  //     alert('Error logging in. Please check your credentials!');
  //     // setEmail('')
  //     // setPassword('')
  //   }
  // };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth,provider);
      const userAuth = getAuth();
      const user = userAuth.currentUser;
      const token = await user.getIdToken(true);
      const userData = {
        name: user.displayName,
        age:'Unknown',
        gender: 'Unknown',
        city: 'Unknown',
        country: 'Unknown',
        photoURL: user.photoURL,
        uid: user.uid, // Firebase unique user ID
      };
      const response = await fetch(
        // 'http://localhost:5001/api/users/register',
        "https://cuddle-up-backend.onrender.com/api/users/register", 
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach Firebase token
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log(data)
      // navigate('/mood-capture');
    } catch (error) {
      console.error(error.message);
      alert('Error logging in with Google!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 mb-6">
            <Heart className="w-16 h-16 text-blue-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600 font-light px-4">
            Log in to continue tracking your emotions.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Input Fields for Email and Password */}
          <InputField
          onChange={e => setEmail(e.target.value)}
          value={email}
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          <InputField
          onChange={e => setPassword(e.target.value)}
          value={password}
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          {/* Login with Google Button */}
          <Button
          onClick = {e => handleEmailPasswordLogin(e)}
           className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5">

            Log In
          </Button>

          <p className="text-center mt-4 border-slate-200 border-b-2"></p>

          {/* Submit Login Button */}
          <Button onClick={handleGoogleLogin}
          className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5 mt-4">
            <FcGoogle className="w-5 h-5" />
          
            Log In with Gmail
          </Button>
        </div>

        {/* Back to Home Button */}
        <div className="mt-6 text-center flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 flex items-center justify-center gap-2 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-gray-600 flex items-center justify-center gap-2 hover:text-gray-800 transition"
          >
            {/* <ArrowRight className="w-5 h-5" /> */}
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;










