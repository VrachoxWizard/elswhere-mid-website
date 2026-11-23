import os
import cv2
import numpy as np
from PIL import Image

def prepare_background():
    print("Preparing clean background assets with precise masking...")
    # Load inner UI from ui_inner.png
    img = cv2.imread('ui_inner.png')
    h, w, c = img.shape
    print(f"Loaded ui_inner.png: {w}x{h}")

    # Create mask for text and UI elements to remove
    mask = np.zeros((h, w), dtype=np.uint8)

    # 1. Logo "elsewhere." (x: 20-300, y: 15-85)
    logo_roi = img[15:85, 20:300]
    logo_bright = (logo_roi[:, :, 0] > 110) & (logo_roi[:, :, 1] > 110) & (logo_roi[:, :, 2] > 110)
    mask[15:85, 20:300][logo_bright] = 255

    # 2. Nav links (x: 480-920, y: 15-80)
    nav_roi = img[15:80, 480:920]
    nav_bright = (nav_roi[:, :, 0] > 100) & (nav_roi[:, :, 1] > 100) & (nav_roi[:, :, 2] > 100)
    mask[15:80, 480:920][nav_bright] = 255

    # 3. Top right: "PLAN YOUR ESCAPE" and menu circle (x: 1040-1475, y: 15-85)
    tr_roi = img[15:85, 1040:1475]
    tr_bright = (tr_roi[:, :, 0] > 90) | ((tr_roi[:, :, 1] > 90) & (tr_roi[:, :, 2] > 90))
    mask[15:85, 1040:1475][tr_bright] = 255

    # 4. Hero eyebrow: "A DIFFERENT KIND OF GETAWAY" (x: 520-980, y: 110-160)
    eyebrow_roi = img[110:160, 520:980]
    eyebrow_bright = (eyebrow_roi[:, :, 0] > 90) & (eyebrow_roi[:, :, 1] > 90) & (eyebrow_roi[:, :, 2] > 90)
    mask[110:160, 520:980][eyebrow_bright] = 255

    # 5. Hero title: "Get Lost." & "Feel Found." (x: 420-1080, y: 150-345)
    title_roi = img[150:345, 420:1080]
    title_bright = (title_roi[:, :, 0] > 90) & (title_roi[:, :, 1] > 90) & (title_roi[:, :, 2] > 90)
    mask[150:345, 420:1080][title_bright] = 255

    # 6. Hero subtitle: "For the places you've never seen..." (x: 460-1040, y: 340-395)
    sub_roi = img[340:395, 460:1040]
    sub_bright = (sub_roi[:, :, 0] > 90) & (sub_roi[:, :, 1] > 90) & (sub_roi[:, :, 2] > 90)
    mask[340:395, 460:1040][sub_bright] = 255

    # 7. Hero action buttons:
    # Primary button: x: 460-750, y: 390-440
    btn_roi = img[390:440, 460:750]
    btn_bright = (btn_roi[:, :, 0] > 140) & (btn_roi[:, :, 1] > 140) & (btn_roi[:, :, 2] > 140)
    mask[390:440, 460:750][btn_bright] = 255

    # Secondary button "EXPLORE THE COLLECTION ->": x: 760-1030, y: 390-435
    sec_roi = img[390:435, 760:1030]
    sec_bright = (sec_roi[:, :, 0] > 120) & (sec_roi[:, :, 1] > 120) & (sec_roi[:, :, 2] > 120)
    mask[390:435, 760:1030][sec_bright] = 255

    # 8. Bottom HUD text elements (y: 740 to 835)
    # Location pin + Switzerland + coordinates (x: 30-300)
    loc_roi = img[740:835, 30:300]
    loc_bright = (loc_roi[:, :, 0] > 140) & (loc_roi[:, :, 1] > 140) & (loc_roi[:, :, 2] > 140)
    mask[740:835, 30:300][loc_bright] = 255

    # Divider line + The Alpine Collection (x: 290-450)
    alp_roi = img[740:835, 290:450]
    alp_bright = (alp_roi[:, :, 0] > 130) & (alp_roi[:, :, 1] > 130) & (alp_roi[:, :, 2] > 130)
    mask[740:835, 290:450][alp_bright] = 255

    # Scroll to Wander (x: 600-900)
    scroll_roi = img[740:835, 600:900]
    scroll_bright = (scroll_roi[:, :, 0] > 130) & (scroll_roi[:, :, 1] > 130) & (scroll_roi[:, :, 2] > 130)
    mask[740:835, 600:900][scroll_bright] = 255

    # 01 / 04 and < | > controls (x: 1200-1470)
    ctrl_roi = img[740:835, 1200:1470]
    ctrl_bright = (ctrl_roi[:, :, 0] > 130) & (ctrl_roi[:, :, 1] > 130) & (ctrl_roi[:, :, 2] > 130)
    mask[740:835, 1200:1470][ctrl_bright] = 255

    # Dilate mask by 3 pixels to fully capture anti-aliased text edges
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    dilated_mask = cv2.dilate(mask, kernel, iterations=1)

    cv2.imwrite('debug_mask.png', dilated_mask)

    print("Inpainting with Navier-Stokes...")
    inpainted = cv2.inpaint(img, dilated_mask, 4, cv2.INPAINT_NS)

    out_png = 'assets/images/background-clean.png'
    out_webp = 'assets/images/background-clean.webp'
    cv2.imwrite(out_png, inpainted)

    pil_img = Image.fromarray(cv2.cvtColor(inpainted, cv2.COLOR_BGR2RGB))
    pil_img.save(out_webp, 'WEBP', quality=96, method=6)

    print(f"Saved {out_png} and {out_webp} successfully.")

if __name__ == '__main__':
    prepare_background()
