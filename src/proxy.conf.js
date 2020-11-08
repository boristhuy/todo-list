const PROXY_CONFIG = [
  {
    context: [
      "/todos",
      "/tags"
    ],
    target: "http://localhost:3000",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
