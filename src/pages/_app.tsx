import type { AppProps } from "next/app";
import "@/lang/i18n";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
