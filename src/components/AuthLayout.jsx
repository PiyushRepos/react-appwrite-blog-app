import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    // we can do this also
    // if (authStatus === true) {
    //   navigate("/");
    // } else if (authStatus == false) {
    //   navigate("/login");
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoading(false);
  }, [authStatus, authentication, navigate]);

  return loading ? <h2>Loading...</h2> : { children };
}
