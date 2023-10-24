import "../Main.css";
import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const Contact = () => {
    const [feedback, setFeedback] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { feedback };
            const response = await fetch(apiUrl + "/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return (
        <div className="container mt-lg-5 middle_page w-50">
            <h1 className="text-center">FEEDBACK FORM</h1>
            <div className="mt-lg-5">
                <form className="mt-3" onSubmit={onSubmitForm}>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6 text-center">
                            <div className="form-group">
                                <label className="text-center">Feedback</label>
                                <textarea
                                    className="form-control text-center text-body mt-2"
                                    rows="4"
                                    placeholder="Enter your feedback"
                                    value={feedback || ''}
                                    onChange={(e) => setFeedback(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6 text-center">
                            <button className="btn btn-dark text-light btn-lg">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
