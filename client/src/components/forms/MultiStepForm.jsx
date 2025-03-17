import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { step1, step2, step3, step4 } from '../../validation/registerSchema';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    needType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  // State for validation errors from Yup
  const [validationErrors, setValidationErrors] = useState({});
  // State for server-side error and success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [animation, setAnimation] = useState('');
  const totalSteps = 4;
  const navigate = useNavigate();

  // Step titles for the header
  const stepTitles = {
    1: 'Type of Service',
    2: 'Personal Information',
    3: 'Create Password',
    4: 'Review & Complete',
  };

  // Validation schemas for each step
  const validationSchemas = {
    1: step1,
    2: step2,
    3: step3,
    4: step4,
  };

  // Validate the form data for the current step using Yup
  const validateForm = async (step, data) => {
    try {
      await validationSchemas[step].validate(data, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const newErrors = {};
        validationError.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setValidationErrors(newErrors);
      }
      return false;
    }
  };

  // Move to the next step after validating the current step
  const handleNextStep = async () => {
    const isValid = await validateForm(currentStep, formData);
    if (isValid) {
      setAnimation('slide-out');
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        setAnimation('slide-in');
      }, 300);
    }
  };

  // Move back to the previous step
  const handlePrevStep = () => {
    setAnimation('slide-out');
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
      setAnimation('slide-in');
    }, 300);
  };

  // Handle changes for input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle option selection (for service type, etc.)
  const handleOptionSelect = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Trigger the slide-in animation when the component mounts or currentStep changes
  useEffect(() => {
    if (currentStep === 1) {
      setAnimation('slide-in');
    }
  }, [currentStep]);

  // Function to submit the registration data to the back end and redirect to login on success
  const handleCompleteRegistration = async () => {
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('https://cozycove.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Registration failed.');
      } else {
        setSuccess('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Display server error or success messages */}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}

      {/* Step Indicator */}
      <div className="w-full max-w-3xl mb-4 px-4 flex items-center justify-between">
        <div>
          {currentStep > 1 ? (
            <button onClick={handlePrevStep} className="mr-4 text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          ) : (
            <div className="w-5 mr-4"></div>
          )}
          <span className="text-sm font-medium text-gray-700">{stepTitles[currentStep]}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">
            {currentStep} / {totalSteps}
          </span>
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-xs font-medium text-blue-600">
            {currentStep}/{totalSteps}
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl overflow-hidden relative">
        {/* Step 1: Type of Service */}
        <div className={`transition-all duration-300 ${animation} ${currentStep === 1 ? 'block' : 'hidden'}`}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              What services do you need?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Select the options that best match your needs
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div
                className={`cursor-pointer p-6 rounded-lg border transition-all ${
                  formData.needType === 'sensoryBoxes'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleOptionSelect('needType', 'sensoryBoxes')}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Sensory Boxes</h3>
                </div>
                <p className="text-sm text-gray-500 pl-14">
                  DIY and pre-made sensory kits for children
                </p>
              </div>

              <div
                className={`cursor-pointer p-6 rounded-lg border transition-all ${
                  formData.needType === 'routineGames'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleOptionSelect('needType', 'routineGames')}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Routine Games</h3>
                </div>
                <p className="text-sm text-gray-500 pl-14">
                  Games and activities for daily routines
                </p>
              </div>

              <div
                className={`cursor-pointer p-6 rounded-lg border transition-all ${
                  formData.needType === 'resources'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleOptionSelect('needType', 'resources')}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Resources</h3>
                </div>
                <p className="text-sm text-gray-500 pl-14">
                  Educational materials and guides
                </p>
              </div>

              <div
                className={`cursor-pointer p-6 rounded-lg border transition-all ${
                  formData.needType === 'safeSpaces'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleOptionSelect('needType', 'safeSpaces')}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-800">Safe Spaces</h3>
                </div>
                <p className="text-sm text-gray-500 pl-14">
                  Guidance for creating safe environments
                </p>
              </div>
            </div>

            {validationErrors.needType && (
              <p className="text-red-500">{validationErrors.needType}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={!formData.needType}
                className="px-6 py-3 rounded-md text-white font-medium transition-all bg-blue-600 hover:bg-blue-700"
              >
                Next step
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Personal Information */}
        <div className={`transition-all duration-300 ${animation} ${currentStep === 2 ? 'block' : 'hidden'}`}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Personal Information
            </h2>
            <p className="text-center text-gray-500 mb-8">
              We need your details to create your account
            </p>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {validationErrors.name && (
                <p className="text-red-500">{validationErrors.name}</p>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
              {validationErrors.email && (
                <p className="text-red-500">{validationErrors.email}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={!formData.name || !formData.email}
                className={`px-6 py-3 rounded-md text-white font-medium transition-all ${
                  formData.name && formData.email
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next step
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Create Password */}
        <div className={`transition-all duration-300 ${animation} ${currentStep === 3 ? 'block' : 'hidden'}`}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Create Password
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Secure your account with a strong password
            </p>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {validationErrors.password && (
                <p className="text-red-500">{validationErrors.password}</p>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500">{validationErrors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword
                }
                className={`px-6 py-3 rounded-md text-white font-medium transition-all ${
                  formData.password &&
                  formData.confirmPassword &&
                  formData.password === formData.confirmPassword
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Next step
              </button>
            </div>
          </div>
        </div>

        {/* Step 4: Review & Complete */}
        <div className={`transition-all duration-300 ${animation} ${currentStep === 4 ? 'block' : 'hidden'}`}>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Review & Complete
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Review your information before completing registration
            </p>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Account Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Name:</p>
                  <p className="font-medium">{formData.name || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email:</p>
                  <p className="font-medium">{formData.email || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Service Type:</p>
                  <p className="font-medium">
                    {formData.needType
                      ? formData.needType.replace(/([A-Z])/g, ' $1').replace(/^./, (str) =>
                          str.toUpperCase()
                        )
                      : '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-600 rounded mt-0.5"
                />
                <span className="ml-3 text-gray-600 text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  . Cozy Cove is committed to creating safe learning environments for children.
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <button
                disabled={!formData.agreeTerms}
                onClick={handleCompleteRegistration}
                className={`px-6 py-3 rounded-md text-white font-medium transition-all ${
                  formData.agreeTerms
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Complete Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slide-in {
          animation: slideIn 0.3s forwards;
        }
        .slide-out {
          animation: slideOut 0.3s forwards;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default MultiStepForm;
