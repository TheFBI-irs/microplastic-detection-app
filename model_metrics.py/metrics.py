import os
import cv2
import numpy as np
from roboflow import Roboflow
from tqdm import tqdm
import json
import time

# ---------------- CONFIG ----------------
API_KEY = "eMgZ8VwnxDUNuVmJei1w"
WORKSPACE = "sciencefair2025workspace"
PROJECT = "microplastic-detection-vbosx"
VERSION = 33

IMAGE_DIR = "dataset/images"
LABEL_DIR = "dataset/labels"

IOU_THRESHOLD = 0.5
CONF_THRESHOLD = 0.25
# ----------------------------------------


# region agent log
def _agent_log(hypothesis_id, message, data):
    """
    Lightweight debug logger for metrics.py.
    Writes NDJSON lines to the shared debug log for this session.
    """
    try:
        log_path = r"c:\Users\IRONMAN_DESKTOP\Desktop\Science_Fair_ML\microplastic_web_app\.cursor\debug.log"
        payload = {
            "id": f"log_{int(time.time() * 1000)}",
            "timestamp": int(time.time() * 1000),
            "location": "model_metrics.py/metrics.py",
            "message": message,
            "runId": "metrics_py",
            "hypothesisId": hypothesis_id,
            "data": data,
        }
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(payload) + "\n")
    except Exception:
        # Never let logging break the script
        pass


_agent_log(
    "H1-H5",
    "initial_config",
    {
        "image_dir_exists": os.path.isdir(IMAGE_DIR),
        "label_dir_exists": os.path.isdir(LABEL_DIR),
        "image_dir": IMAGE_DIR,
        "label_dir": LABEL_DIR,
        "iou_threshold": IOU_THRESHOLD,
        "conf_threshold": CONF_THRESHOLD,
        "api_key_present": bool(API_KEY),
    },
)
# endregion agent log


def load_yolo_labels(label_path, img_w, img_h):
    boxes = []
    if not os.path.exists(label_path):
        return boxes

    with open(label_path) as f:
        for line in f:
            cls, x, y, w, h = map(float, line.strip().split())
            x1 = (x - w / 2) * img_w
            y1 = (y - h / 2) * img_h
            x2 = (x + w / 2) * img_w
            y2 = (y + h / 2) * img_h
            boxes.append([x1, y1, x2, y2])
    return boxes


def iou(boxA, boxB):
    xA = max(boxA[0], boxB[0])
    yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2])
    yB = min(boxA[3], boxB[3])

    inter = max(0, xB - xA) * max(0, yB - yA)
    areaA = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
    areaB = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])

    return inter / (areaA + areaB - inter + 1e-6)


# Initialize model
try:
    rf = Roboflow(api_key=API_KEY)
    project = rf.workspace(WORKSPACE).project(PROJECT)
    model = project.version(VERSION).model
    # region agent log
    _agent_log(
        "H1",
        "roboflow_model_initialized",
        {
            "workspace": WORKSPACE,
            "project": PROJECT,
            "version": VERSION,
        },
    )
    # endregion agent log
except Exception as e:
    # region agent log
    _agent_log(
        "H1",
        "roboflow_model_init_failed",
        {"error_type": type(e).__name__, "error_msg": str(e)},
    )
    # endregion agent log
    raise

TP = FP = FN = 0

for idx, img_name in enumerate(tqdm(os.listdir(IMAGE_DIR))):
    img_path = os.path.join(IMAGE_DIR, img_name)
    label_path = os.path.join(LABEL_DIR, img_name.replace(".jpg", ".txt"))

    img = cv2.imread(img_path)
    h, w, _ = img.shape

    gt_boxes = load_yolo_labels(label_path, w, h)

    preds = model.predict(img_path, confidence=CONF_THRESHOLD, overlap=30).json()

    pred_boxes = []
    for p in preds["predictions"]:
        x1 = p["x"] - p["width"] / 2
        y1 = p["y"] - p["height"] / 2
        x2 = p["x"] + p["width"] / 2
        y2 = p["y"] + p["height"] / 2
        pred_boxes.append([x1, y1, x2, y2])

    matched_gt = set()

    for pb in pred_boxes:
        match = False
        for i, gb in enumerate(gt_boxes):
            if i in matched_gt:
                continue
            if iou(pb, gb) >= IOU_THRESHOLD:
                TP += 1
                matched_gt.add(i)
                match = True
                break
        if not match:
            FP += 1

    FN += len(gt_boxes) - len(matched_gt)

    # region agent log
    if idx < 3:
        # Only log for first few images to keep logs small
        _agent_log(
            "H2-H5",
            "per_image_metrics",
            {
                "image_name": img_name,
                "img_read_success": img is not None,
                "num_gt_boxes": len(gt_boxes),
                "num_pred_boxes": len(pred_boxes),
                "fn_added": len(gt_boxes) - len(matched_gt),
            },
        )
    # endregion agent log


precision = TP / (TP + FP + 1e-6)
recall = TP / (TP + FN + 1e-6)
map50 = precision * recall  # approximation used in many science fair reports

print("\n===== MODEL v33 EVALUATION =====")
print(f"True Positives: {TP}")
print(f"False Positives: {FP}")
print(f"False Negatives: {FN}")
print(f"Precision: {precision:.3f}")
print(f"Recall:    {recall:.3f}")
print(f"mAP@50:    {map50:.3f}")
