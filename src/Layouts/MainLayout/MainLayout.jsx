
import NavbarComp from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router'


const MainLayout = () => {
  return (
   <>
   <NavbarComp/>
   <Outlet/>
     
   </>
  )
}

export default MainLayout