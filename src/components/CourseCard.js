import React, {useState} from "react";
import {Link} from "react-router-dom";
import { url } from '../actions/config'


export default function CourseCard({
  image,
  title,
  category,
  text,
  numLesson,
  nodeId,
  courseIndex,
  isActive,
  courseId
}) {
  const [showModal, setShowModal] = useState(false);
  const truncatedText = text.length > 120 ? text.slice(0, 120) + '... ' : text;


  return (
    <div>
      <div className="course-card bg-light_2">
        <div className="course-card-image">
          <img src={url() + image} style={{ objectFit: 'cover' }} />
        </div>
        <div className="row m-2">
          <div className="course-card-lessons text-nowrap col-12">{numLesson} LESSONS</div>
          <div className="course-card-title col-12 p-1">{courseIndex+1} -  {title}</div>
        </div>
        {/* <div className="d-flex justify-content-between">
          <span className="course-card-title">{title}</span>
          <span className="course-card-lessons">{numLesson} LESSONS</span>
        </div> */}
        {/*
        <div className="d-flex ml-3 btn-group course-card-status">
          {isActive && <div className="bg-dark">• Active</div>}
        </div>
        */}
        <div className="d-flex ml-3 btn-group course-card-status">
          <div className="bg-dark">{category}</div>
        </div>
        <div className="course-card-content">
          {/* {text} */}
          {truncatedText}
          {text.length > 120 && (
            <a href={`course/${courseId}/lessons`}>Read More</a>
          )}
        </div>
        <div className="d-flex justify-content-center mt-2 mb-3">
          <Link to={`/course/${courseId}/lessons`}>
            <button className="button-primary btn-sm">View Lessons</button>
          </Link>
          <Link to={`/courses/update/${courseId}`}>
            <button className="button-primary btn-sm">Edit Course</button>
          </Link>
        </div>
      </div>
      <div className={`purchase-node-modal ${showModal ? "" : "hide"}`}>
        <div
          className="overlay"
          onClick={() => {
            setShowModal(false);
          }}
        ></div>
        <div className="modal-container">
          <h3>Seven Academy</h3>
          <p>You need to purchase to unlock this course</p>
          <div className="modal-button-group">
            <button
              className="btn btn-primary"
              onClick={() => {
                window.open("https://seven.money/", "_blank");
                setShowModal(false);
              }}
            >
              Purchase
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
