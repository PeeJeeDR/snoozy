import React from 'react';

class Appointment extends React.Component {
    render = () => {
        return (
            <div className='Appointment'>
                <header></header>
                <div className="content">
                    <div className="top">
                        <h2>Eerst volgende afspraak</h2>
                        <p>08:15 - 13:30</p>
                    </div>

                    <div className="info">
                        <div>
                            <p>Les geven bij Coderdojo</p>
                        </div>
                        <div>
                            <p>Draaiboomstraat 6, 2300 Turnhout</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Appointment;