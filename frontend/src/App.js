import * as Imports from './Imports';

function App() {

  const dispatch = Imports.useDispatch();
  const { pathname } = Imports.useLocation();

  Imports.useEffect(() => {
    Imports.WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  Imports.useEffect(() => {
    dispatch(Imports.loadUser());
    dispatch(Imports.loadSeller());
  }, [dispatch]);

  Imports.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });

  return (
    <>
      <Imports.Header />
      <Imports.Routes>
        <Imports.Route path="/" element={<Imports.Home />} />
        <Imports.Route path="/login" element={<Imports.Login />} />
        <Imports.Route path="/register" element={<Imports.Register />} />

        <Imports.Route path="/downloadapp" element={<Imports.DownloadAppPage />} />
        <Imports.Route path="/giftCards" element={<Imports.GiftCards />} />
        <Imports.Route path="/helpCenter" element={<Imports.HelpCenter />} />

        <Imports.Route path="/seller/home" element={<Imports.SellOnRedKart24X7 />} />
        <Imports.Route path="/seller/login" element={<Imports.SellerLogin />} />
        <Imports.Route path="/seller/otp/based/login" element={<Imports.SellerOTPBasedLogin />} />
        <Imports.Route path="/seller/register" element={<Imports.SellerRegister />} />
        <Imports.Route path="/seller/forgot" element={<Imports.SellerForgotPassword />} />
        <Imports.Route path="/password/seller/reset/:token" element={<Imports.SellerResetPassword />} />

        <Imports.Route path="/product/:id" element={<Imports.ProductDetails />} />
        <Imports.Route path="/products" element={<Imports.Products />} />
        <Imports.Route path="/products/:keyword" element={<Imports.Products />} />

        <Imports.Route path="/cart" element={<Imports.Cart />} />

        {/* Seller route */}
        <Imports.Route path="/seller/dashboard" element={
          <Imports.SellerProtectedRoute>
            <Imports.SellerDashboard />
          </Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/edit/store" element={
          <Imports.SellerProtectedRoute>
            <Imports.SellerEditStoreInfo />
          </Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/create-store" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.CreateStore />
          </Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route >

        <Imports.Route path="/seller/bank-account" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.SellerBankAccountADDForm />
          </ Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/business-info" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.BusinessInfo />
          </ Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/upload-documents" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.DocumentUpload />
          </ Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/verification" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.SellerVerification />
          </ Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/ready-to-sell" element={
          < Imports.SellerOnBoardingProtectedRoute >
            <Imports.ReadyToSell />
          </ Imports.SellerOnBoardingProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/dashboard" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={0}>
              <Imports.SellerProductHome />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route >

        <Imports.Route path="/seller/d2/orders" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={1}>
              <Imports.SellerProductOrders />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/products" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={2}>
              <Imports.SellerProducts />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/new_product" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={3}>
              <Imports.SellerAddProducts />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/product/:id" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={3}>
              <Imports.SellerUpdateProducts />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/reviews" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerProtectedDashboard activeTab={4}>
              <Imports.SellerProductsReviews />
            </Imports.SellerProtectedDashboard>
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/seller/d2/update" element={
          < Imports.SellerProtectedRoute >
            <Imports.SellerUpdateProfile />
          </ Imports.SellerProtectedRoute>
        } ></Imports.Route>


        <Imports.Route path="/shipping" element={
          <Imports.ProtectedRoute>
            <Imports.Shipping />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/order/confirm" element={
          <Imports.ProtectedRoute>
            <Imports.OrderConfirm />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/process/payment" element={
          <Imports.ProtectedRoute>
            {/* // stripeApiKey && ( */}
            {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
            <Imports.Payment />
            {/* // </Elements> */}
            {/* ) */}
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/orders/success" element={<Imports.OrderSuccess success={true} />} />
        {/* order process */}

        <Imports.Route path="/order/:id" element={
          <Imports.ProtectedRoute>
            <Imports.OrderStatus />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/orders" element={
          <Imports.ProtectedRoute>
            <Imports.MyOrders />
          </Imports.ProtectedRoute>
        }></Imports.Route>

        <Imports.Route path="/order_details/:id" element={
          <Imports.ProtectedRoute>
            <Imports.OrderDetails />
          </Imports.ProtectedRoute>
        }></Imports.Route>

        <Imports.Route path="/account" element={
          <Imports.ProtectedRoute>
            <Imports.Account />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/account/update" element={
          <Imports.ProtectedRoute>
            <Imports.UpdateProfile />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/password/update" element={
          <Imports.ProtectedRoute>
            <Imports.UpdatePassword />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/password/forgot" element={<Imports.ForgotPassword />} />

        <Imports.Route path="/OTP" element={<Imports.OTP />} />

        <Imports.Route path="/password/reset/:token" element={<Imports.ResetPassword />} />

        <Imports.Route path="/wishlist" element={
          <Imports.ProtectedRoute>
            <Imports.Wishlist />
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/dashboard" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={0}>
              <Imports.MainData />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/orders" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={1}>
              <Imports.OrderTable />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/order/:id" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={1}>
              <Imports.UpdateOrder />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/products" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={2}>
              <Imports.ProductTable />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/product/:id" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={2}>
              <Imports.UpdateProduct />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/users" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={3}>
              <Imports.UserTable />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/user/:id" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={3}>
              <Imports.UpdateUser />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="/admin/reviews" element={
          <Imports.ProtectedRoute isAdmin={true}>
            <Imports.Dashboard activeTab={4}>
              <Imports.ReviewsTable />
            </Imports.Dashboard>
          </Imports.ProtectedRoute>
        } ></Imports.Route>

        <Imports.Route path="*" element={<Imports.NotFound />}></Imports.Route>

      </Imports.Routes >
      <Imports.Footer />
    </>
  );
}

export default App;
