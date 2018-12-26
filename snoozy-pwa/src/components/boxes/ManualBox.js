import React from 'react';
import SubTitle from '../titles/SubTitle';
import Days from '../../data/DayPicker.json';
import OkButton from '../buttons/OkButton';

class ManualBox extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            days: [],
            dayActive: '',
        };
    }
    
    componentWillMount = () => {
        this.setState({ 
            days: Days.days,
        });
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

    getTime = (e) => {
        e.preventDefault();
        let time    = e.target.time.value;
        this.props.onSubmit(time);
    }

    timeChanged = (e) => {
        // this.setState({ timeAfterSubmit: e.target.value })

        // this.props.onSubmit( this.state.timeAfterSubmit )
    }
    
    render = () => {
        return (
            <div className='ManualBox'>
                <SubTitle>Handmatig instellen</SubTitle>
                <form className='inputContainer' onSubmit={ this.getTime }>
                    <input 
                        name='time' 
                        type='time' 
                        min='00:00' 
                        max='23:59'
                        value={ this.state.timeAfterSubmit }
                        onChange={ this.timeChanged }
                    />

                    <OkButton />
                </form>

                <div className="days">
                    { this.renderDays() }
                </div>
            </div>
        )
    }
}

export default ManualBox;