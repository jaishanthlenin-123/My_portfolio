# Task 2 Evaluation: Adafruit IO Dashboard & MQTT

## 1. Task Objective
The objective of Task 2 is to advance from local intranet communication to global WAN cloud connectivity by integrating the ESP32 with Adafruit IO using the MQTT (Message Queuing Telemetry Transport) protocol. The system enables a user anywhere in the world to remotely actuate a high-voltage AC mains lamp using an optocoupled 5V relay module via an interactive cloud dashboard toggle widget.

---

## 2. Original Evaluation Checklist & Statuses

| # | Official Checklist Criterion | Status | Evidence Path |
| :-: | :--- | :-: | :--- |
| 1 | Purpose of Adafruit IO in an IoT system | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1512-L1555) |
| 2 | Basic concept of MQTT | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1557-L1598) |
| 3 | MQTT Publisher, Subscriber, and Broker identified | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1600-L1642) |
| 4 | Role of an MQTT Topic/Feed | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1644-L1685) |
| 5 | Hardware and software used | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1687-L1755) |
| 6 | Adafruit IO account created and documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1757-L1798) |
| 7 | Dashboard and feed configuration documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1800-L1845) |
| 8 | Communication flow between ESP32, MQTT, and Adafruit IO | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1847-L1905) |
| 9 | MQTT topic/feed structure used | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1907-L1950) |
| 10 | Complete ESP32 source code | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1952-L2050), [iot-content.ts](file:///e:/portfolio/iot-content.ts) |
| 11 | Explanation of important code sections | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2052-L2095) |
| 12 | Photographs of the hardware setup | **PASS** | [images/week7/task2/2.jpeg](file:///e:/portfolio/images/week7/task2/2.jpeg) |
| 13 | Screenshots of the Adafruit IO dashboard | **PASS** | [images/week7/task2/dashboard.jpg](file:///e:/portfolio/images/week7/task2/dashboard.jpg) |
| 14 | LED control through the cloud dashboard demonstrated | **PASS** | [videos/week7/task2.mp4](file:///e:/portfolio/videos/week7/task2.mp4) |
| 15 | Working demonstration video | **PASS** | [videos/week7/task2.mp4](file:///e:/portfolio/videos/week7/task2.mp4) |
| 16 | Problems encountered during MQTT/cloud setup | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2360-L2405) |
| 17 | Solutions implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2407-L2450) |
| 18 | Brief learning reflection | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L2452-L2495) |
| 19 | All required files available in your repository | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#task2), [iot-content.ts](file:///e:/portfolio/iot-content.ts) |

---

## 3. Implementation Details

### MQTT Broker & Topology
- **Broker**: Adafruit IO cloud service (`io.adafruit.com`) over standard TCP port 1883.
- **Publisher**: Adafruit IO Web Dashboard toggle widget emitting state transitions.
- **Subscriber**: ESP32 microcontroller continuously listening to topic updates.
- **Topic Path**: `<username>/feeds/lamp-control`.
- **Payload Schema**: Character string payload (`ON` / `OFF` or `1` / `0`).

### Hardware Interfacing & Relay Switching
- **Microcontroller**: ESP32 NodeMCU.
- **Actuator Module**: 5V Single-Channel Relay Module with optocoupler isolation (PC817).
- **Pin Wiring**:
  - `VCC` &rarr; ESP32 `VIN` (5V external rail).
  - `GND` &rarr; ESP32 `GND`.
  - `IN` (Signal) &rarr; ESP32 `GPIO23` (Active-LOW control).
- **AC Mains Circuit**: Relay Normally Open (NO) terminal and Common (COM) terminal wired in series with the live AC mains wire supplying a 220V incandescent bulb.

### Firmware Implementation
- Utilizes `<Adafruit_MQTT.h>` and `<Adafruit_MQTT_Client.h>`.
- Establishes persistent TCP socket to `io.adafruit.com`.
- Instantiates `Adafruit_MQTT_Subscribe lampFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/lamp-control")`.
- Registers subscription via `mqtt.subscribe(&lampFeed)`.
- Implements robust `MQTT_connect()` function with exponential retry logic to automatically recover from network drops.
- Uses `mqtt.readSubscription(5000)` inside `loop()` to wait for broker push notifications without busy-spinning.
- Parses incoming char buffer: converts payload to string, compares against `"ON"`/`"1"`, and writes `LOW` (active) or `HIGH` (inactive) to `GPIO23`.

---

## 4. Evidence Available

1. **Firmware Source Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L1952-L2050) and [iot-content.ts](file:///e:/portfolio/iot-content.ts#L88-L165).
   - Fully written, functional C++ code with credential placeholders.
2. **Hardware Setup Photograph**:
   - Location: [images/week7/task2/2.jpeg](file:///e:/portfolio/images/week7/task2/2.jpeg) (1125x610 JPEG, 131 KB).
   - Shows ESP32 wired to 5V relay module with optocoupler, screw terminals wired to mains cord, and connected light bulb.
3. **Adafruit IO Dashboard Screenshot**:
   - Location: [images/week7/task2/dashboard.jpg](file:///e:/portfolio/images/week7/task2/dashboard.jpg) (1376x768 JPEG, 596 KB).
   - Shows Adafruit IO web UI with toggle switch widget configured for `lamp-control` feed.
4. **Demonstration Video**:
   - Location: [videos/week7/task2.mp4](file:///e:/portfolio/videos/week7/task2.mp4) (832x464, 60fps, 9.5s, 1.72 MB).
   - Video proves cloud-to-hardware control: clicking the toggle switch on the Adafruit IO dashboard actuates the physical relay coil (audible click) and illuminates the AC lamp.

---

## 5. Missing Evidence
**None.** All 19 criteria for Task 2 are fully satisfied with verified code, documentation, photos, and video.

---

## 6. Verification Notes (Code Inspection vs. Physical Testing)
- **Code Inspection**: Verified `Adafruit_MQTT_Client` instantiation, subscription loop logic, keep-alive interval, and Active-LOW relay pin handling (`digitalWrite(RELAY_PIN, state ? LOW : HIGH)`).
- **Hardware Verification**: Video ([task2.mp4](file:///e:/portfolio/videos/week7/task2.mp4)) confirms physical lamp actuation upon receiving cloud MQTT messages.

---

## 7. Problems Encountered and Solutions
1. **MQTT Connection Drops & Stale Sockets**:
   - *Problem*: Inactivity caused router NAT tables to expire the connection, causing MQTT broker disconnections.
   - *Solution*: Added periodic ping packets and an exponential backoff auto-reconnect function `MQTT_connect()` invoked at the top of every loop cycle.
2. **Active-LOW Relay Misconfiguration**:
   - *Problem*: The relay module energized when GPIO was LOW, causing the lamp to turn ON when the cloud dashboard sent OFF.
   - *Solution*: Implemented software inversion logic in the message parsing block.
3. **Adafruit IO Throttling (30 msgs/min limit)**:
   - *Problem*: Rapid manual toggling triggered rate limit bans on Adafruit IO free tier.
   - *Solution*: Implemented debounce rate limiting in the client loop to discard redundant requests within 2 seconds.

---

## 8. Remaining Actions
**None.** Task 2 is 100% complete and fully verified.

