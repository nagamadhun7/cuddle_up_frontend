
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const InputField = ({ label, type, id, placeholder, ...props }) => (
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

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Multi-step state

  // Step 1: Personal Information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Step 2: Email & Passwords
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name || !age || !gender || !city || !country) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };


const handleSignUp = async (e) => {
  e.preventDefault();
  if (!email || !password || !confirmPassword) {
    setError("All fields are required.");
    return;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Firebase user object

    // Get Firebase ID token
    const token = await user.getIdToken();

    // Prepare data to send to backend
    const userData = {
      name,
      age,
      gender,
      city,
      country,
      uid: user.uid, // Firebase unique user ID
    };

    // Send data to backend with token
    const response = await fetch(
      'https://cuddle-up-backend.onrender.com/api/users/register',
      // "https://cuddle-up-backend.onrender.com/api/users/register", 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach Firebase token
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    console.log("User successfully registered:", data);
    navigate("/login");
  } catch (error) {
    if (error.message.includes('auth/email-already-in-use')) {
      setError('Email not available (already in use)');
    } else if (error.message.includes('auth/invalid-email')) {
      setError('Invalid email address');
    } else if (error.message.includes('auth/weak-password')) {
      setError('Password should be at least 6 characters');
    } else {
      setError('An error occurred, please try again.');
    }
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-block p-4 mb-6">
            <Heart className="w-16 h-16 text-blue-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {step === 1 ? "Tell Us About Yourself" : "Create Your Account"}
          </h1>
          <p className="text-lg text-gray-600 font-light px-4">
            {step === 1
              ? "We'd love to get to know you better!"
              : "Secure your account with email and password."}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {step === 1 && (
            <>
              <InputField
                label="Full Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputField
                label="Age"
                type="number"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  className="w-full mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <InputField
                label="City"
                type="text"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <InputField
                label="Country"
                type="text"
                id="country"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
              <Button
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-transform duration-200 hover:-translate-y-0.5 mt-4"
                onClick={handleNext}
              >
                Next
              </Button>
              
            </>
            
          )}

          {step === 2 && (
            <>
              <InputField
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <Button className="w-full bg-gray-300 text-gray-700 mt-4" onClick={handleBack}>
                Back
              </Button>
              <Button className="w-full mt-4 bg-blue-600 text-white" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          )}
          
        </div>
        <div className="mt-6 text-center flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 flex items-center justify-center gap-2 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default Signup;
















