import React from 'react';
import { db } from '../../firebase/firebase';
import Paragraph from '../Paragraphs/Paragraph';
import SmallSectionTitle from '../Titles/SmallSectionTitle';

const snoozyRef     = db.collection('snoozy').doc('settings');

class LedColors extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            alwaysOnColor: localStorage.getItem('alwaysOnColor'),
            alarmColor: localStorage.getItem('alarmColor')
        };
    }
    
    onAlwaysOnSelect = (e) => {
        const color     = e.target.value;
        localStorage.setItem('alwaysOnColor', color);

        snoozyRef.update({
            always_on_color: color,
        });

        this.props.onClick();
    }

    onAlarmSelect = (e) => {
        const color     = e.target.value;
        localStorage.setItem('alarmColor', color);

        snoozyRef.update({
            alarm_color: color,
        });

        this.props.onClick();
    }
    
    render = () => {
        return (
            <div className='LedColors'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/light-bulb.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Ambilight'/>
                    </div>
                </div>

                <Paragraph>
                    Stel de kleur van je ambilight op je Snoozy in.
                </Paragraph>

                <div className='select_container'>
                    <h6>Always On</h6>
                    <select name="always_on_light" id="always_on_light" onChange={ this.onAlwaysOnSelect } defaultValue={ this.state.alwaysOnColor }>
                        <option value="off">Uit</option>
                        <option value="red">Rood</option>
                        <option value="green">Groen</option>
                        <option value="blue">Blauw</option>
                        <option value="white">Wit</option>
                    </select>
                </div>

                <div className='select_container'>
                    <h6>Alarm</h6>
                    <select name="alarm_light" id="alarm_light" onChange={ this.onAlarmSelect } defaultValue={ this.state.alarmColor }>
                        <option value="off">Uit</option>
                        <option value="red">Rood</option>
                        <option value="green">Groen</option>
                        <option value="blue">Blauw</option>
                        <option value="white">Wit</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default LedColors;