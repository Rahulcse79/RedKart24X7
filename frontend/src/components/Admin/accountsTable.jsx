import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import {
  clearErrors,
  deleteUser,
  getAllUsers
} from '../../actions/userAction';

import {
  clearErrors as clearErrorsSeller,
  deleteSeller,
  getAllSellers
} from '../../actions/SellerAction';

import {
  DELETE_USER_RESET
} from '../../constants/userConstants';

import {
  DELETE_SELLER_RESET
} from '../../constants/SellerConstants';

import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';

const AccountsTable = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { users, error } = useSelector((state) => state.users);
  const { sellers, error: sellerError } = useSelector((state) => state.allSellers);
  const { loading: loadingSellerDelete, isDeleted: isDeletedSeller } = useSelector((state) => state.sellerDeleteAccount);
  const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);
  const [activeSection, setActiveSection] = useState('users');

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (sellerError) {
      enqueueSnackbar(sellerError, { variant: 'error' });
      dispatch(clearErrorsSeller());
    }
    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (isDeleted) {
      enqueueSnackbar('User Deleted Successfully', { variant: 'success' });
      dispatch({ type: DELETE_USER_RESET });
    }
    if (isDeletedSeller) {
      enqueueSnackbar('Seller Deleted Successfully', { variant: 'success' });
      dispatch({ type: DELETE_SELLER_RESET });
    }

    dispatch(getAllUsers());
    dispatch(getAllSellers());
  }, [dispatch, error, sellerError, deleteError, isDeleted, isDeletedSeller, enqueueSnackbar]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const deleteSellerHandler = (id) => {
    dispatch(deleteSeller(id));
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              draggable="false"
              src={params.row.avatar}
              alt={params.row.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {params.row.name}
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 0.2,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => (
        <span
          className={`text-sm p-1 px-2 font-medium rounded-full capitalize ${
            params.row.role === 'admin'
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {params.row.role}
        </span>
      ),
    },
    {
      field: 'registeredOn',
      headerName: 'Registered On',
      type: 'date',
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 200,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Actions
          editRoute={activeSection === 'users' ? 'user' : 'seller'}
          deleteHandler={activeSection === 'users' ? deleteUserHandler : deleteSellerHandler}
          id={params.row.id}
          name={params.row.name}
        />
      ),
    },
  ];

  const rows = [];

  const activeData = activeSection === 'users' ? users : sellers;

  activeData &&
    activeData.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        avatar: item.avatar?.url || '/default-avatar.png',
        email: item.email,
        gender: item.gender?.toUpperCase() || 'N/A',
        role: item.role,
        registeredOn: new Date(item.createdAt).toISOString().substring(0, 10),
      });
    });

  return (
    <>
      <MetaData title="Admin accounts | RedKart24X7" />
      {(loading || loadingSellerDelete) && <BackdropLoader />}

      <section className="px-6 py-6 bg-white rounded-lg shadow-md w-full">
        <div className="flex border-b pb-2">
          <button
            onClick={() => setActiveSection('users')}
            className={`flex-1 text-center text-lg font-medium uppercase py-2 ${
              activeSection === 'users'
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveSection('sellers')}
            className={`flex-1 text-center text-lg font-medium uppercase py-2 ${
              activeSection === 'sellers'
                ? 'text-yellow-600 border-b-4 border-yellow-600'
                : 'text-gray-500 hover:text-yellow-600'
            }`}
          >
            Sellers
          </button>
        </div>
      </section>

      <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          sx={{
            boxShadow: 0,
            border: 0,
          }}
        />
      </div>
    </>
  );
};

export default AccountsTable;
