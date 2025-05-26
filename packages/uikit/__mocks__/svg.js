// In __mocks__/svg.js
import React from "react";
const Svg = React.forwardRef((props, ref) => <svg ref={ref} {...props} />);
export default Svg;
