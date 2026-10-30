# ProtoSem Week 7 — Remaining Issues & Remediation Action Plan

**Audit Date:** October 30, 2026  
**Audited Target:** [https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html)  
**Current Audit Status:** 100 PASS, 2 PARTIAL, 0 NOT COMPLETED (98.04% Official Completion)

---

## 1. Overview of Remaining Partial Items

Out of 102 official criteria, **100 are rated PASS** and **0 are NOT COMPLETED**.  
Only **2 criteria** have been evaluated as **PARTIAL** because they ask specifically for UI screenshots of external cloud dashboards/consoles, whereas the portfolio currently provides detailed SVG architecture diagrams, hardware photos, and full video demonstrations instead of direct web portal screen captures.

| # | Task | Checklist Criterion | Current State | Deficit | Remediation Effort |
| :-: | :--- | :--- | :--- | :--- | :---: |
| **1** | **Task 3** | Criterion 13: *Screenshots of the IFTTT configuration* | Detailed SVG data flow diagram and step-by-step trigger/action workflow are documented. | Missing direct PNG/JPEG screenshot of the IFTTT web portal Applet configuration card ("If Adafruit IO Feed Value > Threshold, Then Send Email/Notification"). | 5 minutes |
| **2** | **Task 4** | Criterion 16: *Screenshots of the Firebase database* | Dual-channel JSON schema (`/sensors` and `/control`) is documented and demonstrated via live web UI and video. | Missing direct PNG/JPEG console screenshot showing the raw Firebase Realtime Database tree for the Task 4 schema. | 5 minutes |

---

## 2. Remediation Details & Instructions

### Item 1: Task 3 — Criterion 13: Screenshots of the IFTTT Configuration

#### Description & Context
- **Criterion Text:** `Screenshots of the IFTTT configuration`
- **Location in Checklist:** Task 3, Item 13.
- **Why it is currently PARTIAL:** The portfolio has 4 physical setup and mobile notification screenshots (`images/week7/task3/3 (1).jpeg` to `3 (4).jpeg`), an embedded architecture SVG diagram, and a full MP4 demonstration video. However, an explicit screenshot of the IFTTT Applet builder (showing the "If This Then That" trigger configuration card) is not included.

#### Remediation Steps:
1. Log in to [IFTTT](https://ifttt.com/) and open the Applet configured for Week 7 (e.g., Adafruit IO feed monitor trigger or Webhooks event).
2. Take a clear browser screenshot of the Applet overview/edit screen showing:
   - **Trigger ("If"):** Adafruit IO feed monitor (or Webhook event) with threshold settings.
   - **Action ("Then"):** Email, Webhook, or Push notification action.
3. Save the image to:
   ```
   images/week7/task3/ifttt_applet_configuration.png
   ```
4. Insert the image reference into `week7-details.html` within the Task 3 gallery section:
   ```html
   <div class="gallery-item">
     <img src="images/week7/task3/ifttt_applet_configuration.png" alt="IFTTT Applet Configuration and Trigger Rules" loading="lazy">
     <div class="gallery-caption">
       <strong>IFTTT Applet Configuration:</strong> Webhooks trigger and threshold rules linking Adafruit IO feeds to automated alerting actions.
     </div>
   </div>
   ```

---

### Item 2: Task 4 — Criterion 16: Screenshots of the Firebase Database

#### Description & Context
- **Criterion Text:** `Screenshots of the Firebase database`
- **Location in Checklist:** Task 4, Item 16.
- **Why it is currently PARTIAL:** Task 5 now has an authentic Firebase Realtime Database screenshot showing historical logging nodes (`images/week7/task5/firebase_realtime_database_history.png`), but Task 4 specifically focuses on the real-time monitoring and control channels:
  ```json
  {
    "sensors": {
      "temperature": 28.5,
      "humidity": 65.0,
      "ldr": 450,
      "timestamp": 1730275200
    },
    "control": {
      "relay": 1,
      "mode": "auto",
      "threshold": 500
    }
  }
  ```
  The portfolio currently represents this schema in code and SVG diagrams, but lacks a direct screenshot of the Firebase RTDB web console tree displaying this specific structure.

#### Remediation Steps:
1. Open the [Firebase Console](https://console.firebase.google.com/) for your project.
2. Navigate to **Build > Realtime Database > Data**.
3. Expand the `/sensors` and `/control` nodes in the tree viewer.
4. Capture a clean browser screenshot showing both nodes with active values.
5. Save the image to:
   ```
   images/week7/task4/firebase_sensors_control_database.png
   ```
6. Insert the image reference into `week7-details.html` within the Task 4 gallery section:
   ```html
   <div class="gallery-item">
     <img src="images/week7/task4/firebase_sensors_control_database.png" alt="Firebase Realtime Database Sensors and Control Tree" loading="lazy">
     <div class="gallery-caption">
       <strong>Firebase RTDB Console:</strong> Real-time `/sensors` telemetry stream and `/control` actuation state tree.
     </div>
   </div>
   ```

---

## 3. Post-Remediation Verification & Deployment

Once the two screenshots are placed in their respective folders and linked in `week7-details.html`:

1. Update the checklist statuses in `Week7_Final_Live_Checklist.md`:
   - Change Task 3 Criterion 13 from `PARTIAL` to `PASS`.
   - Change Task 4 Criterion 16 from `PARTIAL` to `PASS`.
2. Update `Week7_Final_Summary.md` to reflect:
   - PASS: **102 / 102 (100.00%)**
   - PARTIAL: **0**
3. Commit and push the changes:
   ```bash
   git add images/week7/task3/ifttt_applet_configuration.png
   git add images/week7/task4/firebase_sensors_control_database.png
   git add week7-details.html
   git add Week7_Final_Live_Audit/
   git commit -m "feat: attach Task 3 IFTTT and Task 4 Firebase console screenshots to achieve 100% audit score"
   git push host main
   ```
4. Verify on GitHub Pages that both images load with HTTP status `200 OK`.
