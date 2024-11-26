import "./style.css";
import React from "react";
import Banner from "@/app/components/banner/page";
import Image from "next/image";
import Link from "next/link";
import { e1, e2, e3, e4, p1 } from "../assets/images/images";

const CategoriesPage = async ({ params }) => {
  const slug = (await params).categories;

  return (
    <>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2 style={{ textTransform: "capitalize" }}>
            Welcome to our {slug}{" "}
          </h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since
          </p>
          <ul>
            <li>
              <Link href="/" className="linkarea">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="#" className="linkarea">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li>Categories Details</li>
          </ul>
        </div>
      </div>
      <div className="blog_detail_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-8">
              <div className="section-1">
                <div className="details-area">
                  <div className="pic-area">
                    <Image className="img" src={p1} alt="detail picture" />
                  </div>
                  <div className="info-area">
                    <h6>
                      <span>DIGITAL MARKETING</span>March 20, 2024
                    </h6>
                    <h4>
                      The Great Debate: Bitcoin vs. Gold: Analyzing the
                      Diverging Paths of Store of Value Assets in an Era of
                      Economic Uncertainty, Inflationary Pressures, and Growing
                      Institutional Appetite for Digital Gold
                    </h4>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum
                      comes from sections 1.10.32 and 1.10.33 of de Finibus
                      Bonorum et Malorum (The Extremes of Good and Evil) by
                      Cicero, written in 45 BC. This book is a treatise on the
                      theory of ethics, very popular during the Renaissance. The
                      first line of Lorem Ipsum, Lorem ipsum dolor sit amet..,
                      comes from a line in section 1.10.32.
                    </p>

                    <p>
                      The standard chunk of Lorem Ipsum used since the 1500s is
                      reproduced below for those interested. Sections 1.10.32
                      and 1.10.33 from de Finibus Bonorum et Malorum by Cicero
                      are also reproduced in their exact original form,
                      accompanied by English versions from the 1914 translation
                      by H. Rackham.
                    </p>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="newpostarea">
                <div className="subHeadline">
                  <h3>Latest News</h3>
                </div>
                <div className="post-area">
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={p1} alt="detail picture" />
                    </div>
                  </Link>
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e4} alt="detail picture" />
                    </div>
                  </Link>
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e3} alt="detail picture" />
                    </div>
                  </Link>
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e1} alt="detail picture" />
                    </div>
                  </Link>
                  <Link href="/" className="postcard">
                    <div className="info-area">
                      <h6>
                        <span>DIGITAL MARKETING</span>March 20, 2024
                      </h6>
                      <h4>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Pariatur, optio tenetur alias nesciunt sint dolor?
                      </h4>
                    </div>
                    <div className="pic-area">
                      <Image className="img" src={e2} alt="detail picture" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
