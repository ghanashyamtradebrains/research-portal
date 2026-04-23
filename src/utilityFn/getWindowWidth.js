import { useState, useEffect } from "react";
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState("");

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return windowWidth;
}

export default useWindowWidth;
