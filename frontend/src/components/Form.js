import React, { useState } from "react";
import Response from "./Response";
import Axios from "axios";
import { Colors } from "./colors";
const Form = () => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    function CheckEmail(value) {
        setEmail(value)
    }
    function CheckSubject(value) {
        setSubject(value)
    }
    function CheckDescription(value) {
        setDescription(value)
    }
    function proceed() {
        console.log(email, subject, description)
        Axios.post("http://localhost:5000/send/", { email, subject, description })
            .then(data => {
                console.log(data)
                setDescription("");
                setEmail("")
                setSubject("")
            }).catch(Err => console.log(Err));
    }
    return (
        <>
            <h1 style={{
                padding: "15px",
                background: Colors.purple,
                color: Colors.white,
            }}>Exercise</h1>

            <div style={{
                height: "auto",
                width: "500px",
                display: "flex",
                justifyContents: "center",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto"
            }}>
                <div className="mb-3">
                    <label className="form-label" style={{color:Colors.purple}}>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                            CheckEmail(e.target.value)
                        }}
                        placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{color:Colors.purple}}>Subject</label>
                    <input type="text"
                        value={subject}
                        onChange={(e) => {
                            CheckSubject(e.target.value)
                        }}
                        className="form-control" placeholder="Report today" />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{color:Colors.purple}}>Example textarea</label>
                    <textarea
                        value={description}
                        onChange={(e) => {
                            CheckDescription(e.target.value)
                        }}
                        className="form-control" rows="4"></textarea>
                </div>
                <button
                    onClick={() => {
                        proceed()
                    }}
                    className="btn btn-block"
                    style={{
                        background:Colors.purple,
                        color:Colors.white
                    }}>Continue</button>
                <hr />
                <Response />
            </div>
        </>
    )
}
export default Form;