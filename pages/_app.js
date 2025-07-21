import { Provider } from "react-redux";
import dynamic from 'next/dynamic';
import { SessionProvider } from "next-auth/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { CommonProvider } from '../contexts/common/commonContext';
import { CartProvider } from '../contexts/cart/cartContext';
import { FiltersProvider } from '../contexts/filters/filtersContext';
import store from "../redux/store";
import "../public/style.scss";

// Dynamic imports for non-critical components
const ScrollToTop = dynamic(() => import('../components/common/ScrollTop'), { ssr: false });
const Seo = dynamic(() => import('../components/common/seo'), { ssr: false });
const Header = dynamic(() => import('../components/common/Header'), { ssr: false });
const Footer = dynamic(() => import('../components/common/Footer'), { ssr: false });

if (typeof window !== "undefined") {
  import("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId="292357132637-hnm7gr7pq4p0c6n6jfsce6jhdjupuhbb.apps.googleusercontent.com">
      <SessionProvider>
        <Seo
          font={
            "https://fonts.googleapis.com/css?family=Nunito:400,400i,500,600,700&display=swap"
          }
        />
        <Provider store={store}>
          <CommonProvider>
            <FiltersProvider>
              <CartProvider>
                <Header />
                <div id="__next" className="content">
                  <Component {...pageProps} />
                </div>
                <Footer className="Footer" />
              </CartProvider>
            </FiltersProvider>
          </CommonProvider>
        </Provider>
        <ScrollToTop />
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
