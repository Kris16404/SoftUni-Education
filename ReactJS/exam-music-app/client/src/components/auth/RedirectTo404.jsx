import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectTo404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/404');
  }, []);

  return;
};

export default RedirectTo404;
