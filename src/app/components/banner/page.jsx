import React from 'react'
import Image from "next/image";
import p1 from "../../assets/images/p-1.jpg";
import Link from 'next/link';
import './style.css';

const page = () => {
  return (
    <div className="banner-area">
    <div className="pic-area">
    <Image className="img" src={p1} alt="detail picture"/>
    </div>
  </div>
  )
}

export default page;
