// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    // "/user",
    createProxyMiddleware("/", {
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );

app.use(
  '/socket.io',
  createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true
  })
);  
};