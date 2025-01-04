"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "../assets/images/box_dark.svg";

const LogoWithTextAnimation = () => {
  const [firstAnimation, setFirstAnimation] = useState<number>(0);

  return (
    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>

      <motion.img
        src={logo}
        alt="Logo"
        initial={{ opacity: 0, x: "50%", zIndex: 2 }}
        animate={{ opacity: 1, x: 10, zIndex: 2 }}
        transition={{ duration: 1 }}
        style={{ width: "75px", height: "75px", marginRight: "10px" }}
        onAnimationComplete={() => setFirstAnimation(1)}
      />
      
      <motion.div
        initial={{ opacity: 0, x: -20, zIndex: 1 }}
        animate={{ opacity: [0, 1], x: 0, zIndex: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className={`w-[150px]`}
      >
        <h2 className="text-left font-anta indent-4">
          G - SUPRI
          <p className="text-[12px] text-left ">By Aahbrant</p>
        </h2>
      </motion.div>
    </div>
  );
};

export default LogoWithTextAnimation;
