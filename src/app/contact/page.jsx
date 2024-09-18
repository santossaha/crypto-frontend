import Link from 'next/link';
import React from 'react';
import Banner from "../components/banner/page";
import p1 from "../assets/images/contacticon.svg";
import e1 from "../assets/images/call-calling.svg";
import e2 from "../assets/images/mail-1.svg";
import e3 from "../assets/images/map.svg";

import "./style.css";
import Image from 'next/image';

const page = () => {
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Contact</h2>
          <ul>
            <li><Link href="/" className='linkarea'>Home</Link></li>
            <li>/</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="contact-section">
        <div className="row">
          <div className="col-md-6 col-lg-5">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <div className="imgarea">
                <Image src={p1} alt="" className='img' />
              </div>
              <ul>
                <li>
                  <div className="info-group">
                    <p>General Inquiries</p>
                    <h6><span><Image src={e1} alt="" className='img' /></span>1800 419 20001</h6>
                  </div>
                </li>
                <li>
                  <div className="info-group">
                    <p>Mail Id</p>
                    <h6><span><Image src={e2} alt="" className='img' /></span>demo@gmail.in</h6>
                  </div>
                </li>
                <li>
                  <div className="info-group">
                    <p>Address</p>
                    <h6><span><Image src={e3} alt="" className='img' /></span>Demo street, New town, 24, Kolkata</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-7">
            <form action="">
            <h3>Contact info</h3>
            <div className="form-group">
              <label htmlFor="">First Name</label>
                    <input type="text" className='form-control' placeholder='Enter first name' />
                  </div>

                  <div className="form-group">
              <label htmlFor="">Last Name</label>
                    <input type="text" className='form-control' placeholder='Enter last name' />
                  </div>

                  <div className="form-group">
              <label htmlFor="">Phone Number</label>
                    <input type="text" className='form-control' placeholder='Enter phone Number' />
                  </div>

                  <div className="form-group">
              <label htmlFor="">Email Id</label>
                    <input type="email" className='form-control' placeholder='Enter mail ID' />
                  </div>
                  <div className="form-group">
              <label htmlFor="">Address</label>
              <textarea name="" id="" className='form-control' placeholder='Write your address' col='3'></textarea>
                  </div>
                  <div className="btn-area my-3">
                    <Link href='' className="btn btn-primary">Submit</Link>
                  </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default page;

