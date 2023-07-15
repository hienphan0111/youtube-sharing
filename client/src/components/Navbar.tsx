import { useState } from 'react';
import { NavLink as Link, Outlet } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { useAppSelector } from '../store/hooks';
import { userSelector } from '../store/userSlice';
import { IoIosArrowDown } from 'react-icons/io';

const Navbar = () => {
  const selectUser = useAppSelector(userSelector);

  console.log(selectUser.userInfo);
  const [toggle, setToggle] = useState(false);

  return (
    <div className='flex justify-between w-full p-5'>
      <div className='w-full flex'>
        <Link to='/' className='text-red-600 text-xl font-bold'>Youtube sharing</Link>
      </div>
      <nav className='w-full'>
        {
          selectUser.userInfo ? (
            <div className='flex relative'>
              <FaUser />
              <p>{selectUser.userInfo?.name}</p>
              <IoIosArrowDown onClick={(pre: boolean) => setToggle(!pre)} />
              {
                toggle && (
                  <div className='absolute'>
                    <ul>
                      <li>
                        <Link to='/profile'>Profile</Link>
                      </li>
                      <li>
                        <Link to='/logout'>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )
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
