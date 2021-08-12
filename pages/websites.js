
import  MobileView  from "../components/mobile/MobileView"
import { WebView } from "../components/web/WebView"
import detectDevice from "../components/common/DeviceDetect"

export default function Websites() {
  const isMobile = detectDevice()

  return isMobile? <MobileView /> : <WebView />
}