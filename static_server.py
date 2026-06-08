from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).parent / "static-demo"


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        requested = ROOT / path.lstrip("/").split("?", 1)[0]
        if requested.is_file():
            return str(requested)
        return str(ROOT / "index.html")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 5173), Handler)
    print("ÇARKAVO demo: http://127.0.0.1:5173")
    server.serve_forever()
