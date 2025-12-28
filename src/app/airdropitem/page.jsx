import React from "react";
import Banner from "../components/banner/page";
import p1 from "../assets/images/man.jpg";
import "./style.css";
import Link from "next/link";
import Image from "next/image";
import { IconCalendarMonth } from '@tabler/icons-react';
import { IconUpload } from '@tabler/icons-react';
import { IconArrowBigUp } from '@tabler/icons-react';
import { IconArrowForward } from '@tabler/icons-react';

export const metadata = {
  title: "Airdrop Item - Crypto Frontend",
  description: "Detailed information about a specific airdrop. Learn how to participate and claim your free crypto tokens.",
};
import { IconArrowBackUp } from '@tabler/icons-react';

const page = () => {
  return (
    <>
    <div className="bodymain2">
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Airdrop Details</h2>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/airdrop" className="linkarea">
              Airdrop
              </Link>
            </li>
            <li>/</li>
            <li>NetworkSoileum Network</li>
          </ul>
        </div>
      </div>
      <div className="detail-main area-2">
        <div className="container">
          <div className="detail-info-main">
            <div className="headarea">
              <div className="area1">
                <h4>NetworkSoileum Network</h4>
                <p>
                  <span className="me-1">
                  <IconCalendarMonth stroke={2} width='20px' />
                  </span>
                  Token Airdrop : 05-09-2024 - 15-09-2024 
                </p>
              </div>
              <div className="area2">
                <Link href="/event-form" className="btn">
                 Add/Edit Airdrop
                </Link>
              </div>
            </div>
            <div className="about-area">
              <div className="infobax-area02">
                <div className="headarea">
                  <h5>Crypto Airdrops</h5>
                  <h6>05-09-2024 To 15-09-2024</h6>
                </div>
                <div className="boxarea03">
                    <div className="row">
                      <div className="col-md-6">
                      <ul className="area-1">
                      <li>Airdrop Platform<span>Gleam</span></li>
                      <li>Total Token Supply<span>3,000,000,000.00</span></li>
                      <li>Total Airdrop Qty<span>150,000</span></li>
                    </ul>
                      </div>
                      <div className="col-md-6">
                      <ul className="area-1">
                      <li>Airdrop Value (USD)<span>150000</span></li>
                      <li>Number Of Winners<span>5000</span></li>
                      <li>Winner announcement<span>TBA</span></li>
                    </ul>
                      </div>
                    </div>   
                </div>
              </div>
              <div className="area1">
              <h4>NetworkSoileum Network Airdrop - Step by Step Guide</h4>
              <ul className="infoarea01">
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              </ul>
              </div>
            </div>
            <div className="about-area">
              <h4>NetworkSoileum Network Airdrop - Step by Step Guide</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem,
                 aliquid dolorum iusto incidunt quaerat aspernatur ut culpa quisquam a deserunt nisi!
                  Ex, velit sunt?
              </p>
              <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ab inventore. Ullam,
                exercitationem provident, fugit amet assumenda nam explicabo libero ea tempora a dicta
                 laboriosam, delectus sequi inventore! Perspiciatis, praesentium! Nobis neque nam molestias
                  illo delectus dolores aut impedit hic?
              </p>
            </div>
            <form action="">
              <div className="formbox">
                <h4>Discussion</h4>
                <div className="userarea">
                  <div className="picArea">
                    <Image className="img" src={p1} alt="slider1" />
                  </div>
                  <div className="form-group">
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="form-control"
                      placeholder="write your comment..."
                    ></textarea>
                    <Link href="/" className="btn">
                    <span><IconUpload stroke={2} width="16px" /></span>
                      Post
                    </Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="post-box">
              <div className="user-area">
                <div className="usericon">
                <Image className="img" src={p1} alt="slider1" />
                </div>
                <div className="userinfo">
                  <div>
                  <h6>Jhon Deo</h6>
                  <p>1.2k Subscribers</p>
                  </div>
                  <Link href="/" className="btn">Follow</Link>
                </div>
              </div>
              <div className="post-area">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Aut cum laborum at odit a velit.</p>
              </div>
              <div className="share-area">
                <ul>
                  <li><Link href="/" className="btn">2<span><IconArrowBigUp stroke={2} width="14px" /></span>Upvote</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowForward stroke={2} width="14px"  /></span>Share</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowBackUp stroke={2} width="14px"  /></span>Reply</Link></li>
                </ul>
              </div>
            </div>
            <div className="post-box">
              <div className="user-area">
                <div className="usericon">
                <Image className="img" src={p1} alt="slider1" />
                </div>
                <div className="userinfo">
                  <div>
                  <h6>Jhon Deo</h6>
                  <p>1.2k Subscribers</p>
                  </div>
                  <Link href="/" className="btn">Follow</Link>
                </div>
              </div>
              <div className="post-area">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Aut cum laborum at odit a velit.</p>
              </div>
              <div className="share-area">
                <ul>
                  <li><Link href="/" className="btn">2<span><IconArrowBigUp stroke={2} width="14px" /></span>Upvote</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowForward stroke={2} width="14px"  /></span>Share</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowBackUp stroke={2} width="14px"  /></span>Reply</Link></li>
                </ul>
              </div>
            </div>
            <div className="post-box">
              <div className="user-area">
                <div className="usericon">
                <Image className="img" src={p1} alt="slider1" />
                </div>
                <div className="userinfo">
                  <div>
                  <h6>Jhon Deo</h6>
                  <p>1.2k Subscribers</p>
                  </div>
                  <Link href="/" className="btn">Follow</Link>
                </div>
              </div>
              <div className="post-area">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Aut cum laborum at odit a velit.</p>
              </div>
              <div className="share-area">
                <ul>
                  <li><Link href="/" className="btn">2<span><IconArrowBigUp stroke={2} width="14px" /></span>Upvote</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowForward stroke={2} width="14px"  /></span>Share</Link></li>
                  <li><Link href="/" className="btn">0<span><IconArrowBackUp stroke={2} width="14px"  /></span>Reply</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default page;
