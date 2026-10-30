# Task 3 Evaluation: IFTTT + Adafruit IO IoT Automation

## 1. Task Objective
The objective of Task 3 is to construct an event-driven multi-cloud automation architecture by integrating the IFTTT (If This Then That) automation engine with Adafruit IO and the ESP32 hardware node. This enables hands-free physical device actuation triggered by external cloud events, such as Google Assistant voice commands, scheduled daily events, or mobile geofencing webhooks, without human dashboard interaction.

---

## 2. Original Evaluation Checklist & Statuses

| # | Official Checklist Criterion | Status | Evidence Path |
| :-: | :--- | :-: | :--- |
| 1 | Objective of the IoT automation | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2619-L2665) |
| 2 | Basic concept of IoT automation | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2667-L2710) |
| 3 | What IFTTT is and why it is used | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2712-L2755) |
| 4 | Trigger &rarr; Action concept explained | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2757-L2800) |
| 5 | Role of Adafruit IO in the automation | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2802-L2845) |
| 6 | Hardware and software used | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2847-L2915) |
| 7 | IFTTT Applet/workflow created and documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2917-L2960) |
| 8 | Trigger used identified | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2962-L3000) |
| 9 | Action performed identified | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3002-L3040) |
| 10 | How the trigger reaches the IoT system | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3042-L3105) |
| 11 | Communication/data-flow diagram | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3107-L3175) |
| 12 | ESP32 source code | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3177-L3260), [iot-content.ts](file:///e:/portfolio/iot-content.ts) |
| 13 | Screenshots of the IFTTT configuration | **PARTIAL** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3262-L3320) |
| 14 | Screenshots of the Adafruit IO dashboard/feed | **PASS** | [images/week7/task3/dashboard.jpg](file:///e:/portfolio/images/week7/task3/dashboard.jpg) |
| 15 | Photographs of the working prototype | **PASS** | [images/week7/task3/3.jpeg](file:///e:/portfolio/images/week7/task3/3.jpeg) |
| 16 | Video demonstrating the complete automation | **PASS** | [videos/week7/task3.mp4](file:///e:/portfolio/videos/week7/task3.mp4) |
| 17 | Automation tested under different conditions | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3450-L3500) |
| 18 | Problems and their solutions documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3502-L3550) |
| 19 | What you learned about cloud-based automation | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3552-L3595) |
| 20 | Brief reflection on the assignment | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3597-L3640) |

---

## 3. Implementation Details

### Cloud-to-Cloud Integration Pipeline
1. **Trigger Phase (THIS)**:
   - External event captured via Google Assistant voice intent ("Turn on lamp" / "Activate room lighting") or IFTTT Webhook button trigger.
   - Google voice server translates audio phonemes into structured NLP text and triggers the linked IFTTT service.
2. **Integration Phase (IFTTT Engine)**:
   - Evaluates the registered Applet condition.
   - Constructs an authenticated HTTP POST request to the Adafruit IO REST API endpoint (`https://io.adafruit.com/api/v2/<username>/feeds/<feed-key>/data`).
   - Attaches payload `{"value": "ON"}` and authenticates using the secret header `X-AIO-Key`.
3. **Broker Dispatch Phase (Adafruit IO)**:
   - Receives the webhook, records the new point in the feed's time-series database, and broadcasts the value over MQTT topic `<username>/feeds/lamp-control`.
4. **Edge Actuation Phase (ESP32)**:
   - The ESP32's active MQTT subscriber callback captures the message packet.
   - Sets `GPIO23` to `LOW`, driving the optocoupler and energizing the relay coil to illuminate the AC lamp.

---

## 4. Evidence Available

1. **Firmware Source Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L3177-L3260) and [iot-content.ts](file:///e:/portfolio/iot-content.ts#L168-L235).
   - Complete C++ sketch for subscription parsing and relay actuation.
2. **Adafruit IO Dashboard/Feed Screenshot**:
   - Location: [images/week7/task3/dashboard.jpg](file:///e:/portfolio/images/week7/task3/dashboard.jpg) (1376x768 JPEG, 567 KB).
   - Shows Adafruit IO feed historical log receiving automated data entries from IFTTT.
3. **Working Hardware Prototype Photograph**:
   - Location: [images/week7/task3/3.jpeg](file:///e:/portfolio/images/week7/task3/3.jpeg) (1600x924 JPEG, 116 KB).
   - Photograph showing the physical prototype with ESP32, relay module, and lamp connected and powered.
4. **Complete Automation Video Demonstration**:
   - Location: [videos/week7/task3.mp4](file:///e:/portfolio/videos/week7/task3.mp4) (832x464, 60fps, 12.1s, 2.20 MB).
   - Video proves the complete multi-cloud chain: triggering the action in the cloud results in the physical light switching ON on the hardware test bench.
5. **Architectural Pipeline Flowchart**:
   - Embedded SVG diagram in [week7-details.html](file:///e:/portfolio/week7-details.html#L3107-L3175) illustrating the 4-stage pipeline.

---

## 5. Missing Evidence

- **Criterion 13 (Screenshots of the IFTTT configuration)**:
  - *Current State*: Topic 13 in `week7-details.html` explains the Applet creation procedure and displays an SVG architecture pipeline diagram. However, a raw visual screenshot capturing the actual IFTTT web/mobile Applet setup card (showing "If [Google Assistant] Then [Adafruit IO Send data to feed]") is missing from `images/week7/task3/`.
  - *Status*: **PARTIAL**.

---

## 6. Verification Notes (Code Inspection vs. Physical Testing)
- **Code Inspection**: Confirmed `Adafruit_MQTT_Client` configuration, subscription handling, and hardware pin actuation logic.
- **Hardware Verification**: Video ([task3.mp4](file:///e:/portfolio/videos/week7/task3.mp4)) verifies that receiving automated cloud values toggles the AC lamp through the relay module.

---

## 7. Problems Encountered and Solutions
1. **Cloud Multi-Hop Latency**:
   - *Problem*: Cumulative latency between Google Voice processing, IFTTT webhook dispatch, and Adafruit IO broker delivery introduced a 2-3 second delay.
   - *Solution*: Optimized IFTTT polling triggers by migrating from generic RSS/polling triggers to instant webhooks and direct service integrations.
2. **OAuth Token Invalidation**:
   - *Problem*: Adafruit IO connection in IFTTT expired after changing account credentials.
   - *Solution*: Re-linked the Adafruit IO service under IFTTT Account Settings and verified active OAuth token handshake.
3. **Payload String Parsing Mismatches**:
   - *Problem*: IFTTT dispatched `"ON"` in uppercase while dashboard sent `"1"`.
   - *Solution*: Updated ESP32 firmware parser to handle case-insensitive string matching and both numeric/character tokens (`payload == "1" || payload == "ON"`).

---

## 8. Remaining Actions
- [ ] Capture a screenshot of the IFTTT Applet configuration page (showing the trigger block and Adafruit IO action block).
- [ ] Save the screenshot as `images/week7/task3/ifttt_config.png`.
- [ ] Add the image tag to Topic 13 in `week7-details.html` to promote Criterion 13 from **PARTIAL** to **PASS**.

