import errorImageSrc from "../../assets/images/error.png"

const ErrorFallback = () => (
    <div className="errorFallbackContainer">
      <img src={errorImageSrc} alt="" />

      <div>
          <h2>Oops! Something went wrong.</h2>
          <button>Try again</button>
      </div>

    </div>
  );
  
  export default ErrorFallback;
  