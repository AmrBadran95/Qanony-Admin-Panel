const sendNotification = async ({ fcmToken, title, body, data }) => {
  const payload = {
    fcmToken: fcmToken,
    title: title,
    body: body,
    data: data,
  };

  await fetch(
    "https://qanony-payment-production.up.railway.app/api/notifications/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
};

export default { sendNotification };
