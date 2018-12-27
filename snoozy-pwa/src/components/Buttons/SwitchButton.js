import React from 'react';
import Switch from 'react-switch';

class SwitchButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            checked: false,
        };
    }  
    
    componentDidMount = () => {
        this.setState({ checked: this.props.defaultOn })
    }

    toggleSwitch = (checked) => {
        this.setState({ checked });
        this.props.onClick( this.state.checked );
    }

    render = () => {
        return (
            <label htmlFor="normal-switch" className='SwitchButton'>
                <span>{ this.props.labelName }</span>
                <Switch
                    onChange={ this.toggleSwitch }
                    checked={ this.state.checked }
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