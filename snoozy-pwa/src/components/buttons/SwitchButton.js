import React from 'react';
import Switch from 'react-switch';

class SwitchButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isOn: false,
        };
    }   
    
    toggleSwitch = (isOn) => {
        this.setState({ isOn });
        this.props.onClick();
    }

    render = () => {
        return (
            <label htmlFor="normal-switch" className='SwitchButton'>
                <span>Turn Snoozy Off</span>
                <Switch
                    onChange={ this.toggleSwitch }
                    checked={ this.state.isOn }
                    id="normal-switch"
                />
            </label>
        )
    }
}

export default SwitchButton;