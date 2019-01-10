import React from 'react';
import Paragraph from '../Paragraphs/Paragraph';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import OkButton from '../Buttons/OkButton';
import * as ApiConfig from '../../config/ApiConfig';
import { db } from '../../firebase/firebase';
import ManualBox from '../Boxes/ManualBox';


const snoozyRef = db.collection('snoozy').doc('user-data');

class TimeNeededSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            time_needed: localStorage.getItem('time_needed'),
        };
    }

    componentDidMount = () => {
        this.getTime();
    }

    getTime = async () => {
        await snoozyRef.get().then(snap => {
            const time_needed = snap.data().time_needed;
            this.setState({ time_needed });
        }, err => {
            console.log('Something went wrong...', err);
        });
    }

    timeOnSubmit = (time) => {
        localStorage.setItem('time_needed', time);
        
        snoozyRef.update({
            time_needed: time,
        })
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

                <ManualBox 
                    onSubmit={ this.timeOnSubmit } 
                    timeAfterSubmit={ this.state.time_needed }
                    type='time_needed'
                />
            </div>
        )
    }
}

export default TimeNeededSection;