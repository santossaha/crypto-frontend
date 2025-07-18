"use client";
import Link from "next/link";
import React, { useState } from "react";
import Banner from "../components/banner/page";
import p1 from "../assets/images/e-1.jpg";
import e1 from "../assets/images/edit.svg";
import "./style.css";
import Image from "next/image";

const Page = () => {
  const [eventType, setEventType] = useState("Upcoming");
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>ICO / IDO</h2>
          <ul>
            <li>
              <Link href="/" className="linkarea" />
              Home
            </li>
            <li>/</li>
            <li>ICO / IDO</li>
          </ul>
        </div>
      </div>
      <div className="eventMain">
        <div className="container">
          <div className="subHeadline">
            <h3>Our Upcoming Events</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              animi tempora harum corrupti unde, doloribus nulla tenetur illo
              nobis consequuntur.
            </p>
          </div>
          <div className="searchArea">
            <form action="">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                    <select
                      className="form-select form-control"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Previous">Previous</option>
                      <option value="Trending">Trending</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                      defaultValue="" 
                    >
                      <option value="">ICO / IDO</option>
                      <option value={1}>ICO / IDO 1</option>
                      <option value={2}>ICO / IDO 2</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-2 col-lg-2">
                  <div className="btn-area mb-20">
                    <Link href="/" className="btn btn-primary w-100">
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="eventTable">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Stage</th>
                      <th scope="col">Launchpad</th>
                      <th scope="col">Upvotes</th>
                      <th scope="col">End In</th>
                      <th scope="col">Tokens for Sale</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Fundraising Goal</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="gr-area">
                        {" "}
                        <span>
                          {" "}
                          <Image src={p1} alt="Event" width={20} height={20} />
                        </span>
                        <p>RaysX</p>
                      </td>
                      <td>ICO</td>
                      <td>On Website</td>
                      <td>13002</td>
                      <td>2 Days</td>
                      <td>500.00 M</td>
                      <td>500.00 M</td>
                      <td>TBA</td>
                      <td>
                        <div
                          className="view-area"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="icon">
                            <Image
                              src={e1}
                              alt="Edit Icon"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  aria-label="..."
                  className="d-flex justify-content-end me-3"
                >
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item" aria-current="page">
                      <span className="page-link">2</span>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
