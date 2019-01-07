import React from 'react';
/* import { BounceLoader } from 'react-spinners';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';
import * as ApiConfig from '../../config/ApiConfig';
import { db } from '../../firebase/firebase'; */
import FacebookLogin from 'react-facebook-login';

const app_id = '222602775326063';


class FacebookSection extends React.Component {

  render() {

    const responseFacebook = (res) => {
      console.log(res);
      console.log(res.userID);
      const url = "https://graph.facebook.com/" + res.userID + "?fields=id,name&access_token=" + res.accessToken;
      //summary.unseen_count in /me/notifications
      console.log(url);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK</h1>

      <FacebookLogin
        appId={app_id}
        fields="name,picture,unread"
        callback={responseFacebook}
      />
      </div>
    );
  }
}

export default FacebookSection;