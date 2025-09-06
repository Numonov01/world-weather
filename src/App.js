import React, { useState } from "react";
import Login from "./Login";
import Map from "./Maps";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setSelectPosition] = useState(null);

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Map setSelectPosition={setSelectPosition} />
      )}
    </div>
  );
};

export default App;
