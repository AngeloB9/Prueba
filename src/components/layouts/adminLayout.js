import { useState } from 'react';
import Drawer from '@/components/drawer';
import NavBar from '@/components/navbar';

const adminLayout = ({ children, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div
      className='d-flex'
      style={{ background: '#f3f8fb', maxHeight: 'auto', minHeight: '100vh' }}>
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        user={user}
      />
      <div className='w-100'>
        <NavBar
          handleDrawerToggle={handleDrawerToggle}
          consultorio_nombre='V-Imagen'
          user={user}
        />
        <div className='p-3'>{children}</div>
      </div>
    </div>
  );
};

export default adminLayout;
