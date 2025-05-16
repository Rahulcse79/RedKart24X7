import { useEffect, useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "Contact Us",
        redirect: "https://www.RedKart24X7.com/helpcentre",
      },
      {
        name: "About Us",
        redirect: "https://www.RedKart24X7.com/about-us",
      },
      {
        name: "Careers",
        redirect: "https://www.RedKart24X7careers.com",
      },
      {
        name: "RedKart24X7 Stories",
        redirect: "https://stories.RedKart24X7.com",
      },
      {
        name: "Press",
        redirect: "https://stories.RedKart24X7.com/category/top-stories/news",
      },
      {
        name: "RedKart24X7 Wholesale",
        redirect: "https://www.RedKart24X7wholesale.com",
      },
      {
        name: "Corporate Information",
        redirect: "https://www.RedKart24X7.com/corporate-information",
      },
    ]
  },
  {
    title: "help",
    links: [
      {
        name: "Payments",
        redirect: "https://www.RedKart24X7.com/pages/payments",
      },
      {
        name: "Shipping",
        redirect: "https://www.RedKart24X7.com/pages/shipping",
      },
      {
        name: "Cancellation & Returns",
        redirect: "https://www.RedKart24X7.com/helpcentre?catalog=55c9c6edb000002e002c1701&view=CATALOG",
      },
      {
        name: "FAQ",
        redirect: "https://www.RedKart24X7.com/helpcentre?catalog=55c9c8e2b0000023002c1702&view=CATALOG",
      }
    ]
  },
  {
    title: "policy",
    links: [
      {
        name: "Return Policy",
        redirect: "https://www.RedKart24X7.com/pages/returnpolicy",
      },
      {
        name: "Terms Of Use",
        redirect: "https://www.RedKart24X7.com/pages/terms",
      },
      {
        name: "Security",
        redirect: "https://www.RedKart24X7.com/pages/paymentsecurity",
      },
      {
        name: "Privacy",
        redirect: "https://www.RedKart24X7.com/pages/privacypolicy",
      },
      {
        name: "Sitemap",
        redirect: "https://www.RedKart24X7.com/sitemap",
      },
      {
        name: "EPR Compliance",
        redirect: "https://www.RedKart24X7.com/pages/ewaste-compliance-tnc",
      },
    ]
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "https://www.facebook.com/RedKart24X7",
      },
      {
        name: "Twitter",
        redirect: "https://twitter.com/RedKart24X7",
      },
      {
        name: "YouTube",
        redirect: "https://www.youtube.com/RedKart24X7",
      }
    ]
  }
]

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin") || location.pathname.split("/", 3).includes("d2"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">

              {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-primary-grey mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, i) => (
                    <a href={item.redirect} target="_blank" rel="noreferrer" className="hover:underline" key={i}>{item.name}</a>
                  ))}

                </div>
              ))}

            </div>

            <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Mail Us:</h2>
                <p className="mt-2 leading-5">RedKart24X7 Internet Private Limited,<br />
                  Buildings Alyssa, Begonia &<br />
                  Clove Embassy Tech Village,<br />
                  Outer Ring Road, Devarabeesanahalli Village,<br />
                  Bengaluru, 560103,<br />
                  Karnataka, India
                </p>
              </div>

              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Registered Office Address:</h2>
                <p className="mt-2 leading-5">RedKart24X7 Internet Private Limited,<br />
                  Buildings Alyssa, Begonia &<br />
                  Clove Embassy Tech Village,<br />
                  Outer Ring Road, Devarabeesanahalli Village,<br />
                  Bengaluru, 560103,<br />
                  Karnataka, India <br />
                  CIN : U51109KA2012PTC066107<br />
                  Telephone: <a className="text-primary-blue" href="tel:18002029898">1800 202 9898</a>
                </p>
              </div>
            </div>

          </footer>
          {/* <!-- footer ends --> */}

          <div className="px-16 py-6 w-full bg-primary-darkBlue hidden sm:flex justify-between items-center text-sm text-white">
            <Link to="/seller/home" className="flex items-center gap-2">
              <span className="text-red-400">
                <CardGiftcardIcon sx={{ fontSize: "20px" }} />
              </span>
              Sell On RedKart24X7
            </Link>
            <Link to="/giftCards" className="flex items-center gap-2">
              <span className="text-red-400">
                <CardGiftcardIcon sx={{ fontSize: "20px" }} />
              </span>
              Gift Cards
            </Link>
            <Link to="/helpCenter" className="flex items-center gap-2">
              <span className="text-red-400">
                <CardGiftcardIcon sx={{ fontSize: "20px" }} />
              </span>
              Help center
            </Link>
            <span>&copy; 2025-{new Date().getFullYear()} RedKart24X7.com</span>
            <img draggable="false" src={paymentMethods} alt="Card Payment" />
          </div>
        </>
      )}
    </>
  )
};

export default Footer;
