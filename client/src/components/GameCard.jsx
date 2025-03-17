export default function GameCard({ title = "Unknown Title", onClick }) {
    return (
    <div onClick={onClick} 
            className="w-[40rem] h-[30rem] rounded-xl overflow-hidden 
            transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <div className="bg-blue-400 w-full h-[70%]"></div>
            <div className="w-full h-[30%] bg-white">
                <div style={{ padding: "1rem" }}>
                    <div style={{ 
                            backgroundColor: "rgba(119, 224, 199, .38)", 
                            padding: "0.225rem",
                            fontFamily: "'Roboto', sans-serif",
                            marginBottom: "0.25rem",
                        }}
                        className="w-30 flex justify-center content-center rounded-sm text-sm">
                            Online Games
                        </div>
                    <div className="text-3xl font-extrabold">{title}</div>
                </div>
            </div>
        </div>
    );
}
