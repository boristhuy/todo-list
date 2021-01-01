const PROXY_CONFIG = [
  {
    context: [
      "/todos",
      "/tags"
    ],
    target: "http://localhost:8080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
