import { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';
import { clearErrors, deleteAdminReview, getAllAdminReviews } from '../../actions/productAction';
import { DELETE_REVIEW_ADMIN_RESET, ALL_REVIEWS_ADMIN__RESET } from '../../constants/productConstants';

const ReviewsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");
    const { reviews, error } = useSelector((state) => state.adminReview);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.adminDeleteReview);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" && productId.length === 24) {
            dispatch(getAllAdminReviews(productId));
        } else if (productId.length !== 24) {
            dispatch({ type: ALL_REVIEWS_ADMIN__RESET });
        }
    }, [productId, dispatch]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_ADMIN_RESET });
            dispatch(getAllAdminReviews(productId));
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar, handleKeyDown]);

    const deleteAdminReviewHandler = (id) => {
        dispatch(deleteAdminReview(id, productId));
    };

    const handleClick = () => {
        if (productId.length === 24) {
            dispatch(getAllAdminReviews(productId));
        } else {
            enqueueSnackbar("Please enter a 24 digit product ID.", { variant: "error" });
            dispatch({ type: ALL_REVIEWS_ADMIN__RESET });
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 200,
            flex: 0.3,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => (
                <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            ),
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => (
                <Actions editRoute={"review"} deleteHandler={deleteAdminReviewHandler} id={params.row.id} />
            ),
        },
    ];

    const rows = reviews?.map((rev) => ({
        id: rev._id,
        rating: rev.rating,
        comment: rev.comment,
        user: rev.name,
    })) || [];

    return (
        <>
            <MetaData title="Admin Reviews | RedKart24X7" />
            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center gap-2 sm:gap-12 mb-4">
                <h1 className="text-lg font-medium uppercase">Reviews</h1>
                <input
                    type="text"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="outline-none border-0 rounded p-2 w-full shadow hover:shadow-lg"
                />
                <span
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
                >
                    Search
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 450 }}>
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

export default ReviewsTable;
