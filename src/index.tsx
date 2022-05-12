import ReactDOM from "react-dom";
import { PersistGate } from "zustand-persist";
import { createBrowserHistory } from "history";

import Toast from "components/Toast";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PageLoading from "components/PageLoading";

// let persistor = persistStore(store);
const history = createBrowserHistory();
ReactDOM.render(
  <PersistGate loading={null}>
    <Toast>
      {/* <PageLoading /> */}
      <App />
    </Toast>
  </PersistGate>,
  document.getElementById("root"),
);

reportWebVitals();
