import React from "react";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

const View = (props) => {
  let classes = "fas fa-eye";
  if (!props.liked) classes += "-o";
  return (
    <RemoveRedEyeIcon
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default View;
