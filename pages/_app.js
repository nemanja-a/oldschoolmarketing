import useDeviceDetect from '../components/useDeviceDetect';
import '../styles/reset.css';

function MyApp({ Component, pageProps }) {
  const isMobile = useDeviceDetect().isMobile

  return (
      !isMobile ? <Component {...pageProps} /> : <div style={
        {background: "#cda500", display: "flex", justifyContent: "center",
         alignItems: "center", color: "white", fontSize: "10vh"}}
         >Coming Soon</div>
  )
}
export default MyApp