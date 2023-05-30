import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout({ children }) {

  return (
    <>
      <Header />
      <Container>
        <div
          component="main"
          
        >
          <Outlet />
        </div>     
      </Container>
    </>
  );
}
