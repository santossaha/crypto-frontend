"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Banner from "../components/banner/page";
import l1 from "../assets/images/link.svg";
import "./style.css";
import Image from "next/image";
import axios from "axios";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://13.233.93.31/new-crypto-blog/public/api/get-events"
        );
        setEvents(response.data[0]);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Welcome to our Event</h2>
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
            <li>Event</li>
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
                      class="form-select form-control"
                      aria-label="Default select example"
                    >
                      <option selected>Upcomming</option>
                      <option value="1">Previous</option>
                      <option value="2">Trending</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                    <div className="form-group">
                      <select
                        class="form-select form-control"
                        aria-label="Default select example"
                      >
                        <option selected>India</option>
                        <option value="1">USA</option>
                        <option value="2">UK</option>
                      </select>
                    </div>
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
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      events.map((event) => (
                        <tr key={event.id}>
                          <td className="text-warning">
                            {new Date(event.start_date).toLocaleDateString()} -
                            <br />
                            {new Date(event.end_date).toLocaleDateString()}
                          </td>
                          <td className="gr-area">
                            <span>
                              <Image
                                className="img"
                                src={event.image}
                                alt={event.title}
                                width={50}
                                height={50}
                              />
                            </span>
                            <p>{event.title}</p>
                          </td>
                          <td>{event.location}</td>
                          <td>
                            <div
                              className="view-area"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <div className="icon">
                                <Image className="img" src={l1} alt="" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <nav aria-label="..." class="d-flex justify-content-end me-3">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <span class="page-link">Previous</span>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item" aria-current="page">
                      <span class="page-link">2</span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
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
      {/* modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
