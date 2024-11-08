import Link from 'next/link';
import React from 'react'
import Banner from "../components/banner/page";
import './style.css';



const addairdrop = () => {
  return (
    <div>
      <div className="banner-section">
        <Banner />
        <div className="info-area">
          <h2>Add Edit Airdrop</h2>
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
            <li>Add Edit Airdrop</li>
          </ul>
        </div>
      </div>
      <div className="airdrop-form-item">
        <div className="container">
          <div className="airdrop-form-area">
            <div className="shortinfo">
              <h3>Airdrop-Token / NFT</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta velit,
                 tenetur laborum perferendis aspernatur alias incidunt? Quod repudiandae 
                 doloribus consectetur rem ullam, aliquam eum esse, provident debitis hic itaque at?
              </p>
            </div>
            <form action="">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                  <label>Cryptocurrency Type:</label>
                  <select class="form-select form-control" aria-label="Select Type">
                    <option selected>Select Type</option>
                    <option value="1">Coin</option>
                    <option value="2">Token</option>
                    <option value="3">NFT</option>
                  </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                  <label>Coin/Token Name:</label>
                  <select class="form-select form-control" aria-label="Select Type">
                    <option selected>Select Type</option>
                    <option value="1">Bitcoin (BTC)</option>
                    <option value="2">Ethereum (ETH)</option>
                  </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Coin/Token Name:</label>
                    <input type="text" class="form-control" placeholder="Coin/Token Symbol:"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Start Date:</label>
                    <input type="date" class="form-control" placeholder="Start Date"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>End Date:</label>
                    <input type="date" class="form-control" placeholder="End Date"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Winner Announce Date:</label>
                    <input type="date" class="form-control" placeholder="Winner Announce Date:"></input>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Coin/Token Image * (JPG & PNG Only (Max:1MB))</label>
                    <input class="form-control" type="file" id="formFile"></input>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Coin/Token Quantity: * (Number only)</label>
                    <input class="form-control" type="number"></input>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Total Airdrop Qty: * (Number only)</label>
                    <input class="form-control" type="number"></input>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>No of Winners: *</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Project Website: *</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Email: *</label>
                    <input class="form-control" type="email"></input>
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                    <label>Description of Project: *</label>
                    <textarea class="form-control" placeholder="Leave a comment here"></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Task Details: *</label>
                    <textarea class="form-control" placeholder="Leave a comment here"></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="col-md-4">
                  <div className="form-group">
                  <label>Project Based On: *</label>
                  <select class="form-select form-control" aria-label="Select Type">
                    <option selected>Option-1</option>
                    <option value="1">Option-2</option>
                    <option value="2">Option-3</option>
                  </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                  <label>Country from Coin / Token Issued: *</label>
                  <select class="form-select form-control" aria-label="Select Type">
                    <option selected>Option-1</option>
                    <option value="1">Option-2</option>
                    <option value="2">Option-3</option>
                  </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Task Link: *</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Facebook URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Twitter URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Instagram URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Reddit URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Medium URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Telegram URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Discord URL:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contract Address: *</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
              </div>
              <div className="shortinfo area2">
              <h3>User Contact info: *</h3>
            </div>
              <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                  <label>Contact *</label>
                  <select class="form-select form-control" aria-label="Select Type">
                    <option selected>Option-1</option>
                    <option value="1">Option-2</option>
                    <option value="2">Option-3</option>
                  </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Enter Here:</label>
                    <input class="form-control" type="text"></input>
                  </div>
                </div>
              </div>
              <div className="button-area">
                <ul className='d-flex gap-3 justify-end'>
                  <li><button type="button" class="btn btn-primary">Next</button></li>
                  <li><button type="button" class="btn btn-light">Cancel</button></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default addairdrop;
