import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SellerPrimaryDropDownMenu from './SellerPrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation();
  const { isAuthenticated: isUserAuthenticated, user } = useSelector((state) => state.user);
  const { isAuthenticated: isSellerAuthenticated, seller } = useSelector((state) => state.seller);
  const { cartItems } = useSelector(state => state.cart);
  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
  const [findSeller, setSeller] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    setSeller(currentPath.includes('/seller'));
  }, [location]);

  return (
    <>
      {!findSeller ? (<header className="bg-red-500 fixed top-0 py-2.5 w-full z-10">

        <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">

          <div className="flex items-center flex-1">
            <Link className="h-7 mr-1 sm:mr-4" to="/">
              <img draggable="false" className="h-full w-full object-contain" src={logo} alt="RedCart24X7 Logo" />
            </Link>
            <Searchbar />
          </div>
          <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

            {!isUserAuthenticated ? (
              <Link
                to="/login"
                className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
              >
                Login
              </Link>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setTogglePrimaryDropDown(true)}
                onMouseLeave={() => setTogglePrimaryDropDown(false)}
              >
                <span className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer">
                  {user.name && user.name.split(" ", 1)}
                  <span>
                    {togglePrimaryDropDown ? (
                      <ExpandLessIcon sx={{ fontSize: "16px" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    )}
                  </span>
                </span>

                {togglePrimaryDropDown && (
                  <PrimaryDropDownMenu
                    setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                    user={user}
                  />
                )}
              </div>
            )}

            <div>
              <Link
                to="/Seller/home"
                className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer"
              >
                Become a seller
              </Link>
            </div>

            <div
              onMouseEnter={() => setToggleSecondaryDropDown(true)}
              onMouseLeave={() => setToggleSecondaryDropDown(false)} >
              <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer">More
                <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
              {toggleSecondaryDropDown && <SecondaryDropDownMenu />}
            </div>

            <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
              <span><ShoppingCartIcon /></span>
              {cartItems.length > 0 &&
                <div className="w-5 h-5 p-2 bg-blue-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {cartItems.length}
                </div>
              }
              Cart
            </Link>
          </div>
        </div>
      </header>) : (<header className="bg-red-500 fixed top-0 py-2.5 w-full z-10">
        <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-between items-center relative">
          <div className="flex items-center flex-1 gap-3">
            <Link className="h-8 sm:h-10 w-auto" to="/">
              <img
                draggable="false"
                className="h-full object-contain"
                src={logo}
                alt="RedCart24X7 Logo"
              />
            </Link>
            <div className="flex justify-center w-full">
              <h1 className="text-lg sm:text-2xl font-semibold text-white">SELLER DASHBOARD</h1>
            </div>
          </div>
          <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
            {!isSellerAuthenticated ? (
              <Link
                to="/seller/login"
                className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
              >
                Seller Login
              </Link>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setTogglePrimaryDropDown(true)}
                onMouseLeave={() => setTogglePrimaryDropDown(false)}
              >
                <span className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer">
                  {seller.name && seller.name.split(" ", 1)}
                  <span>
                    {togglePrimaryDropDown ? (
                      <ExpandLessIcon sx={{ fontSize: "16px" }} />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    )}
                  </span>
                </span>
                {togglePrimaryDropDown && (
                  <SellerPrimaryDropDownMenu
                    setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                    seller={seller}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </header>)}
    </>
  )
};

export default Header;
