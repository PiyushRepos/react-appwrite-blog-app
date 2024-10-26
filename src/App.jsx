import "./App.css";
import { conf } from "./conf/conf";

function App() {
  console.log(conf.APPWRITE_COLLECTION_ID);
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
