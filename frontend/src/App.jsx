import { Box} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/ui/Navbar"
import { Toaster } from "./components/ui/toaster"



function App() {


  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />

        </Routes>
        < Toaster />
      </Box>
       
    </>
  )
}

export default App
