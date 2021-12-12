const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/socket.io"
        ],
        target: "http://backend:5000",
        secure: false,
	changeOrigin: true
    }
]

module.exports = PROXY_CONFIG;
