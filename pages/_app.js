import "tailwindcss/tailwind.css";
import "../src/static/global.sass";
import { Theme } from "../src/utils/theme";
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "../styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
