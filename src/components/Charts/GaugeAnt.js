import React, { useEffect, useMemo, useRef } from "react";
// import { Gauge } from "@ant-design/plots";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";

// const {Gauge} = dynamic(() => import('@ant-design/plots'), {
//   loading: () => 'Loading...',
// })
const Gauge = dynamic(
  () => import("@ant-design/plots").then(({ Gauge }) => Gauge),
  { ssr: false }
);

function GaugeAnt({
  percetage,
  colors,
  labelData,
  id,
  width,
  height = 300,
  subTickLine = 3,
  labelLimit,
  labelUnit,
  portfolio,
}) {
  const Normalizer = (min, max) => ({
    normalize: (x) => min + x * (max - min),
    denormalize: (x) => (x + max) / (max - min),
  });

  const gaugeNormalizer = useMemo(() => {
    if (!labelLimit) return null;
    return Normalizer(...labelLimit);
  }, [labelLimit]);
  const graphRef = useRef(null);
  const config = {
    // percent: percetage,
    percent: labelLimit ? gaugeNormalizer.denormalize(percetage) : percetage,
    range: {
      ticks: [0, 1],
      //   ['#8A2387',#E94057,#51CF43,#1AFF00,#F27121,#E94057,#8A2387]
      //   color: ["l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78"],
      color: colors,
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#978f8f",
        },
      },
      pin: {
        style: {
          stroke: "#978f8f",
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          if (labelLimit) {
            const num = gaugeNormalizer.normalize(+v);
            return `${num > 0 ? `+${num}%` : num + "%"}`;
          } else {
            return id === "DPR" ? Number(v) * 100 : Number(v) * 10;
          }
        },
      },
      subTickLine: {
        count: subTickLine,
      },
    },
    statistic: labelData,
    onReady: (plot) => {
      graphRef.current = plot;
    },
  };

  return (
    <div className="d-flex justify-content-center">
      <Gauge {...config} height={portfolio ? 200 : height} width={width} />
    </div>
  );
}

export default GaugeAnt;
