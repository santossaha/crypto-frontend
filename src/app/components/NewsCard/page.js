"use client";

import Image from "next/image";
import Link from "next/link";
import Eye from "../../assets/images/eye.svg";

const NewsCard = ({
  blogs,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageSelect,
}) => {
  const currentBlogs = blogs;
  console.log(currentBlogs);
  return (
    <div className="newsCard">
      <div className="subHeadline">
        <h3>New Post</h3>
      </div>
      <div className="row">
        {currentBlogs?.map((blog) => (
          <div key={blog.id} className="col-md-12 col-lg-4">
            <div className="cardBox">
              <div className="picArea">
                <Image
                  className="img"
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={300}
                />
              </div>
              <div className="cardInfo">
                <p>
                  {new Date().toLocaleDateString()}{" "}
                  <span>
                    <Image className="img" src={Eye} alt="eye" /> 120 View
                  </span>
                </p>
                <h4>{blog.title}</h4>
                <h5
                  dangerouslySetInnerHTML={{
                    __html: blog.short_description,
                  }}
                />
                <p>
                  <Link className="btn" href={`/blog/${blog.slug}`}>
                    Read More
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="..." className="d-flex justify-content-end me-3 mb-5">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={onPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageSelect(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={onNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewsCard;
