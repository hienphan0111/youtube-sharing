import { useState } from 'react';
import { NavLink as Link, Outlet } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useAppSelector } from '../store/hooks';
import { userSelector } from '../store/userSlice';
import { IoIosArrowDown } from 'react-icons/io';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/userSlice';

const Navbar = () => {
  const selectUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex justify-between w-full p-5'>
      <div className='w-full flex'>
        <Link to='/' className='text-red-600 text-xl font-bold'>Youtube sharing</Link>
      </div>
      <nav className='w-full flex justify-end items-center gap-2'>
        {
          selectUser.userInfo ? (
            <div className='flex relative text-gray-800 items-center gap-3'>
              <div className='w-8 h-8 rounded-full border flex justify-center items-center border-zinc-800'>
                <FaUser />
              </div>
              <button type="button" onClick={() => setToggle(!toggle)} className='flex gap-2 items-center'>
                <p>{selectUser.userInfo?.name}</p>
                <IoIosArrowDown />
              </button>
              {
                toggle ? (
                  <div className='absolute top-10 right-6'>
                    <ul className='flex flex-col items-end gap-2 bg-slate-300 p-3 w-48 shadow-lg roudned-md'>
                      <li className='w-full text-right border-b border-black pb-2'>
                        <Link to='/myvideo' className='hover:text-yellow-600'>My Shared Video</Link>
                      </li>
                      <li>
                        <button type="button" onClick={handleLogout} className='hover:text-yellow-600'>Logout</button>
                      </li>
                    </ul>
                  </div>
                ) : null
              }
              <BsBellFill />
            </div>
          ) : (
            <div className='flex justify-end gap-3'>
              <Link to='/register'>Register</Link>
              <Link to='/login'>Login</Link>
            </div>
          )
        }
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
