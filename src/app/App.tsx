import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppRouter} from "./providers/router";
import { DBConfig } from "../shared/db/DBconfig";
import {IndexedDB, initDB} from "react-indexed-db-hook";

const queryClient = new QueryClient()
console.log('Init DB')
initDB(DBConfig)
export const App = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <IndexedDB name={DBConfig.name} version={DBConfig.version} objectStoresMeta={DBConfig.objectStoresMeta}>
          <AppRouter/>
      </IndexedDB>
    </QueryClientProvider>
  )
}

