import { Fragment } from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthConsumer, AuthProvider } from "../contexts/auth-context";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { theme } from "../theme";
import { persistor } from "../store/configureStore";
import { store, wrapper } from "../store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Camporest admin</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthProvider>
                <AuthConsumer>
                  {(auth) =>
                    auth.isLoading ? (
                      <Fragment />
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )
                  }
                </AuthConsumer>
              </AuthProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default wrapper.withRedux(App);
