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

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            setFeedback("");
            const responseData = await response.json();
            alert(responseData.message);

        } catch (err) {
            console.error("Error:", err.message);
            alert('An error occurred while trying to submit your feedback. Please try again.');
        }
    };   

    return (
        <div className="container mx-auto w-100vw d-flex align-items-center justify-content-center" style={{ height: '75vh' }}>
            <div className="w-50 text-center">
                <div className="d-flex justify-content-center">
                <h1 className="text-nowrap">FEEDBACK FORM</h1>
                </div>
                <div className="mt-5">
                    <form className="mt-3" onSubmit={onSubmitForm}>
                        <div className="row justify-content-center mt-5">
                            <div className="col-md-6 text-center">
                                <div className="form-group">
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
                                <button className="btn btn-dark text-light btn-lg" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;