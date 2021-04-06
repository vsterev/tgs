import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './bulkSms.module.css';
import parseCookie from '../../../utils/parseCookie';
import BulkSmsService from '../../../services/bulks-sms';
const BulkSmsProfile = () => {
  const [profile, setProfile] = useState({});
  const token = parseCookie('tgs-token');
  useEffect(() => {
    BulkSmsService.profile(token).then((pr) => setProfile(pr));
    // .catch((e) => console.log('a sega e tuk2', e));
  }, []);
  return (
    <div className={styles.wrapper}>
      {Object.keys(profile).length === 0 ? (
        <div>Loading ...</div>
      ) : (
        <React.Fragment>
          <div className={styles.header}>
            <img src={require('./bulksms-logo.png')} alt="" width="200px" /> <h2> profile</h2>
          </div>
          <div className={styles.button}>
            <Link to="/admin/bulk-sms/manual-send">manual message send</Link>
          </div>
          <div>
            username - <b>{profile.username}</b>
          </div>
          <div>id number - {profile.id}</div>
          <div>company name - {profile.company?.name}</div>
          <div>company number - {profile.company?.taxReference}</div>
          <div>created - {profile.created}</div>
          <div>credits balance - {profile.credits?.balance} credits</div>
          <div>credits limit - {profile.credits?.limit} credits</div>
          <div>
            <b>
              daily quoata - {profile?.quota?.size} from {profile?.quota?.remaining} sms's
            </b>
          </div>
        </React.Fragment>
      )}
      {/* {JSON.stringify(profile)}; */}
    </div>
  );
};

export default BulkSmsProfile;
