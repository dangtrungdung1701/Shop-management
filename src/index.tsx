import ReactDOM from "react-dom";
import { PersistGate } from "zustand-persist";
import { createBrowserHistory } from "history";

import Toast from "components/Toast";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// let persistor = persistStore(store);
const history = createBrowserHistory();
ReactDOM.render(
  <PersistGate loading={null}>
    <Toast>
      <App />
    </Toast>
  </PersistGate>,
  document.getElementById("root"),
);

reportWebVitals();
