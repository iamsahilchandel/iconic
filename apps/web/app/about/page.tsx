import React from "react";

export default function About() {
  const SOMETHING = "Hello World";

  const handleClick = () => {
    console.log("clicked");
  };

  return <div onClick={handleClick}>{SOMETHING}</div>;
}
