import React, {createContext} from 'react';
// import './index.css';
import './App.css'
import ReactDOM from "react-dom/client";
import App from './App';
import Store from "./store/store";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

// ReactDOM.render(
//     <Context.Provider value={{
//         store
//     }}>
//         <App />
//     </Context.Provider>,
//   document.getElementById('root')
// );


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider value={{
        store
    }}>
    <App />
    </Context.Provider>
  </React.StrictMode>
);
