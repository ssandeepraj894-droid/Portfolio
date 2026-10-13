import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Strip query parameters
        clean_path = self.path.split('?')[0].rstrip('/')
        
        # Route /sandeepraj/portfolio or /sandeepraj to /index.html
        if clean_path in ['/sandeepraj/portfolio', '/sandeepraj']:
            self.path = '/index.html'
        elif self.path.startswith('/sandeepraj/portfolio/'):
            # Strip prefix so static assets like /sandeepraj/portfolio/style.css resolve to /style.css
            sub_path = self.path[len('/sandeepraj/portfolio'):]
            if sub_path in ['', '/']:
                self.path = '/index.html'
            else:
                self.path = sub_path
                
        return super().do_GET()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), PortfolioHTTPHandler) as httpd:
        print(f"Portfolio server active on port {PORT}")
        print(f"Local URL 1: http://localhost:{PORT}/")
        print(f"Requested Link: http://localhost:{PORT}/sandeepraj/portfolio")
        sys.stdout.flush()
        httpd.serve_forever()
