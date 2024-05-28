import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppRouter} from "./providers/router";
import {Provider} from "react-redux";
import { store } from '../store'
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

const queryClient = new QueryClient()
//moment.locale("ru");
import { ConfigProvider } from "antd-mobile";
import ruRU from "antd-mobile/es/locales/ru-RU";
import moment from "moment/moment";

export const App = () => {

  const persistor = persistStore(store, );

  return (
      <ConfigProvider locale={ruRU}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouter/>
                </PersistGate>
            </Provider>
          </QueryClientProvider>
      </ConfigProvider>
  )
}

