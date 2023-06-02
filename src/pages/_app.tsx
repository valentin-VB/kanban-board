import { wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../sass/main.scss";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/Layout/Layout";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <PersistGate persistor={store.persistor}>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </PersistGate>
  );
}
export default App;
