ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      clientId: "12345678901234567890",
      loginStyle: "popup",
      secret: "secret12345678901234567890"
    }
  }
);
 