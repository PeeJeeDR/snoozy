import React from 'react';
import { db } from '../../firebase/firebase';
import { BarLoader } from 'react-spinners'

class Appointment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            calendarData: [],
        };
    }
    
    componentWillMount = () => {
        db.collection('api-data').doc('calendar-data').get()
            .then(res => {
                this.setState({ calendarData: res.data() })
            })
    }
    
    render = () => {
        const { calendarData }  = this.state;

        return (
            <div className='Appointment'>
                <header></header>
                <div className="content">
                    <div className="top">
                        <h2>Eerst volgende afspraak</h2>
                        { 
                            this.state.calendarData < 1 
                            ? 
                            <BarLoader width={ 70 } color={ '#72BFA5' }/> 
                            :  
                            <p>{ calendarData.start_time } - { calendarData.end_time }</p>
                        }
                    </div>

                    <div className="info">
                        { 
                            this.state.calendarData < 1 
                            ? 
                            <BarLoader color={ '#72BFA5' }/> 
                            :
                            <div>
                                <div>
                                    <p>{ calendarData.title }</p>
                                </div>
                                <div>
                                    <p>{ calendarData.location }</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Appointment;