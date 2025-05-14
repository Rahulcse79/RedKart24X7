import { Link } from 'react-router-dom';

const categories = [
  { title: "Create Store", link: "/seller/create-store" },
  { title: "Bank Account Setup", link: "/seller/bank-account" },
  { title: "Business Information", link: "/seller/business-info" },
  { title: "Document Upload", link: "/seller/upload-documents" },
  { title: "Verification", link: "/seller/verification" },
  { title: "Ready to Sell", link: "/seller/ready-to-sell" },
];

const SellerOnBoarding = ({ steps }) => {
  return (
    <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
      <div className="flex items-center justify-between p-4 relative">
        {categories.map((el, i) => (
          <div key={el.title} className="flex flex-col items-center flex-1 relative">
            <Link
              to={el.link}
              className={`text-sm font-medium p-2 z-10 ${
                steps[i] === 2
                  ? 'text-red-600 font-semibold'
                  : steps[i] === 1
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {el.title}
            </Link>
            {i < categories.length && (
              <div className="absolute bottom-0 left-1/2 w-full h-0.5 -translate-x-1/2 z-0">
                <div
                  className={`h-full ${
                    steps[i] === 2 
                      ? 'bg-red-500'
                      : steps[i] === 1 
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellerOnBoarding;
