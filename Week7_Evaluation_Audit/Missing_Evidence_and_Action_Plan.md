# Week 7 Audit: Missing Evidence & Actionable Remediation Plan

This document provides a prioritized, actionable inventory of all documentation and media gaps identified during the complete evaluation audit of ProtoSem Week 7. By addressing these targeted action items, your portfolio will achieve a 100% flawless score across all 102 official evaluation criteria.

---

## 1. Audit Gap Summary

Out of **102 authoritative criteria**, exactly **2 criteria** were evaluated as **PARTIAL** due to missing raw graphical console/portal screenshots (despite having complete textual and schematic documentation):

| Task ID | Item # | Checklist Criterion | Current Status | Deficit | Priority |
| :---: | :---: | :--- | :---: | :--- | :---: |
| **Task 3** | 13 | Screenshots of the IFTTT configuration | **PARTIAL** | Missing screenshot of the IFTTT Applet visual builder | **HIGH** |
| **Task 4** | 16 | Screenshots of the Firebase database | **PARTIAL** | Missing screenshot of Firebase Console for Task 4 `/sensors` tree | **HIGH** |

All other 100 criteria across Tasks 1, 2, 3, 4, and 5 are fully satisfied and evaluated as **PASS**.

---

## 2. Detailed Gap Analysis & Remediation Instructions

### Gap 1: Task 3 &mdash; IFTTT Applet Configuration Screenshot (Criterion 13)
- **Criterion**: `Screenshots of the IFTTT configuration`
- **Current Portfolio State**:
  - In `week7-details.html#task3`, Topic 13 ("Automation Workflow & Applet Configuration") thoroughly explains the Trigger &rarr; Action pipeline and includes an embedded SVG architecture flowchart.
  - The Adafruit IO feed dashboard screenshot is present (`images/week7/task3/dashboard.jpg`), but there is no direct image of the IFTTT website or mobile app interface.
- **Why It Matters**:
  - Evaluators look for proof that you personally created and configured the IFTTT Applet rather than just understanding the concept theoretically.
- **Step-by-Step Remediation Action**:
  1. Open [IFTTT.com](https://ifttt.com/) on your browser and log into your account.
  2. Navigate to **My Applets** and click on your Week 7 IoT automation applet.
  3. Click **Settings** or view the Applet Summary page so that both the **"If"** block (Google Assistant or Webhook trigger) and the **"Then That"** block (Adafruit IO "Send data to feed" action) are visible on the screen.
  4. Capture a clean desktop screenshot.
  5. Crop and save the image as:
     `e:\portfolio\images\week7\task3\ifttt_config.png`
  6. Add the image into the Task 3 gallery in `week7-details.html` under Topic 13:
     ```html
     <div class="media-slot image-slot" style="margin: 24px 0;">
       <img src="images/week7/task3/ifttt_config.png" alt="IFTTT Applet Configuration" loading="lazy" style="width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.25);">
       <div class="media-caption">
         <span class="media-badge">IFTTT Applet</span>
         <h5>IFTTT Cloud Rule Configuration</h5>
         <p>IFTTT Applet connecting Google Assistant voice trigger to Adafruit IO feed actuation.</p>
       </div>
     </div>
     ```
  7. Once added, Criterion 13 will be promoted from **PARTIAL** to **PASS**.

---

### Gap 2: Task 4 &mdash; Firebase Realtime Database Node Tree Screenshot (Criterion 16)
- **Criterion**: `Screenshots of the Firebase database`
- **Current Portfolio State**:
  - In Task 4, Topic 22 ("Cloud Monitoring & Realtime Data Management") explains the database schema and data flow with an SVG diagram and JSON schema.
  - While you recently provided an authentic Firebase Realtime Database screenshot for Task 5 (`devices/history`), Task 4's specific tree containing the live `/sensors` (`temperature`, `humidity`, `ldr`) and `/control` (`bulb`) nodes is not separately captured as an image.
- **Why It Matters**:
  - Evaluators check whether your Firebase RTDB instance actually hosted the separate `/sensors` and `/control` branches corresponding to the Task 4 web dashboard.
- **Step-by-Step Remediation Action**:
  1. Open the [Firebase Console](https://console.firebase.google.com/) on your browser.
  2. Select your Week 7 Firebase project and click on **Realtime Database** in the left navigation menu.
  3. In the **Data** tab, expand the `/sensors` node to reveal `temperature`, `humidity`, and `ldr`, and expand `/control` to reveal `bulb`.
  4. Capture a desktop screenshot showing the Firebase URL header, the database name, and the expanded JSON tree.
  5. Crop and save the image as:
     `e:\portfolio\images\week7\task4\firebase_database.png`
  6. Add the image into the Task 4 gallery in `week7-details.html` under Topic 22:
     ```html
     <div class="media-slot image-slot" style="margin: 24px 0;">
       <img src="images/week7/task4/firebase_database.png" alt="Task 4 Firebase Realtime Database Tree" loading="lazy" style="width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.25);">
       <div class="media-caption">
         <span class="media-badge">Firebase Console</span>
         <h5>Firebase Realtime Database Hierarchy</h5>
         <p>Live JSON tree showing /sensors (temperature, humidity, ldr) and /control (bulb) nodes.</p>
       </div>
     </div>
     ```
  7. Once added, Criterion 16 will be promoted from **PARTIAL** to **PASS**.

---

## 3. Best-Practice Enhancements (Optional & Non-Blocking)

These items are already evaluated as **PASS**, but can further elevate your portfolio presentation:

1. **Standalone `.ino` Sketch Files in Root/Sketches Directory**:
   - Currently, all Arduino C++ sketches are cleanly embedded inside `<pre><code>` code wrappers in `week7-details.html` and bundled in TypeScript modules (`iot-content.ts` and `task4-content.ts`).
   - If an evaluator strictly searches for raw `.ino` files on disk, you can optionally export copies into a `/sketches` or `/hardware` directory:
     - `sketches/task1_webserver/task1_webserver.ino`
     - `sketches/task2_adafruit_mqtt/task2_adafruit_mqtt.ino`
     - `sketches/task3_ifttt_automation/task3_ifttt_automation.ino`
     - `sketches/task4_firebase_monitor/task4_firebase_monitor.ino`
     - `sketches/task5_firebase_logging/task5_firebase_logging.ino`
2. **Dedicated Circuit Schematic CAD Images (Fritzing/Wokwi)**:
   - All wiring connections are fully documented with structured SVG diagrams and pinout tables. Adding a Fritzing breadboard PNG export would provide additional visual polish.

---

## 4. Verification & Sign-Off Checklist

After adding the two missing screenshots, run the following verification steps:
- [ ] Confirm file exists: `images/week7/task3/ifttt_config.png`
- [ ] Confirm file exists: `images/week7/task4/firebase_database.png`
- [ ] Verify image links load in `week7-details.html` without 404 errors.
- [ ] Re-run the compliance audit to confirm **102 / 102 PASS (100%)**.

