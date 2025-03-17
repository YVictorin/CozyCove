import { useState, useRef, useEffect } from "react";
import { X, Minus } from "lucide-react";
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
    const dialogRef = useRef(null);
    const inputRef = useRef(null);

    const time = new Date();
    const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    function handleToggleDialog() {
        setIsDialogVisible((prev) => !prev);
    }

    useEffect(() => {
        if (dialogRef.current) {
            if (isDialogVisible) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [isDialogVisible]);

    async function handleUserMessage(userMessage) {
        if (!userMessage.trim()) return;

        setMsgHistory((prev) => [...prev, userMessage]);
        inputRef.current.value = "";

        const aiResponse = await fetchGeminiResponse(userMessage);
        setMsgHistory((prev) => [...prev, aiResponse]);
    }

    async function fetchGeminiResponse(userMessage) {
        try {
            const prompt = `You are a friendly AI assistant helping parents of children on the spectrum. Provide supportive and informative responses. User's question: "${userMessage}"`;

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

            console.log(" Response received:", responseText);
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

    return (
        <>
            {isDialogVisible && (
                <dialog ref={dialogRef} className="flex flex-col w-1/4 h-[80%] rounded-lg overflow-hidden translate-y-8 translate-x-[74dvw] fixed z-10 bg-[#FFF9F0]"> 
                    <div className="h-[6%] bg-[#26A5B3] flex justify-between p-3"> 
                        <p className="text-white">Poppin Online Assistant</p>
                        <div className="flex gap-2">
                            <Minus onClick={handleToggleDialog} className="text-white cursor-pointer" />
                            <X onClick={handleToggleDialog} className="text-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="h-[90%] p-4 overflow-y-auto">
                        <p className="text-[#666666] text-center mb-3">Chat started at {formattedTime}</p> 
                        <div className="flex flex-col">
                            {msgHistory.map((eachMsg, index) => (
                                <div key={index} className="w-full">
                                    {index % 2 === 0 ? (
                                        <div className="mr-3">
                                            <SupportTextBox text={eachMsg || " Error: Empty Message"} user={true} />
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="bg-[#26A5B3] rounded-full w-10 h-10 text-white flex items-center justify-center">P</div>
                                            <SupportTextBox text={eachMsg || "AI Response Missing"} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-32 bg-[#FBEDCA] p-3">
                        <input ref={inputRef} onKeyDown={handleKeyDown} className="w-full h-12 bg-white text-black p-3 placeholder:text-lg" type="text" placeholder="Type your message..." />
                    </div>
                </dialog>
            )}

            {!isDialogVisible && (
                <div onClick={handleToggleDialog} className="w-[10%] cursor-pointer shadow-lg h-15 p-3 text-white flex justify-center items-center rounded-3xl bg-[#26A5B3] fixed right-[1%] bottom-[1%] z-50"> 
                    <p>Online Assistant</p>
                </div>
            )}
        </>
    );
}