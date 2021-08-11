import useDeviceDetect from '../components/useDeviceDetect';
import MobileView from '../components/MobileView';
import '../styles/reset.css';

function MyApp({ Component, pageProps }) {
  const isMobile = useDeviceDetect().isMobile

  return (
      isMobile ? <Component {...pageProps} /> : <MobileView {...pageProps} />
  )
}
export default MyApp