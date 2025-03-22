import { useState, useRef, useEffect } from "react";
import { X, Minus, Send } from "lucide-react";
import SupportTextBox from "./SupportTextBox";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
    console.error("Missing API key! Ensure VITE_API_KEY is set in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function SupportBot() {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const dialogRef = useRef(null);
    const inputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const originalBodyOverflow = useRef("");

    const time = new Date();
    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        // Initial check
        checkMobile();
        
        // Add event listener for resize
        window.addEventListener('resize', checkMobile);
        
        // Store original body overflow on component mount
        originalBodyOverflow.current = document.body.style.overflow;
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkMobile);
            // Ensure body overflow is restored on component unmount
            document.body.style.overflow = originalBodyOverflow.current;
        };
    }, []);

    function handleToggleDialog() {
        if (isDialogVisible) {
            handleSmoothClose();
        } else {
            setIsDialogVisible(true);
        }
    }
    
    // Function to handle smooth closing with fade effect
    function handleSmoothClose() {
        // Start fade out animation
        setIsFadingOut(true);
        
        // Wait for animation to complete before actually closing
        setTimeout(() => {
            setIsDialogVisible(false);
            setIsFadingOut(false);
            
            // Fix the scrolling issue by first forcing a layout recalculation
            document.body.style.overflow = 'hidden';
            
            // Force a browser layout recalculation before setting to auto
            void document.body.offsetHeight;
            
            // Now restore scrolling
            document.body.style.overflow = originalBodyOverflow.current || 'auto';
            
            // Additionally, force focus away from dialog elements
            document.body.focus();
            
            // If scrolling is still an issue, force window to scroll to its current position
            // This trick often helps "unstick" frozen scroll states
            const currentScroll = window.scrollY;
            setTimeout(() => {
                window.scrollTo({
                    top: currentScroll,
                    behavior: 'auto'
                });
            }, 50);
        }, 300); // Match this timing with CSS transition duration
    }

    useEffect(() => {
        if (dialogRef.current) {
            if (isDialogVisible) {
                // Store current overflow before changing it
                if (!originalBodyOverflow.current) {
                    originalBodyOverflow.current = document.body.style.overflow || '';
                }
                
                dialogRef.current.showModal();
                inputRef.current?.focus();
                
                // Prevent body scrolling when dialog is open
                document.body.style.overflow = 'hidden';
            } else {
                dialogRef.current.close();
            }
        }
    }, [isDialogVisible]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [msgHistory]);

    async function handleUserMessage(userMessage) {
        if (!userMessage.trim()) return;

        setMsgHistory((prev) => [...prev, userMessage]);
        inputRef.current.value = "";
        setIsLoading(true);

        const aiResponse = await fetchGeminiResponse(userMessage);
        setIsLoading(false);
        setMsgHistory((prev) => [...prev, aiResponse]);
    }

    async function fetchGeminiResponse(userMessage) {
        try {
            const prompt = `You are a friendly AI assistant helping parents of children on the spectrum. Provide supportive and informative responses in no more than five sentences. User's question: "${userMessage}"`;

            console.log("Sending message to AI:", userMessage);

            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
            });

            console.log("🔍 Full API Response:", result);

            if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
                throw new Error("Invalid API response: No candidates found.");
            }

            const responseText = result.response.candidates[0]?.content?.parts?.[0]?.text;

            if (!responseText) {
                throw new Error("Invalid API response: No valid text received.");
            }

            console.log("Response received:", responseText);
            return responseText;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "I'm having trouble responding right now. Please try again later.";
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleUserMessage(e.target.value);
        }
    }

    function handleSendClick() {
        if (inputRef.current) {
            handleUserMessage(inputRef.current.value);
        }
    }

    return (
        <>
            {isDialogVisible && (
                <dialog
                    ref={dialogRef}
                    className={`fixed inset-0 ${isMobile ? 'w-full h-full m-0 rounded-none' : 'w-[95%] sm:w-[80%] md:w-1/2 lg:w-1/3 max-w-md h-[95%] sm:h-[80%] rounded-md sm:rounded-lg m-auto'} 
                    overflow-hidden z-50 bg-[#FFF9F0] p-0 
                    transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="sticky top-0 h-12 sm:h-14 bg-[#fa507e] flex justify-between items-center p-3 px-4 z-10">
                        <p className="text-white text-sm sm:text-base font-medium">Cozy Cove Online Assistant</p>
                        <div className="flex gap-3">
                            <Minus onClick={handleSmoothClose} className="text-white cursor-pointer w-5 h-5" />
                            <X onClick={handleSmoothClose} className="text-white cursor-pointer w-5 h-5" />
                        </div>
                    </div>
                    <div 
                        ref={chatContainerRef}
                        className="h-[calc(100%-96px)] sm:h-[calc(100%-112px)] p-3 sm:p-4 overflow-y-auto"
                    >
                        <p className="text-[#666666] text-center text-xs sm:text-sm mb-3">
                            Chat started at {formattedTime}
                        </p>
                        <div className="flex flex-col space-y-3">
                            {msgHistory.map((eachMsg, index) => (
                                <div key={index} className="w-full">
                                    {index % 2 === 0 ? (
                                        <div className="mr-3">
                                            <SupportTextBox text={eachMsg || "Error: Empty Message"} user={true} />
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="bg-[#fa507e] rounded-full w-6 sm:w-8 h-6 sm:h-8 text-white flex items-center justify-center text-xs sm:text-sm flex-shrink-0">
                                                P
                                            </div>
                                            <SupportTextBox text={eachMsg || "AI Response Missing"} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2">
                                    <div className="bg-[#fa507e] rounded-full w-6 sm:w-8 h-6 sm:h-8 text-white flex items-center justify-center text-xs sm:text-sm flex-shrink-0">
                                        P
                                    </div>
                                    <div className="bg-white rounded-lg p-2 text-xs sm:text-base relative">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sticky bottom-0 w-full h-12 sm:h-14 bg-[#FBEDCA] p-2 sm:p-3 flex items-center gap-2 z-10">
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            className="w-full h-9 sm:h-10 bg-white text-black p-2 sm:p-3 text-sm placeholder:text-xs sm:placeholder:text-sm rounded-md"
                            type="text"
                            placeholder="Type your message..."
                        />
                        <button 
                            onClick={handleSendClick}
                            className="bg-[#fa507e] text-white p-2 rounded-full flex-shrink-0 hover:bg-[#e54371] transition-colors"
                        >
                            <Send size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </dialog>
            )}

            {!isDialogVisible && (
                <div
                    onClick={handleToggleDialog}
                    className="cursor-pointer shadow-lg flex items-center justify-center rounded-full bg-[#fa507e] fixed text-white z-50 
                              w-auto min-w-24 max-w-36 px-3
                              h-8 text-xs right-2 bottom-2
                              sm:h-10 sm:px-4 sm:text-sm sm:right-4 sm:bottom-4
                              md:h-12 md:right-6 md:bottom-6"
                >
                    <p>Online Assistant</p>
                </div>
            )}
        </>
    );
}