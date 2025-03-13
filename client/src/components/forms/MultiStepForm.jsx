import { useState, useEffect } from 'react';
import * as Yup from "yup";
import { step1, step2, step3, step4 } from '../../validation/registerSchema';

const MultiStepForm = () => {
    // State to track the current step in the form
    const [currentStep, setCurrentStep] = useState(1);

    // State to store the form data
    const [formData, setFormData] = useState({
        needType: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [animation, setAnimation] = useState('');

    // Total number of steps in the form
    const totalSteps = 4;

    // Titles for each step
    const stepTitles = {
        1: 'Type of Service',
        2: 'Personal Information',
        3: 'Create Password',
        4: 'Review & Complete'
    };

    // Validation schemas for each step
    const validationSchemas = {
        1: step1,
        2: step2,
        3: step3,
        4: step4,
    };

    // Function to validate the form data for a given step
    const validateForm = async (step, data) => {
        try {
            // Validate the data against the schema for the current step
            await validationSchemas[step].validate(data, { abortEarly: false });
            
            // Clear any existing errors if validation passes
            setErrors({});
            return true;

        } catch (validationError) {
            // If validation fails, process the errors
            if (validationError instanceof Yup.ValidationError) {
                const newErrors = {};
                // Extract error messages from the Yup validation error
                validationError.inner.forEach(error => {
                    newErrors[error.path] = error.message;
                });
                // Set the extracted errors to the state
                setErrors(newErrors);
                return false;
            }
            return false;
        }
    };

    // Function to handle moving to the next step
    const handleNextStep = async () => {
        // Validate the form data for the current step
        const isValid = await validateForm(currentStep, formData);

        // If the form data is valid, proceed to the next step
        if (isValid) {
            // Trigger the slide-out animation
            setAnimation('slide-out');
            setTimeout(() => {
                // Update the current step to the next step
                setCurrentStep(prev => Math.min(prev + 1, totalSteps));
                // Trigger the slide-in animation
                setAnimation('slide-in');
            }, 300);
        }
    };

    // Function to handle moving to the previous step
    const handlePrevStep = () => {
        // Trigger the slide-out animation
        setAnimation('slide-out');

        setTimeout(() => {
            // Update the current step to the previous step
            setCurrentStep(prev => Math.max(prev - 1, 1));
            // Trigger the slide-in animation
            setAnimation('slide-in');
        }, 300);
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Update the form data with the new input value
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Function to handle option selection (e.g., radio buttons, select)
    const handleOptionSelect = (field, value) => {

        // Update the form data with the selected option
        setFormData({
            ...formData,
            [field]: value
        });
    };

    // useEffect hook to trigger the slide-in animation when the component mounts or the currentStep changes
    useEffect(() => {
        if (currentStep === 1) {
            setAnimation('slide-in');
        }
    }, [currentStep]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="w-full max-w-3xl mb-4 px-4 flex items-center justify-between">
                <div className="">
                    {currentStep > 1 ? (
                        <button onClick={handlePrevStep} className="mr-4 text-gray-500 hover:text-gray-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    ) : (
                        <div className="w-5 mr-4"></div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{stepTitles[currentStep]}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{currentStep} / {totalSteps}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center text-xs font-medium text-blue-600">
                        {currentStep}/{totalSteps}
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl overflow-hidden relative">
                {/* Step 1: Type of Service */}
                <div className={`transition-all duration-300 ${animation} ${currentStep === 1 ? 'block' : 'hidden'}`}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">What services do you need?</h2>
                        <p className="text-center text-gray-500 mb-8">Select the options that best match your needs</p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {/* Sensory Boxes */}
                            <div
                                className={`cursor-pointer p-6 rounded-lg border transition-all ${formData.needType === 'sensoryBoxes' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => handleOptionSelect('needType', 'sensoryBoxes')}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">Sensory Boxes</h3>
                                </div>
                                <p className="text-sm text-gray-500 pl-14">DIY and pre-made sensory kits for children</p>
                            </div>

                            {/* Routine Games */}
                            <div
                                className={`cursor-pointer p-6 rounded-lg border transition-all ${formData.needType === 'routineGames' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => handleOptionSelect('needType', 'routineGames')}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">Routine Games</h3>
                                </div>
                                <p className="text-sm text-gray-500 pl-14">Games and activities for daily routines</p>
                            </div>

                            {/* Resources */}
                            <div
                                className={`cursor-pointer p-6 rounded-lg border transition-all ${formData.needType === 'resources' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => handleOptionSelect('needType', 'resources')}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">Resources</h3>
                                </div>
                                <p className="text-sm text-gray-500 pl-14">Educational materials and guides</p>
                            </div>

                            {/* Safe Spaces */}
                            <div
                                className={`cursor-pointer p-6 rounded-lg border transition-all ${formData.needType === 'safeSpaces' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                                onClick={() => handleOptionSelect('needType', 'safeSpaces')}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-medium text-gray-800">Safe Spaces</h3>
                                </div>
                                <p className="text-sm text-gray-500 pl-14">Guidance for creating safe environments</p>
                            </div>
                        </div>
                        {/* Display validation errors for needType */}
                        {errors.needType && <p className="text-red-500">{errors.needType}</p>}
                        <div className="flex justify-end">
                            <button
                                onClick={handleNextStep}
                                className={`px-6 py-3 rounded-md text-white font-medium transition-all bg-blue-600 hover:bg-blue-700`}
                            >
                                Next step
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 2: Personal Information */}
                <div className={`transition-all duration-300 ${animation} ${currentStep === 2 ? 'block' : 'hidden'}`}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Personal Information</h2>
                        <p className="text-center text-gray-500 mb-8">We need your details to create your account</p>

                        {/* Full Name */}
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
                            {/* Display validation errors for name */}
                            {errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email Address */}
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
                            {/* Display validation errors for email */}
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNextStep}
                                className={`px-6 py-3 rounded-md text-white font-medium transition-all bg-blue-600 hover:bg-blue-700`}
                            >
                                Next step
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 3: Create Password */}
                <div className={`transition-all duration-300 ${animation} ${currentStep === 3 ? 'block' : 'hidden'}`}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create Password</h2>
                        <p className="text-center text-gray-500 mb-8">Secure your account with a strong password</p>

                        {/* Password */}
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
                            {/* Display validation errors for password */}
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
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
                            {/* Display validation errors for confirmPassword */}
                            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleNextStep}
                                className={`px-6 py-3 rounded-md text-white font-medium transition-all bg-blue-600 hover:bg-blue-700`}
                            >
                                Next step
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 4: Review and Complete */}
                <div className={`transition-all duration-300 ${animation} ${currentStep === 4 ? 'block' : 'hidden'}`}>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Review & Complete</h2>
                        <p className="text-center text-gray-500 mb-8">Please review your information before submitting</p>

                        {/* Display form data */}
                        <div className="mb-4">
                            <p><strong>Type of Service:</strong> {formData.needType}</p>
                            <p><strong>Full Name:</strong> {formData.name}</p>
                            <p><strong>Email Address:</strong> {formData.email}</p>
                        </div>

                        {/* Agree to Terms */}
                        <div className="mb-6 flex items-center">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleInputChange}
                                className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="text-gray-700 font-medium" htmlFor="agreeTerms">
                                I agree to the terms and conditions
                            </label>
                            {/* Display validation errors for agreeTerms */}
                            {errors.agreeTerms && <p className="text-red-500">{errors.agreeTerms}</p>}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevStep}
                                className="px-6 py-3 rounded-md text-gray-700 font-medium transition-all hover:bg-gray-100"
                            >
                                Previous
                            </button>
                            <button
                                className={`px-6 py-3 rounded-md text-white font-medium transition-all bg-green-600 hover:bg-green-700`}
                                onClick={() => {
                                    console.log("Form Data Submitted", formData);
                                }}
                            >
                                Complete Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
