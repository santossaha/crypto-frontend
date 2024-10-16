import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import p1 from "../../assets/images/logo.png";
import m1 from "../../assets/images/facebook.svg";
import m2 from "../../assets/images/twitter.svg";
import m3 from "../../assets/images/instagram.svg";

const page = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-6">
              <div className="info-area area1">
                <div className="logo-area">
                  <Image className="img" src={p1} alt="logo" width={150} height={50} />
                </div>
                <div className="textform">
                  <input type="text" className='form-control' />
                  <div className="btn">Submit</div>
                </div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure ea totam quos?</p>
                <div className="mediaIcon">
                  <ul>
                    <li>
                      <Link className="icon" href="/">
                        <Image className="img" src={m1} alt="s-media" width={30} height={30} />
                      </Link>
                    </li>
                    <li>
                      <Link className="icon" href="/">
                        <Image className="img" src={m2} alt="logo" width={30} height={30} />
                      </Link>
                    </li>
                    <li>
                      <Link className="icon" href="/">
                        <Image className="img" src={m3} alt="logo" width={30} height={30} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="info-area">
                <h4>Useful Link</h4>
                <ul className='linkarea'>
                  <li>
                    <Link className="pagename" href="/">Home</Link>
                  </li>
                  <li>
                    <Link className="pagename" href="/">About</Link>
                  </li>
                  <li>
                    <Link className="pagename" href="/">Blog</Link>
                  </li>
                  <li>
                    <Link className="pagename" href="/">News</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="info-area">
                <h4>INFORMATION</h4>
                <ul className='linkarea'>
                  <li>
                    <Link className="pagename" href="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link className="pagename" href="/">Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link className="pagename" href="/">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyarea">
        <div className="container">
          <p>Copyright &copy; 2024 Crupto News. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default page;
