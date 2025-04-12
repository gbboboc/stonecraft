"use client";

import { useEffect } from "react";

export function BodyAttributes() {
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.setAttribute("br-mode", "off");
      body.setAttribute("saccades-color", "");
      body.setAttribute("fixation-strength", "2");
      body.setAttribute("saccades-interval", "0");
      body.style.setProperty("--fixation-edge-opacity", "80%");
      body.style.setProperty("--br-line-height", "1");
      body.style.setProperty("--br-boldness", "600");
    }
  }, []);

  return null;
}
