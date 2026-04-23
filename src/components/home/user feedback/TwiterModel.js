// TwitterContainer.js
import React, { useEffect } from "react";

export const TwitterContainer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div className="twitter-embed">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-tweet-limit="5"
          data-chrome="noheader nofooter noborders"
          href="https://twitter.com/motapa_daires/status/1567400160736706560"
        >
          Tweets by HeyMarkKop
        </a>
      </div>
    </section>
  );
};
