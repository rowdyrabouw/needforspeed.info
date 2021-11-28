if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => {
      console.log("%c[app.js] Service Worker registered", "color: #5B9B4C");
    })
    .catch((err) => {
      console.error(err);
    });
}
