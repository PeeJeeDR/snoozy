import React from 'react';
import Paragraph from '../Paragraphs/Paragraph';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import OkButton from '../Buttons/OkButton';
import * as ApiConfig from '../../config/ApiConfig';
import { db } from '../../firebase/firebase';


const snoozyRef = db.collection('snoozy').doc('user-data');

class TimeNeededSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
    }

    getTime = () => {
        snoozyRef.get().then(snap => {
            const time = snap.data().time_needed
            console.log(time);
        }, err => {
            console.log('Something went wrong...', err);
        });
    }

    timeChanged = () => {
        return;
    }
    
    render = () => {
        return (
            <div className='TimeNeededSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/clock.png" alt="clock icon."/>
                        <SmallSectionTitle title='Extra Tijd'/>
                    </div>
                </div>

                <Paragraph>
                    Stel de tijd in die je 's ochtends nodig hebt om je klaar te maken.
                </Paragraph>

                <div className='ManualBox'>
                    <form className='inputContainer'>
                        <input 
                            name='time' 
                            type='time' 
                            min='00:00' 
                            max='23:59'
                            value={ this.getTime() }
                            onChange={ this.timeChanged }
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default TimeNeededSection;