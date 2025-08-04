import React, { useEffect } from "react";

const StripeConnectRetry = () => {
  useEffect(() => {
    window.location.href = "qanony://connect-retry";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>جارٍ توجيهك لإعادة المحاولة...</h2>
      <p>
        إذا لم يتم التوجيه تلقائياً،{" "}
        <a href="qanony://connect-retry">اضغط هنا</a>
      </p>
    </div>
  );
};

export default StripeConnectRetry;
