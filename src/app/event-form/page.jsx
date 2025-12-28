import Link from 'next/link';
import React from 'react';
import "./style.css";

export const metadata = {
  title: "Submit Event - Crypto Frontend",
  description: "Submit your crypto event details for listing on our platform. Share information about conferences, meetups, and blockchain events.",
};

const page = () => {
  return (
    <div>
       <div className="submit-event-main">
        <div className="container">
        
                <div className="event-main-area">
                <h4>Submit Event</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Adipisci exercitationem hic praesentium nesciunt rerum quisquam?
                     Recusandae, aspernatur! Distinctio, placeat nihil.</p>
                     <div className="contact-section">
            <form action="">
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Coin Token Type:</label>
                    <select name="" id="" className='form-select form-control'>
                        <option>Coin</option>
                        <option>Token</option>
                    </select>
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Coin/Token Name:</label>
                    <select name="" id="" className='form-select form-control'>
                        <option>Bitcoin</option>
                        <option>Tether</option>
                    </select>
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Event Type:</label>
                    <select name="" id="" className='form-select form-control'>
                        <option>Partnership</option>
                        <option>Conference</option>
                    </select>
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Event Name</label>
                    <input type="text" className='form-control' placeholder='Event Name' />
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Start Date: </label>
                    <input type="date" className='form-control' placeholder='Enter last name' />
                  </div>

                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">End Date: </label>
                    <input type="date" className='form-control' placeholder='Enter last name' />
                  </div>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Country:</label>
                    <select name="" id="" className='form-select form-control'>
                        <option>India</option>
                        <option>USA</option>
                    </select>
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Location:</label>
                    <input type="text" className='form-control' placeholder='Enter Location' />
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Facebook URL:</label>
                    <input type="text" className='form-control' placeholder='Facebook URL:' />
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Twitter URL:</label>
                    <input type="text" className='form-control' placeholder='Twitter URL:' />
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Instagram URL:</label>
                    <input type="text" className='form-control' placeholder='Instagram URL:' />
                  </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                    <div className="form-group">
              <label htmlFor="">Upload Event Image * (JPG & PNG Only) </label>
                    <input type="file" className='form-control' placeholder='Enter mail ID' />
                  </div>
                    </div>

                    <div className="col-lg-12">
                    <div className="form-group">
              <label htmlFor="">Description:</label>
              <textarea name="" id="" className='form-control' placeholder='Description:' col='3'></textarea>
                  </div>
                    </div>
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
