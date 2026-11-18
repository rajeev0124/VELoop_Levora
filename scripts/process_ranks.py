import sys
import os
from PIL import Image
import numpy as np

def extract_badge(input_path, output_path, target_size=(512, 512)):
    print(f"Processing: {input_path} -> {output_path}")
    im = Image.open(input_path).convert("RGBA")
    w, h = im.size
    
    # Resize to target size if needed
    if (w, h) != target_size:
        im = im.resize(target_size, Image.Resampling.LANCZOS)
        w, h = target_size

    arr = np.array(im, dtype=np.float32)
    rgb = arr[:, :, :3]
    brightness = np.max(rgb, axis=2) # Peak brightness

    # Connected component floodfill from the 4 corners to find true outer background
    from collections import deque
    is_bg = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    
    # Background threshold: pixels under this value connected to borders are background
    bg_thresh = 18.0
    
    queue = deque()
    # Seed corners and borders
    for x in range(w):
        for y in [0, h - 1]:
            if not visited[y, x] and brightness[y, x] <= bg_thresh:
                visited[y, x] = True
                queue.append((x, y))
    for y in range(h):
        for x in [0, w - 1]:
            if not visited[y, x] and brightness[y, x] <= bg_thresh:
                visited[y, x] = True
                queue.append((x, y))
                
    while queue:
        cx, cy = queue.popleft()
        is_bg[cy, cx] = True
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h:
                if not visited[ny, nx]:
                    visited[ny, nx] = True
                    if brightness[ny, nx] <= bg_thresh:
                        queue.append((nx, ny))

    # Anti-aliased alpha falloff
    # For background pixels, alpha = 0
    # For transitional edge pixels (brightness between 12 and 45 connected to bg), calculate smooth alpha
    alpha = np.ones((h, w), dtype=np.float32) * 255.0
    
    # Smooth feathering on border
    from scipy.ndimage import distance_transform_edt
    dist = distance_transform_edt(is_bg)
    
    for y in range(h):
        for x in range(w):
            if is_bg[y, x]:
                alpha[y, x] = 0.0
            else:
                b = brightness[y, x]
                if b < 38.0:
                    # Smooth ramp from 0 to 255 between 10 and 38
                    factor = np.clip((b - 10.0) / 28.0, 0.0, 1.0)
                    alpha[y, x] = factor * factor * 255.0

    arr[:, :, 3] = alpha
    result = Image.fromarray(np.uint8(arr), mode="RGBA")
    
    # Auto-crop padding slightly if needed and center
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result.save(output_path, format="PNG", optimize=True)
    print(f"Successfully saved transparent badge to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        extract_badge(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python process_ranks.py <input_img> <output_png>")
