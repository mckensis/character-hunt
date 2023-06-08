import Header from "./components/Header";
import Main from "./components/Main";
import { DataProvider } from "./context/GameContext";

function App() {
  return (
    <DataProvider>
      <Header />
      <Main />
    </DataProvider>
  )
}

export default App;