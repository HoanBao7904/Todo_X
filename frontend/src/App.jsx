import { Toaster } from 'sonner'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <Toaster richColors />
      {/* <button onClick={() => toast("hello")}>toaster</button> */}
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<NotFound />} path='*' />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
