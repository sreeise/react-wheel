import React from "react";

// Outer most component for iterating through React.Children
const Mapper = (props) => {
  const { children } = props;
  return (
    <div style={{ "alignItems": "center", "maxWidth": "100%" }}>
      {React.Children.map(children, (child, index) => {
        if (child !== null) {
          return (
            <div key={index}>
              {child}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Mapper;
