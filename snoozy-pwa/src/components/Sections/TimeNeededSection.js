import React from 'react';
import Paragraph from '../Paragraphs/Paragraph';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import OkButton from '../Buttons/OkButton';


class TimeNeededSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
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
                    <form className='inputContainer' onSubmit=''>
                        <input 
                            name='time' 
                            type='time' 
                            min='00:00' 
                            max='23:59'
                        />
                        <OkButton/>
                    </form>
                </div>
            </div>
        )
    }
}

export default TimeNeededSection;