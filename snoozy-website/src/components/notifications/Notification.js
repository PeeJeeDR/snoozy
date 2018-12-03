import React from 'react';
import Facebook from '../../assets/svg/facebook.png';
import Twitter from '../../assets/svg/twitter.png';
import Mail from '../../assets/svg/mail.png';

class Notification extends React.Component {
    renderIcon = () => {
        switch (this.props.name)
        {
            case 'facebook':
                return <img src={ Facebook } alt="icon."/>

            case 'twitter':
                return <img src={ Twitter } alt="icon."/>
            
            case 'mail':
                return <img src={ Mail } alt="icon."/>
        }

    }
    
    render = () => {
        return (
            <div className='Notification'>
                { this.renderIcon() }
                <p>
                    3
                </p>
            </div>
        )
    }
}

export default Notification;