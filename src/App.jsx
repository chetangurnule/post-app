import "./App.css";
import { Container, Footer, Header, AddPostForm } from "./components/index";

function App() {
  return (
    <>
      <Header />
      <Container>
        <AddPostForm />
      </Container>
      <Footer />
    </>
  );
}

export default App;
