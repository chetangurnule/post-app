import "./App.css";
import { Container, Footer, Header, PostCard } from "./components/index";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Home />
      </Container>
      <Footer />
    </>
  );
}

export default App;
