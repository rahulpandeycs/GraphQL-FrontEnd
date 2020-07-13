import React from "react";
import './Events.css';
import Modal from "../Modal/Modal";

const EventItem = props =>(
    <li className="events__list-item">
        <div>
                <h1>{props.event.title}</h1>
                <h2>${props.event.price} - {new Date(props.event.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.authUserId !== props.event.creator._id  && <button className="btn" onClick={()=>props.showDetail(props.event)}>View Details</button>}
            {props.authUserId === props.event.creator._id  &&<p>This is your event!</p>}
        </div>
        </li>
)

export  default EventItem;
