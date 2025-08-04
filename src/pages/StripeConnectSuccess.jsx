import React, { useEffect } from "react";

const StripeConnectSuccess = () => {
  useEffect(() => {
    window.location.replace = "qanony://connect-success";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>جارٍ توجيهك إلى التطبيق...</h2>
      <p>
        إذا لم يتم التوجيه تلقائياً،{" "}
        <a href="qanony://connect-success">اضغط هنا</a>
      </p>
    </div>
  );
};

export default StripeConnectSuccess;
