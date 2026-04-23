import React from "react";
import FAQSection from "./FAQSection";

function HolidayListDesc({ lightMode, currentYear }) {
  const faqHolidayList = [
    {
      head: `When are the stock market exchange holidays in ${currentYear}?`,
      content: (

        <p>
          The stock market exchange holidays in {currentYear} include New Year's Day, Good Friday, Labor Day, Christmas Day, etc. Check the complete holiday list on trade brains portal.
        </p>

      ),
    },
    {
      head: ` Are Indian stock markets closed on weekends?      `,
      content: (
        <>
          <p>
            Ans- Yes, stock markets are typically closed on weekends (Saturdays and Sundays) and also on recognized public holidays. Trading usually resumes on the following business day after a holiday or weekend.
          </p>
        </>
      ),
    },
    {
      head: `Is Indian stock market open on Good Friday ${currentYear}? `,
      content: (
        <>
          <p>
            Ans- Indian Stock Market is closed on Good Friday {currentYear}.
          </p>
        </>
      ),
    },
    {
      head: `4. Is there any holiday in stock market in India in ${currentYear}?`,
      content: (
        <>
          <p>
            Ans- Stock Market holiday list {currentYear} is as follows-
          </p>
          <p>• Republic Day, 26-01-{currentYear}</p>
          <p>• Mahashivratri, 26-02-{currentYear}</p>
          <p>• Holi, 14-03-{currentYear}</p>
          <p>• Id-Ul-Fitr, 31-03-{currentYear}</p>
          <p>• Shri Mahavir Jayanti, 10-04-{currentYear}</p>
          <p>• Dr. Baba Saheb Ambedkar Jayanti, 14-04-{currentYear}</p>
          <p>• Good Friday, 18-04-{currentYear}</p>
          <p>• Maharashtra Day, 01-05-{currentYear}</p>
          <p>• General Elections (Lok Sabha), 20-05-{currentYear}</p>
          <p>• Bakri Id, 17-06-{currentYear}</p>
          <p>• Moharram, 17-07-{currentYear}</p>
          <p>• Independence Day, 15-08-{currentYear}</p>
          <p>• Ganesh Chaturthi, 27-08-{currentYear}</p>
          <p>• Mahatma Gandhi Jayanti / Dussehra, 02-10-{currentYear}</p>
          <p>• Diwali Laxmi Pujan, 21-10-{currentYear}</p>
          <p>• Diwali Balipratipada, 22-10-{currentYear}</p>
          <p>• Prakash Gurpurb Sri Guru Nanak Dev, 05-11-{currentYear}</p>
          <p>• Christmas, 25-12-{currentYear}</p>
        </>
      ),
    },
  ];
  return (
    <section >
      <h2 className="fs-25-20 fw-700 mb-20 " style={{ opacity: "0.7" }}>
        FAQs
      </h2>
      <div className="w-100- mb-75">
        <FAQSection data={faqHolidayList} lightMode={lightMode} />
      </div>
    </section>
  );
}

export default HolidayListDesc;
