import React from 'react';
import Header from '../Header/Header';
import SideNavigation from '../SidebarNavigation/SideNavigation';
import Sectionheading from '../Titles/Sectionheading';
import GoogleCalendarSection from '../Sections/GoogleCalendarSection';
import GoogleMapsSection from '../Sections/GoogleMapsSection';

class ExternalApps extends React.Component {
    render = () => {
        return (
            <div className='ExternalApps'>
                <Header />
                <SideNavigation />
                <Sectionheading>Externe Applicaties</Sectionheading>

                <div className="page_wrapper">

                    <div className="content_wrapper">
                        <GoogleCalendarSection />
                        <GoogleMapsSection />
                    </div>
                </div>
            </div>
        )
    }
}

export default ExternalApps;