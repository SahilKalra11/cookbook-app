import React, { useEffect } from "react";
import Content from "../Content/content";
import Footer from "../Footer/footer";

import { IsLoggedIn } from "../../../utility/generalMethods";
import { useHistory } from "react-router-dom";
const Layout = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!IsLoggedIn()) {
      history.push("/auth/login");
    }
  }, []);

  return (
    <div className="main">
      <Content />
      <Footer />
    </div>
  );
};

export default Layout;
