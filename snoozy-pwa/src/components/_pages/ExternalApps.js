import React from 'react';
import Header from '../Header/Header';
import SideNavigation from '../SidebarNavigation/SideNavigation';
import Sectionheading from '../Titles/Sectionheading';
import GoogleCalendarSection from '../Sections/GoogleCalendarSection';
import GoogleMapsSection from '../Sections/GoogleMapsSection';
import SpotifySection from '../Sections/SpotifySection';
// import FacebookSection from '../Sections/FacebookSection';
import OutlookSection from '../Sections/OutlookSection';
import TwitterSection from '../Sections/TwitterSection';

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
                        <SpotifySection />
                        <OutlookSection />
                        <TwitterSection />
                    </div>
                </div>
            </div>
        )
    }
}

export default ExternalApps;