import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppRouter} from "./providers/router";


const queryClient = new QueryClient()


export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
        <AppRouter/>
    </QueryClientProvider>
  )
}

