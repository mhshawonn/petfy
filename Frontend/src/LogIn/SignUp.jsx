import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isOTPStage, setIsOTPStage] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Initialize successMessage state

  // To handle debounce when checking username availability
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const checkUsernameAvailability = async (username) => {
    try {
      setIsCheckingUsername(true); // Indicate that we are checking availability
      const response = await fetch(`http://localhost:8080/user/isHas/${username}`);
      const data = await response.text();
      if (data === "true") {
        setUsernameError("Username is already taken.");
      } else {
        setUsernameError("");
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameError("An error occurred while checking username availability.");
    } finally {
      setIsCheckingUsername(false); // Indicate that the checking is complete
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/user/isHasEmail/${email}`);
      const data = await response.text();
      if (data === "true") {
        setEmailError("Email is already taken.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error('Error checking email availability:', error);
      setEmailError("An error occurred while checking email availability.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !name || !password || !confirmPassword) {
      setErrorMessage('All fields are required!');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (usernameError || emailError) {
      setErrorMessage('Please resolve the errors before submitting');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, name, password }),
      });

      console.log(username, email, name, password);

      if (response.ok) {
        setIsOTPStage(true);
        setErrorMessage('');
        setSuccessMessage('OTP sent to your email. Please verify to complete registration.');
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || 'Error during registration');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while registering');
      setSuccessMessage('');
    }
  };

  const handleOTPVerification = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/verify/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Otp: otp }),
      });

      if (response.ok) {
        setSuccessMessage('Registration successful! You can now log in.');
        setErrorMessage('');
        setIsOTPStage(false);
      } else {
        const errorData = await response.text();
        setOtpError(errorData || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setOtpError('Invalid OTP');
    }
  };

  // Debounced check username and email availability
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username) {
        checkUsernameAvailability(username);
      }
      if (email) {
        checkEmailAvailability(email);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount or input change
  }, [username, email]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 w-full max-w-xs p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>

          {!isOTPStage ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <div>
              <p className="text-gray-700 mb-4">Enter the OTP sent to your email:</p>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-300 rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
              <button
                onClick={handleOTPVerification}
                className="w-full py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-blue-600 transition mt-4"
              >
                Verify OTP
              </button>
            </div>
          )}

          {!isOTPStage && (
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link to="/login" className="text-sm font-semibold text-pink-500 hover:underline">
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;