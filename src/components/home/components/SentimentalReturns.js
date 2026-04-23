import Polldata from "../../Polldata";
import Returnsdata from "../../screener/components/Returnsdata";

function SentimentalReturns({ lightMode, returns, index_name, names }) {
  return (
    <div className="d-flex justify-content-between flex-col-row w-100 gap-10px" >
      <div className="w-49-100">
        <div >
          <Polldata lightMode={lightMode} symbol={index_name}/>
        </div>
      </div>
      <div className="w-49-100 ">
        <div>
          <Returnsdata
            lightMode={lightMode}
            index_name={index_name}
            returns={returns}
            names={names}
          />
        </div>
      </div>{" "}
    </div>
  );
}

export default SentimentalReturns;
