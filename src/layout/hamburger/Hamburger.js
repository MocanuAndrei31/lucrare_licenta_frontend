import React from 'react';
import './Hamburger.scss';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { handleSideBar } from '../../store/actions/userActions';

const Hamburger = () => {
  const open = useSelector((state) => state.products.openSideBar);
  const dispatch = useDispatch();

  return (
    <div className="ham-container">
      {!open ? <i onClick={() => dispatch(handleSideBar(true))} className="fas fa-bars"></i>
        :
        <i onClick={() => dispatch(handleSideBar(false))} className="fas fa-times"></i>
      }
    </div>
  );
};

export default Hamburger;
