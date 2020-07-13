import React, {Component} from 'react';
import AuthContext from "../../Context/auth-context";
import BookingItem from "./BookingItem";
import './Booking.css';
class BookingsPage extends Component {

    state={
        bookings:[],
        booking_loaded:false,
        booked:false
    }

    static contextType = AuthContext;

    findAllBookings = (userId) =>{

        let requestBody ={
            query: `query{
            bookingsPerUser(userId:"${userId}") {
            event{
            _id,
            title,
            price,
            date
            },
            user{
            email
            }
            }
            }`
        }

        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                "Content-Type":'application/json',
                "Authorization": 'Bearer '+this.context.token
            }
        }).then(res=>res.json())
            .then(data=> {
                console.log(data.data.bookingsPerUser)
                this.setState({
                    bookings:data.data.bookingsPerUser,
                    booking_loaded:true
                })
            }).catch(err=>console.log(err))

    }

    componentDidMount() {
        this.findAllBookings(this.context.userId)
    }

    deleteBooking = (bookingId) =>{
        let requestBody ={
            query: `mutation{
            cancelBooking (
                bookingId: "${bookingId}"
            ){
            title
            }
            }`
        }

        fetch('http://localhost:8000/graphql',{
            method:'POST',
            body:JSON.stringify(requestBody),
            headers:{
                "Content-Type":'application/json',
                "Authorization": 'Bearer '+this.context.token
            }
        }).then(res=>res.json())
            .then(data=> {
                this.setState({
                    booked:true
                })
                this.findAllBookings(this.context.userId)
            }).catch(err=>console.log(err))
        setTimeout(() => {
            this.setState({
                booked:false
            })
        }, 3000);
    }


    render() {
        return (
            <div>

                { this.state.booked &&
                <div className="booking-success">
                    <i className="fas fa-check-circle fa-lg"></i>
                    <h4>Booking Deleted</h4>
                </div>

                }

                {!this.state.booking_loaded && <div className={"spinner"}>
                    <div className="lds-dual-ring"/>
                </div>}
                {this.state.bookings.length===0 &&<h3>You have no bookings</h3>}
                {this.state.bookings.length>0 && this.state.bookings.map(booking=>(
                    <BookingItem deleteBooking={this.deleteBooking} booking={booking}/>
                ))}
            </div>
        );
    }
}

export default BookingsPage;
