import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const AdminRedirect: React.FC = () => {
  useEffect(() => navigate('/admin/pages'));
  return <div />;
};

export default AdminRedirect;
