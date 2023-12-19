
import './App.css';
import router from './front/routing/router';
import { RouterProvider } from "react-router-dom";
import { ContextWrapper } from './front/context/ContextWrapper';
import { useContext, useEffect } from 'react';
import { AppContext } from './front/context/ContextWrapper';


function App() {
  const context = useContext(ContextWrapper)


  return (
    <div className="App">
      <ContextWrapper value={context}>
        <RouterProvider router={router} />
      </ContextWrapper>
    </div>
  );
}

export default App;
