import type { AppProps } from "next/app";
import "@/lang/i18n";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
