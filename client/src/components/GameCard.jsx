export default function GameCard({ title = "Unknown Title", imageUrl }) {
    return (
      <div className="w-full md:w-[40rem] h-[22rem] md:h-[30rem] rounded-xl overflow-hidden
        transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <div
          className="w-full h-[70%]"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="w-full h-[30%] bg-white">
          <div className="p-2 md:p-4">
            <div 
              className="w-24 md:w-30 flex justify-center content-center rounded-sm text-xs md:text-sm bg-[rgba(119,224,199,0.38)] py-1 px-2 md:py-[0.225rem] mb-1 md:mb-[0.25rem]"
              style={{
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Online Games
            </div>
            <div className="text-xl md:text-3xl font-extrabold">{title}</div>
          </div>
        </div>
      </div>
    );
  }