import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import {
  clearErrors,
  getUserDetails,
  updateUser
} from '../../actions/userAction';
import {
  UPDATE_USER_RESET,
  REMOVE_USER_DETAILS
} from '../../constants/userConstants';

import {
  clearErrors as clearErrorsSeller,
  getSellerDetails,
  updateSeller
} from '../../actions/SellerAction';
import {
  UPDATE_SELLER_RESET,
  REMOVE_SELLER_DETAILS
} from '../../constants/SellerConstants';

import Loading from './Loading';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const UpdateUserAndSeller = () => {
    
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  const accountId = params.id;
  const accountName = params.account;

  const { user, error: userError, loading: userLoading } = useSelector((state) => state.userDetails);
  const { seller, error: sellerError, loading: sellerLoading } = useSelector((state) => state.sellerDetails);
  const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.profile);
  const { isUpdated: isSellerUpdated, error: updateSellerError, loading: updateSellerLoading } = useSelector((state) => state.profileSellerReducer);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isSeller, setIsSeller] = useState(false);

  const updateAccountSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('gender', gender);

    if (isSeller) {
      dispatch(updateSeller(accountId, formData));
    } else {
      dispatch(updateUser(accountId, formData));
    }
  };

  useEffect(() => {
    const loadDetails = async () => {
      if (user && user._id === accountId) {
        setName(user.name);
        setEmail(user.email);
        setGender(user.gender);
        setAvatarPreview(user.avatar?.url || '');
        setIsSeller(false);
      } else if (seller && seller._id === accountId) {
        setName(seller.name);
        setEmail(seller.email);
        setGender(seller.gender);
        setAvatarPreview(seller.avatar?.url || '');
        setIsSeller(true);
      } else  if (accountName === "seller") {
        dispatch(getSellerDetails(accountId));
      } else if (accountName === "user") {
        dispatch(getUserDetails(accountId));
      }
    };

    loadDetails();

    if (userError) {
      enqueueSnackbar(userError, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (sellerError) {
      enqueueSnackbar(sellerError, { variant: 'error' });
      dispatch(clearErrorsSeller());
    }
    if (updateError) {
      enqueueSnackbar(updateError, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (updateSellerError) {
      enqueueSnackbar(updateSellerError, { variant: 'error' });
      dispatch(clearErrorsSeller());
    }
    if (isUpdated || isSellerUpdated) {
      enqueueSnackbar(`${isSeller ? 'Seller' : 'User'} updated successfully`, { variant: 'success' });
      dispatch({ type: isSeller ? UPDATE_SELLER_RESET : UPDATE_USER_RESET });
      dispatch({ type: isSeller ? REMOVE_SELLER_DETAILS : REMOVE_USER_DETAILS });
      navigate('/admin/accounts');
    }
  }, [
    dispatch,
    accountId,
    user,
    seller,
    userError,
    sellerError,
    updateError,
    updateSellerError,
    isUpdated,
    isSellerUpdated,
    navigate,
    accountName,
    isSeller,
    enqueueSnackbar
  ]);

  const loading = userLoading || sellerLoading;

  return (
    <>
      <MetaData title={`Admin: Update ${isSeller ? 'Seller' : 'User'} | RedKart24X7`} />

      {( updateLoading || updateSellerLoading )&& <BackdropLoader />}

      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
          <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Profile</h2>

          <form onSubmit={updateAccountSubmitHandler} className="p-5 sm:p-10">
            <div className="flex flex-col gap-3 items-start">
              <div className="flex flex-col w-full gap-3">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4 items-center">
                <h2 className="text-md">Gender:</h2>
                <RadioGroup row>
                  <FormControlLabel
                    value="male"
                    control={<Radio required />}
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio required />}
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                    label="Female"
                  />
                </RadioGroup>
              </div>

              <div className="flex flex-col w-full justify-between gap-3 items-center">
                <Avatar alt="Avatar Preview" src={avatarPreview} sx={{ width: 56, height: 56 }} />
              </div>

              <button
                type="submit"
                className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium"
              >
                Update
              </button>
              <Link
                to={'/admin/accounts'}
                className="hover:bg-gray-100 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateUserAndSeller;
