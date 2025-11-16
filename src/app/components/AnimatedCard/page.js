"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Eye from "../../assets/images/eye.svg";
import { formatImageUrl } from "../../Helper/imageUtils";

const AnimatedCard = ({ item, index }) => {
  if (!item) return null;

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="col-md-12 col-lg-4"
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03,
        y: -4,
        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="cardBox">
        <div className="picArea">
          <Image
            className="img"
            src={formatImageUrl(item.image)}
            alt={item.title || "No title"}
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

          <h4>{item.title}</h4>

          <h5
            dangerouslySetInnerHTML={{
              __html: item.short_description,
            }}
          />

          <p>
            <Link className="btn" href={`/blog/${item.slug}`}>
              Read More
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
