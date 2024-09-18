import Link from 'next/link';
import React from 'react';
import Banner from "../components/banner/page";
import p1 from "../assets/images/e-1.jpg";
import e1 from "../assets/images/edit.svg";
import "./style.css";
import Image from 'next/image';

const page = () => {
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>ICO / IDO</h2>
          <ul>
            <li><Link href="/" className='linkarea'>Home</Link></li>
            <li>/</li>
            <li>ICO / IDO</li>
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
                      <option selected>ICO / IDO</option>
                      <option value="1">ICO / IDO</option>
                      <option value="2">ICO / IDO</option>
                    </select>
                  </div>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="btn-area mb-3">
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
                  <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                  <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                  <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                  <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                  <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                    <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                  <td className='gr-area'> <span> <Image className="img" src={p1} alt="" /></span><p>RaysX</p></td>
                  <td>ICO</td>
                    <td>On Website</td>
                    <td>13002</td>
                    <td>2 Days</td>
                    <td>500.00 M</td>
                    <td>500.00 M</td>
                    <td>TBA</td>
                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={e1} alt="" />
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
    </div>
  )
}

export default page;

