import { useEffect } from "react";
import { useLocation } from "react-router-dom";

{/* Stops react router from on page load placing the view at the bottom on the page */}
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;