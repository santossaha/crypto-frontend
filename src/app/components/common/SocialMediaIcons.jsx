"use client";
import React from "react";
import { motion } from "framer-motion";

const SocialMediaIcons = ({ appData, size = "small" }) => {
  const iconSize = size === "small" ? "w-4 h-4" : "w-6 h-6";
  const buttonSize = size === "small" ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className="flex items-center gap-2">
      {/* Facebook */}
      {appData?.facebook && (
        <motion.a
          href={appData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300`}
          
          transition={{ type: "tween", duration: 0.4 }}
          title="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSize} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </motion.a>
      )}

      {/* Instagram */}
      {appData?.instagram && (
        <motion.a
          href={appData.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} rounded-xl bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition-all duration-300`}
          
          transition={{ type: "tween", duration: 0.4 }}
          title="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSize} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </motion.a>
      )}

      {/* LinkedIn */}
      {appData?.linkedin && (
        <motion.a
          href={appData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} rounded-xl bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300`}
          
          transition={{ type: "tween", duration: 0.4 }}
          title="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSize} text-white`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.003V9h3.104v1.561h.044c.432-.818 1.49-1.683 3.065-1.683 3.276 0 3.878 2.155 3.878 4.958v6.616zM5.337 7.433a1.804 1.804 0 110-3.608 1.804 1.804 0 010 3.608zM6.956 20.452H3.716V9h3.24v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z" />
          </svg>
        </motion.a>
      )}
    
      {/* Twitter / X */}
      {appData?.x && (
        <motion.a
          href={appData.x}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} rounded-xl bg-black flex items-center justify-center text-white hover:bg-rose-600 transition-all duration-300`}
          
          transition={{ type: "tween", duration: 0.4 }}
          title="X / Twitter"
        >
           <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.503 11.24h-6.657l-5.21-6.82-5.964 6.82H1.688l7.73-8.84L1.25 2.25h6.827l4.71 6.23 5.457-6.23z"/>
            </svg>
        </motion.a>
      )}



      {/* YouTube */}
      {appData?.youtube && (
        <motion.a
          href={appData.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} rounded-xl bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300`}
          
          transition={{ type: "tween", duration: 0.4 }}
          title="YouTube"
        >
            <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.386.566a2.997 2.997 0 0 0-2.112 2.12C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.112 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.386-.566a2.997 2.997 0 0 0 2.112-2.12C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/>
  </svg>
        </motion.a>
      )}
    </div>
  );
};

export default SocialMediaIcons;
