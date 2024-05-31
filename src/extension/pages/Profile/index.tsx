import React, { useEffect, useState } from 'react';
import './index.css';
import { getProfile } from '../../../api/dataProfile';

function Profile() {
    const [profileData, setProfileData] = useState('...');

    useEffect( ()  =>  {
        getProfile().then((data) => {
            setProfileData(data);
        });

    }, []);

    return (
        <div className='Profile'>
            <pre style={{color: 'white', width: '100%', height: '100%', fontSize: '14px'}}>{JSON.stringify(profileData, null, 4)}</pre>
        </div>
    );
}

export default Profile;
