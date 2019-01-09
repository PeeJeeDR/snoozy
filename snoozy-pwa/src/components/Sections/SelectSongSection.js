import React from 'react';
import Paragraph from '../Paragraphs/Paragraph';
import SmallSectionTitle from '../Titles/SmallSectionTitle';

class SelectSongSection extends React.Component {
    onSelect = (e) => {
        const soundName     = e.target.value;
        this.props.onClick(soundName);
    }
    
    render = () => {
        return (
            <div className='SelectSongSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/alarm-bell.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Alarm muziek'/>
                    </div>
                </div>

                <Paragraph>
                    Selecteer een alarmgeluidje in om s'ochtends mee wakker te worden.
                </Paragraph>

                <select name="song" id="song" onChange={ this.onSelect } defaultValue={ this.props.defaultSong }>
                    <option value="buzz">Standard alarm buzz</option>
                    <option value="avicci_wake_me_up">Wake me up - Avicci</option>
                    <option value="danza_kuduro">Danza Kuduro</option>
                    <option value="happy_pharrell_williams">Happy - Pharrell Williams</option>
                    <option value="rather_be">Rather be</option>
                    <option value="sesame_street_wake_up">Wake up - Sesame Street</option>
                    <option value="wake_me_up_before_you_go_go">Wake me up before you go go</option>
                </select>
            </div>
        )
    }
}

export default SelectSongSection;