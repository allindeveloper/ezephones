import * as React from "react";
import { getTrackBackground, Range, useThumbOverlap } from "react-range";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ["#FFF", "#e0e0e0", "#e0e0e0", "#e0e0e0"];
const THUMB_SIZE = 42;

function ThumbLabel({ rangeRef, values, index }) {
  const [labelValue, labelStyle] = useThumbOverlap(
    rangeRef,
    values,
    index,
    1,
    " - ",
    (value) => `$${value}`
  );
  return (
    <div
      data-label={index}
      style={{
        display: "block",
        position: "absolute",
        top: "-28px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
        padding: "4px",
        borderRadius: "4px",
        backgroundColor: "transparent",
        whiteSpace: "nowrap",
        ...labelStyle,
      }}
    >
      {labelValue}
    </div>
  );
}

const DualSlider = ({ rtl, step,minRange, maxRange,rangeValues,rangeRef,onChange}) => {
//   const [values, setValues] = React.useState([25, 75]);
//   const rangeRef = React.useRef();
  const Thumb = ({ props, index, isDragged }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: `${THUMB_SIZE}px`,
        width: `${THUMB_SIZE}px`,
        borderRadius: "50px",
        backgroundColor: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // boxShadow: "0px 2px 6px #AAA",
      }}
    >
      <ThumbLabel rangeRef={rangeRef.current} values={rangeValues} index={index} />
      <div
        style={{
          height: "16px",
          width: "5px",
          backgroundColor: isDragged ? "#548BF4" : "#CCC",
        }}
      />
    </div>
  );
  const Track = ({ props, children }) => (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: "36px",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        ref={props.ref}
        style={{
          height: "5px",
          width: "100%",
          borderRadius: "4px",
          background: getTrackBackground({
            values: rangeValues,
            colors: COLORS,
            min: MIN,
            max: MAX,
            rtl,
          }),
          alignSelf: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
  return (
    <Range
      ref={rangeRef}
      values={rangeValues}
        onChange={onChange}
      renderThumb={Thumb}
      renderTrack={Track}
      step={step || STEP}
      min={minRange || MIN}
      max={maxRange || MAX}
      rtl={rtl}
    />
  );
};

export default DualSlider;
