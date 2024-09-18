import Link from 'next/link';
import React from 'react';
import Banner from "../components/banner/page";
import p1 from "../assets/images/e-1.jpg";
import l1 from "../assets/images/link.svg";
import "./style.css";
import Image from 'next/image';

const page = () => {
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Welcome to our Event</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since
          </p>
          <ul>
            <li><Link href="/" className='linkarea'>Home</Link></li>
            <li>/</li>
            <li>Event</li>
          </ul>
        </div>
      </div>

      <div className="eventMain">
        <div className="container">
          <div className="subHeadline">
            <h3>Our Upcoming Events</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Vitae animi tempora harum corrupti unde, doloribus nulla
              tenetur illo nobis consequuntur.</p>
          </div>
          <div className="searchArea">
            <form action="">
              <div className="row">
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <input type="text" className='form-control' placeholder='Search' />
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                    <select class="form-select form-control" aria-label="Default select example">
                      <option selected>Upcomming</option>
                      <option value="1">Previous</option>
                      <option value="2">Trending</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                  <div className="form-group">
                    <select class="form-select form-control" aria-label="Default select example">
                      <option selected>India</option>
                      <option value="1">USA</option>
                      <option value="2">UK</option>
                    </select>
                  </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="btn-area mb-20">
                    <Link href="/" className='btn btn-primary w-100'>
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
                  <tr>
                    <td className='text-warning'>18-Sep-24 -<br/>19-Sep-24</td>
                    <td className='gr-area'><Link href='/event-details'><span> <Image className="img" src={p1} alt="" /></span><p>TOKEN2049 | The Premier Crypto Event</p></Link></td>
                    <td>Kolkata, Newtown, West Bengal, India</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='text-warning'>18-Sep-24 -<br/>19-Sep-24</td>
                  <td className='gr-area'><Link href='/event-details'><span> <Image className="img" src={p1} alt="" /></span><p>TOKEN2049 | The Premier Crypto Event</p></Link></td>
                  <td>Kolkata, Newtown, West Bengal, India</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='text-warning'>18-Sep-24 -<br/>19-Sep-24</td>
                  <td className='gr-area'><Link href='/event-details'><span> <Image className="img" src={p1} alt="" /></span><p>TOKEN2049 | The Premier Crypto Event</p></Link></td>
                  <td>Kolkata, Newtown, West Bengal, India</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='text-warning'>18-Sep-24 -<br/>19-Sep-24</td>
                  <td className='gr-area'><Link href='/event-details'><span> <Image className="img" src={p1} alt="" /></span><p>TOKEN2049 | The Premier Crypto Event</p></Link></td>
                  <td>Kolkata, Newtown, West Bengal, India</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='text-warning'>18-Sep-24 -<br/>19-Sep-24</td>
                  <td className='gr-area'><Link href='/event-details'><span> <Image className="img" src={p1} alt="" /></span><p>TOKEN2049 | The Premier Crypto Event</p></Link></td>
                  <td>Kolkata, Newtown, West Bengal, India</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                
                </tbody>
              </table>
              <nav aria-label="..." class="d-flex justify-content-end me-3">
  <ul class="pagination">
    <li class="page-item disabled">
      <span class="page-link">Previous</span>
    </li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item" aria-current="page">
      <span class="page-link">2</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default page;
