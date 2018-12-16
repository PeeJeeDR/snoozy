import React from 'react';
import Switch from 'react-switch';

class SwitchButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isOn: true,
        };
    }   
    
    toggleSwitch = (isOn) => {
        this.setState({ isOn });
        this.props.onClick();
    }

    render = () => {
        return (
            <label htmlFor="normal-switch" className='SwitchButton'>
                <span>{ this.props.labelName }</span>
                <Switch
                    onChange={ this.toggleSwitch }
                    checked={ this.state.isOn }
                    id="normal-switch"
                    onColor='#72BFA5'
                    uncheckedIcon={ false }
                    checkedIcon={ false }
                />
            </label>
        )
    }
}

export default SwitchButton;