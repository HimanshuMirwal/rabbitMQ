import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Colors } from "./colors";
const Response = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:5000/users/")
            .then(items => {
                setData(items.data)
                console.log(items.data);
            }).catch(Err => console.log(Err))
    }, [])
    return (
        <div>
            <ul style={{ listStyleType: "none" }}>
                {
                    data.map((item,index) => {
                        return (
                            <li key={index} style={{borderLeft:`5px solid ${Colors.darkPurple}`,marginBottom:"20px", paddingLeft:"10px"}}>
                                <h3 style={{color:Colors.darkPurple}}>{item.email}</h3>
                                <h5 style={{color:Colors.purple}}>{item.subject}</h5>
                                <p style={{color:Colors.lightGray}}>{item.description}</p>
                                <b style={{color:Colors.gray}}>{item.response}</b>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Response