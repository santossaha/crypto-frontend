import React from 'react';
import Banner from "../components/banner/page";
import Link from 'next/link';
import p1 from "../assets/images/e-1.jpg";
import l1 from "../assets/images/link.svg";
import { IconThumbUp } from '@tabler/icons-react';
import "./style.css";
import Image from 'next/image';



const airdrop = () => {
  return (
    <>
       <div className="banner-section">
      <Banner/>
      <div className="info-area">
      <h2>Airdrop</h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since
      </p>
      <ul>
        <li><Link href="/" className='linkarea'>Home</Link></li>
        <li>/</li>
        <li>Airdrop</li>
      </ul>
    </div>
      </div>
      <div className="eventMain">
        <div className="container">
          <div className="subHeadline">
            <h3>Crypto Ongoing Airdrop</h3>
            <p>Participate in coin airdrops right on Coin Gabbar, see our full coin airdrop calendar.</p>
          </div>
          <div className="searchArea">
            <form action="">
              <div className="row">
                <div className="col-md-3 col-lg-3">
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
                    <select class="form-select form-control" aria-label="Default select example">
                      <option selected>Airdrop Type</option>
                      <option value="1">Airdrop</option>
                      <option value="2">NFTs</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2 col-lg-2">
                  <div className="form-group">
                    <select class="form-select form-control" aria-label="Default select example">
                      <option selected>Select Platform</option>
                      <option value="1">Android</option>
                      <option value="2">Giveaway</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="d-flex btn-area mb-20 gap-2">
                    <Link href="/" className='btn btn-primary w-100'>
                      Search
                    </Link>
                    <Link href="/" className='btn btn-primary w-100'>
                      Reset
                    </Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="eventTable">
              <div className="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Upvote</th>
                    <th scope="col">Winners</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Ends In</th>
                    <th scope="col">No. of Task</th>
                    <th scope="col" className='text-center'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network 123 </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

                    <td>
                      <div className="view-area" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div className='icon'>
                          <Image className="img" src={l1} alt="" />
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='gr-area'>
                      <Link href='/airdropitem'>
                      <span> <Image className="img" src={p1} alt="" /></span>
                      <div className="info">
                        <div className="area-1">
                        <p>NetworkSoileum Network </p>
                        <h6>$SOIL</h6>
                        </div>
                        <p className="btn">
                          Featured
                        </p>
                      </div>
                      </Link></td>
                    <td>Token</td>
                    <td><Link href="/" className="votebtn"><span>
                    <IconThumbUp stroke={2} width="16" height="16" />
                      </span>Upvote</Link></td>
                    <td>100</td>
                    <td>5,000.00</td>
                    <td>1 week</td>
                    <td>2</td>

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
    </>
  )
}

export default airdrop;
