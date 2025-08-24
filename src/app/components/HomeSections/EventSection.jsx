import React from "react";
import Section from "./Section";
import styles from "./HomeSections.module.css";

const EventSection = ({ events, loading, categories }) => (
  <Section
    title="Latest Event"
    items={events}
    loading={loading}
    categories={categories || []}
    color="#00b894"
    animationClass={styles.slideInLeftDelay2}
    type="event"
  />
);

export default EventSection; 