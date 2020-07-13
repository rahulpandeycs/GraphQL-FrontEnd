import React, {Component} from 'react';
import './Modal.css';
const Modal = props => (
  <div className="modal">
        <header className="modal_header"><h1>{props.title}</h1></header>
        <section className="modal-content">
          {props.children}
            {props.detail_Modal && <h1>{props.title}</h1>}
            {props.detail_Modal && <h3 className="price">Price: ${props.price} - {new Date(props.date).toLocaleDateString()}</h3>}
            {props.detail_Modal && <h5 className="desc">{props.desc}</h5>}
        </section>
        <section className="modal_actions">
          { props.canConfirm && <button className="btn" onClick={props.confirmEvent}>Confirm</button>}
          {props.detail_Modal && props.closeDetail && <button className="btn" onClick={props.closeDetail}>Cancel</button>}
            {props.detail_Modal && props.token && props.closeDetail && <button className="btn" onClick={()=>props.bookEvent(props.id)}>Book</button>}
            {props.closeModal && <button className="btn" onClick={props.closeModal}>Cancel</button>}
        </section>
  </div>

);


export default Modal;
