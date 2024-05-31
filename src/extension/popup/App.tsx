import React, { useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { 
  Home as HomeIcon, 
  AccountCircle as AccountCircleIcon, 
  AttachMoney as AttachMoneyIcon,  
  Settings as SettingsIcon
} from '@mui/icons-material';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Config from '../pages/Config';
import Withdraw from '../pages/Withdraw';

const navigationItems = [
  { label: 'Home', icon: <HomeIcon />, value: 'home' },
  { label: 'Profile', icon: <AccountCircleIcon />, value: 'profile' },
  { label: 'Withdraw', icon: <AttachMoneyIcon />, value: 'withdraw' },
  { label: 'Config', icon: <SettingsIcon />, value: 'config' },
];
const styles = {
  color: '#f44805',
};

function App() {
  const [currentPageName, setCurrentPageName] = React.useState('home');
  const [currentPageElement, setCurrentPageElement] = React.useState(<Home setCurrentPageName={setCurrentPageName}/>);

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, [currentPageName]);

  function setCurrentPage(pageName: string) {
    switch(pageName) {
      case 'home':
        setCurrentPageElement(<Home setCurrentPageName={setCurrentPageName} />);
        break;
      case 'profile':
        setCurrentPageElement(<Profile />);
        break;
      case 'config':
        setCurrentPageElement(<Config />);
        break;
      case 'withdraw':
        setCurrentPageElement(<Withdraw />);
        break;
    };
  };

  return (
      <div style={{height: '100%', width: '100%'}}>
        <div style={{height: 530}}>
          {currentPageElement}
        </div>
        <BottomNavigation
          value={currentPageName}
          onChange={(event, newValue) => {
            setCurrentPageName(newValue);
          }}
          showLabels
          style={{height: 70, backgroundColor: '#191919'}}
        >
            {navigationItems.map((item) => (
              <BottomNavigationAction
                key={item.value}
                style={styles}
                label={item.label}
                icon={React.cloneElement(item.icon, styles)}
                value={item.value}
              />
            ))}
        </BottomNavigation>
      </div>
  );
}

export default App;
