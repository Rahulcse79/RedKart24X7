import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { clearErrors, deleteReview, getAllReviews } from '../../../actions/productAction';
import Rating from '@mui/material/Rating';
import Actions from './Actions';
import { DELETE_REVIEW_RESET, ALL_REVIEWS_RESET } from '../../../constants/productConstants';
import MetaData from '../../Layouts/MetaData';
import BackdropLoader from '../../Layouts/BackdropLoader';

const ReviewsTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");

    const { reviews, error } = useSelector((state) => state.reviews);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);

    useEffect((e) => {
    
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
            dispatch({ type: ALL_REVIEWS_RESET });
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_RESET });
            dispatch({ type: ALL_REVIEWS_RESET });
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, error, deleteError, isDeleted, productId, enqueueSnackbar]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && productId.length === 24) {
            dispatch(getAllReviews(productId));
        } else if (productId.length !== 24) {
            dispatch({ type: ALL_REVIEWS_RESET });
        }
    };

    const handleClick = () => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        } else {
            enqueueSnackbar("Please enter 12 digit id.", { variant: "fail" });
            dispatch({ type: ALL_REVIEWS_RESET });
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
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
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
            renderCell: (params) => {
                return (
                    <Actions editRoute={"review"} deleteHandler={deleteReviewHandler} id={params.row.id} />
                );
            },
        },
    ];

    let rows = [];

    reviews && reviews.forEach((rev) => {
        rows.push({
            id: rev._id,
            rating: rev.rating,
            comment: rev.comment,
            user: rev.name,
        });
    });

    return (
        <>
            <MetaData title="Seller Reviews | RedKart24X7" />

            {loading && <BackdropLoader />}
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <h1 className="text-lg font-medium uppercase">reviews</h1>
                <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} className="outline-none border-0 rounded p-2 w-full shadow hover:shadow-lg" />
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
                    disableSelectIconOnClick
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