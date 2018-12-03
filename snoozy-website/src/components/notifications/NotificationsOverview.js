import React from 'react';
import { db } from '../../firebase';
import Notification from './Notification';

class NotificationsOverview extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    
    componentWillMount = () => {
        db.ref('notifications').on('value', snap => {
            this.setState({ data: snap.val() });
        })
    }

    renderNotifications = () => {
        return this.state.data.map((notification, i) => (
            <Notification key={ i } name={ notification.name }/>
        ))
    }
    
    render = () => {
        return (
            <div className='NotificationsOverview'>
                { this.renderNotifications() }
            </div>
        )
    }
}

export default NotificationsOverview;