import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuoteCard } from "./components/QuoteCard";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QuoteCard />
    </QueryClientProvider>
  )
}

export default App
