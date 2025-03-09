import React, { useEffect } from "react";
import Home from "./pages/Home";
import mixpanel from "./mixpanel";
import { v4 as uuidv4 } from "uuid"; // Generates unique IDs

const App: React.FC = () => {
  useEffect(() => {
    // Check if the user already has a stored ID
    let distinctId = localStorage.getItem("mixpanel_distinct_id");

    if (!distinctId) {
      distinctId = uuidv4(); // Generate a new unique ID
      localStorage.setItem("mixpanel_distinct_id", distinctId);
    }

    // Identify the user (anonymous or logged in)
    mixpanel.identify(distinctId);

    // Track the user landing event
    mixpanel.track("User Landed on Website");

  }, []);

  return <Home />;
};

export default App;
