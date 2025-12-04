import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      
      <h2 className="fw-bold text-center mb-4">About Our College</h2>

      
      <section className="mb-5">
        <h4 className="fw-semibold">📘 College History</h4>
        <p className="mt-2">
          Established in 1998, our college has grown into one of the most reputed institutions in
          the region. With a strong focus on academic excellence, innovation, and research, we have
          consistently produced top-performing graduates who excel in various industries.
        </p>
        <p>
          Over the past two decades, we have expanded our academic departments, upgraded
          infrastructure, and collaborated with leading industries to provide quality education to
          students.
        </p>
      </section>

     
      <section className="mb-5">
        <h4 className="fw-semibold">🎯 Mission & Vision</h4>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">Mission</h5>
              <p className="mt-2">
                Our mission is to empower students with technical knowledge, problem-solving skills,
                and leadership qualities, ensuring they become industry-ready professionals.
              </p>
            </div>
          </div>

          <div className="col-md-6 mt-3 mt-md-0">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">Vision</h5>
              <p className="mt-2">
                To be a global center of excellence in education and research, fostering innovation
                and contributing to societal growth through knowledge and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section>
        <h4 className="fw-semibold">🏆 Achievements</h4>

        <ul className="timeline mt-4">
          <li className="mb-3">
            <strong>2024:</strong> Recognized as the *Top Engineering College in the State*.
          </li>
          <li className="mb-3">
            <strong>2022:</strong> Established a new *AI & Robotics Innovation Lab*.
          </li>
          <li className="mb-3">
            <strong>2020:</strong> Ranked in the *Top 50 Colleges by NIRF*.
          </li>
          <li className="mb-3">
            <strong>2018:</strong> Launched student exchange programs with international
            universities.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
