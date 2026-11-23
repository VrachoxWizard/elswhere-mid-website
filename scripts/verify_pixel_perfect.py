import os
import sys
import time
import subprocess
import threading
import http.server
import socketserver
import numpy as np
from PIL import Image

PORT = 8098

def run_server():
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

def main():
    # Start server in background thread
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(1) # wait for server to start

    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    out_screenshot = os.path.abspath("render_1600x1200.png")
    
    # 1. Capture at 1600x1200 (exact size of Ui-reference.webp)
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size=1600,1200",
        f"--screenshot={out_screenshot}",
        f"http://localhost:{PORT}/index.html?view=mockup"
    ]
    print("Running Chrome Headless...")
    subprocess.run(cmd, check=True)
    print("Captured render_1600x1200.png")

    # Load rendered screenshot and original reference
    rendered = Image.open(out_screenshot).convert("RGB")
    reference = Image.open("Ui-reference.webp").convert("RGB")

    print(f"Rendered size: {rendered.size}, Reference size: {reference.size}")

    # Ensure same size
    if rendered.size != reference.size:
        rendered = rendered.resize(reference.size, Image.Resampling.LANCZOS)

    arr_rend = np.array(rendered)
    arr_ref = np.array(reference)

    # Compute absolute difference
    diff = np.abs(arr_rend.astype(int) - arr_ref.astype(int))
    mae = diff.mean()
    print(f"Mean Absolute Error (all channels): {mae:.2f}")

    # Create visual heatmap of differences
    diff_gray = diff.mean(axis=2).astype(np.uint8)
    diff_colored = np.zeros_like(arr_rend)
    diff_colored[:, :, 0] = np.clip(diff_gray * 4, 0, 255) # Red for differences
    diff_colored[:, :, 1] = 0
    diff_colored[:, :, 2] = 0

    # Save heatmap
    Image.fromarray(diff_colored).save("diff_heatmap.png")

    # Save side-by-side comparison (width: 1600 * 2 = 3200, height: 1200)
    # Downscaled to 1600x600 for easy visual inspection
    side_by_side = Image.new("RGB", (rendered.width * 2, rendered.height))
    side_by_side.paste(reference, (0, 0))
    side_by_side.paste(rendered, (rendered.width, 0))
    
    sbs_preview = side_by_side.resize((1600, 600), Image.Resampling.LANCZOS)
    sbs_preview.save("comparison_side_by_side.png")
    print("Saved comparison_side_by_side.png and diff_heatmap.png")

    # Also crop inner UI from rendered (51, 178, 1549, 1022) to compare with ui_inner.png
    inner_rendered = rendered.crop((51, 178, 1549, 1022))
    inner_rendered.save("render_inner_ui.png")

    if os.path.exists("ui_inner.png"):
        inner_ref = Image.open("ui_inner.png").convert("RGB")
        inner_diff = np.abs(np.array(inner_rendered).astype(int) - np.array(inner_ref).astype(int)).mean()
        print(f"Inner UI MAE: {inner_diff:.2f}")

if __name__ == '__main__':
    main()
