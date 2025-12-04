import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!form.name || !form.email || !form.message) {
      alert('Please fill all fields');
      return;
    }

    setSubmittedData(form);

    
    setForm({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
    
          <form className="card p-4 shadow" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>

    
          {submittedData && (
            <div className="alert alert-success mt-4">
              <h5 className="fw-bold">Message Submitted Successfully!</h5>
              <p>
                <strong>Name:</strong> {submittedData.name}
              </p>
              <p>
                <strong>Email:</strong> {submittedData.email}
              </p>
              <p>
                <strong>Message:</strong> {submittedData.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
