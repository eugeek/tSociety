import {useRef} from "react";
import CreateForm from "./components/CreateForm";
import Map from "./components/Map";
import './App.css';

function NotRendererApp () {
    const functionRef = useRef();
    return <div>
        <Map onClick={() => functionRef?.current(true)} />
        <CreateForm functionRef={functionRef} />
    </div>;
}

function App() {
  return (
      <>
          <NotRendererApp />
      </>
  );
}

export default App;
