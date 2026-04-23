import React, { useEffect } from "react";
import { Tweet } from "react-twitter-widgets";

function UserFeedbackSection({ lightMode }) {
  // useEffect(() => {
  //   eagerLoadTwitterLibrary();
  // }, [lightMode])
  const postIdsFirst = [
    "1567400160736706560",
    "1605835230769647616",
    "1567184246669713412",
    "1569637983246249984",
    '1605099853775716352',
    "1569982365212213249",
    "1570306911345704960",
    "1570405537719943176",
    "1571716020091629568", 
  ];
  const postIdsSecond = [
    "1570740107317223429",
    "1605839226133549056",
    "1571021656361152513",
    "1571125717328605185",
    // '1605094788427964417',
    // "1570824343462219777",
    "1570721991375859712",
    "1571366954379923457",
    "1571510476403802112",
  ];
  https: return (
    <section className="max-w mx-auto px-15 my-100 w-100 ">
      <div className="d-flex flex-col align-items-center justify-md-center">
        <h1 className="fs-40-32 fw-700 mb-20 text-md-center">
          What do our users say about us?
        </h1>
        <p className="fs-16-14 w-100-50 text-center">
          It's been just weeks since we re-launched Portal. We are overwhelmed
          with the love our users have shown
        </p>
      </div>
      <div className="my-30" style={{ minHeight: "500px" }}>
        <div className={`tweet-slider`}>
          <div
            className="slide-track"
            style={{ animationDirection: "reverse" }}
          >
            {postIdsFirst?.map((id, i) => (
              <div className="slide " key={i}>
                <Tweet
                  // tweetId="841418541026877441"
                  tweetId={id}
                  size="small"
                  options={{
                    width: "500",
                    height: "400",
                    theme: lightMode ? "light" : "dark",
                  }}
                  renderError={(_err) =>
                    "Could not load tweet! ...Your custom component here"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        {/* ///////////////////////////////// */}
        <div className={`tweet-slider`}>
          <div className="slide-track">
            {postIdsSecond?.map((id, i) => (
              <div className="slide " key={i}>
                <Tweet
                  tweetId={id}
                  size="medium"
                  options={{
                    width: "500",
                    theme: lightMode ? "light" : "dark",
                  }}
                  renderError={(_err) =>
                    "Could not load tweet! ...Your custom component here"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        {/* ///////////////////////////////////////// */}
      </div>
    </section>
  );
}

export default UserFeedbackSection;
