import React from 'react';
import SubTitle from '../titles/SubTitle';
import Days from '../../data/DayPicker.json';
import OkButton from '../buttons/OkButton';

class ManualBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            days: [],
            dayActive: ''
        };
    }
    
    componentWillMount = () => {
        this.setState({ days: Days.days });
    }

    renderDays = () => {
        return this.state.days.map((day, i) => (
            <p 
                key={ i } 
                onClick={ () => this.setState({ dayActive: day.name }) }
                className={ this.state.dayActive === day.name ? 'active' : '' }
            >
                { day.slug }
            </p>
        ))
    }
    
    render = () => {
        return (
            <div className='ManualBox'>
                <SubTitle>Handmatig instellen</SubTitle>
                <div className='inputContainer'>
                    <input type='time' min='00:00' max='23:59' />
                    <OkButton />
                </div>

                <div className="days">
                    { this.renderDays() }
                </div>
            </div>
        )
    }
}

export default ManualBox;