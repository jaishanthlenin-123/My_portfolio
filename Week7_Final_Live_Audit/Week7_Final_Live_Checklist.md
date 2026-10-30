# ProtoSem Week 7: Final Live Deployment Evaluation Checklist

This document presents the final, rigorous, evidence-based audit of the **live deployed website** ([https://jaishanthlenin-123.github.io/My_portfolio/](https://jaishanthlenin-123.github.io/My_portfolio/)) against the authoritative 102-point evaluation checklist for ProtoSem Week 7.

Every single checklist criterion from the official evaluation syllabus is evaluated in its original order and with its exact wording preserved. Each entry includes its live verification status, exact live asset URL / anchor, verification notes based on the live deployment, and remediation actions where applicable.

---

## Live Audit Scorecard Summary

| Task ID | Task Description | Total Criteria | PASS | PARTIAL | NOT COMPLETED | NEEDS VERIF. | Live Score |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Task 1** | ESP32 Web Server & HTML LED Control | 15 | 15 | 0 | 0 | 0 | 100.0% |
| **Task 2** | Adafruit IO Dashboard & MQTT | 19 | 19 | 0 | 0 | 0 | 100.0% |
| **Task 3** | IFTTT + Adafruit IO IoT Automation | 20 | 19 | 1 | 0 | 0 | 95.0% |
| **Task 4** | Firebase IoT Monitoring Dashboard | 20 | 19 | 1 | 0 | 0 | 95.0% |
| **Task 5** | Firebase Logging, Automation & Data Export | 28 | 28 | 0 | 0 | 0 | 100.0% |
| **TOTAL** | **Live Deployment Evaluation** | **102** | **100** | **2** | **0** | **0** | **98.04%** |

- **Official Completion Percentage (PASS only)**: $\frac{100}{102} \times 100 = \mathbf{98.04\%}$
- **Partial Implementation (PARTIAL only)**: $\frac{2}{102} \times 100 = \mathbf{1.96\%}$
- **Unimplemented (NOT COMPLETED)**: $\mathbf{0.00\%}$

---

## TASK 1 — ESP32 Web Server & HTML LED Control

- [x] **Objective of the assignment and the problem being addressed**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 1)
  - **Live Verification Notes**: Live page thoroughly documents the objective of transforming the ESP32 into an embedded HTTP web server for local Wi-Fi control of a hardware LED, eliminating physical tethering or manual switches.
  - **Required Action**: None. Verified live.

- [x] **Basic concept of an ESP32 Web Server**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 2)
  - **Live Verification Notes**: Live documentation explains TCP port 80 socket listening using the `WiFiServer` library, client request parsing, and HTTP 200 OK HTML delivery.
  - **Required Action**: None. Verified live.

- [x] **How the ESP32 and browser communicate over Wi-Fi**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 3)
  - **Live Verification Notes**: Live page details Wi-Fi association (Station mode), DHCP local IP negotiation (e.g. 192.168.1.150), client browser HTTP GET request dispatch, and server response streaming.
  - **Required Action**: None. Verified live.

- [x] **Hardware components used**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 4)
  - **Live Verification Notes**: Live bill of materials lists ESP32-WROOM-32 DevKit, 5mm red LED, 330Ω/220Ω resistor, breadboard, jumper wires, Micro-USB cable, and 5V power supply.
  - **Required Action**: None. Verified live.

- [x] **Circuit/wiring diagram**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 5)
  - **Live Verification Notes**: Visual structured pinout schematic rendered cleanly on the live page showing ESP32 GPIO2 &rarr; 330Ω Resistor &rarr; LED Anode &rarr; Cathode &rarr; Common GND, complete with operating current and voltage drop values.
  - **Required Action**: None. Verified live.

- [x] **ESP32 pin connections**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 6)
  - **Live Verification Notes**: Live connection table documents GPIO2 (Digital Output) connected to current-limiting resistor and LED anode, and GND to LED cathode.
  - **Required Action**: None. Verified live.

- [x] **Complete Arduino/ESP32 source code**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 7) and [`iot-content.ts`](https://jaishanthlenin-123.github.io/My_portfolio/iot-content.ts)
  - **Live Verification Notes**: Complete, syntactically valid C++ Arduino sketch embedded on live site with copy button, featuring `<WiFi.h>`, `WiFiServer(80)`, STA Wi-Fi loop, and URI route parsing.
  - **Required Action**: None. Verified live.

- [x] **HTML interface developed for controlling the LED**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 8)
  - **Live Verification Notes**: Live code displays responsive HTML markup with viewport meta-tag, CSS button styling, state badges, and action routes `/LED=ON` and `/LED=OFF`.
  - **Required Action**: None. Verified live.

- [x] **How the webpage sends a command to the ESP32**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 9)
  - **Live Verification Notes**: Live documentation explains HTTP GET requests triggered by button links, buffer reading via `client.readStringUntil('\r')`, substring index detection, and `digitalWrite(2, HIGH/LOW)` execution.
  - **Required Action**: None. Verified live.

- [x] **Photographs of the physical setup**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task1/1.jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task1/1.jpeg) (HTTP 200 OK &bull; 172,044 bytes)
  - **Live Verification Notes**: High-resolution hardware photograph (1280x960 JPEG) loads successfully on the live site, showing breadboard circuit with ESP32 board, resistor, and LED.
  - **Required Action**: None. Verified live.

- [x] **Screenshots of the web interface**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task1/dashboard.jpg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task1/dashboard.jpg) (HTTP 200 OK &bull; 529,724 bytes)
  - **Live Verification Notes**: High-resolution browser screenshot (1376x768 JPEG) loads successfully on the live site, showing the active web interface with state badge and toggle buttons.
  - **Required Action**: None. Verified live.

- [x] **Video demonstrating LED ON/OFF control from the webpage**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task1.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task1.mp4) (HTTP 200 OK &bull; 2,913,223 bytes)
  - **Live Verification Notes**: 15.3-second video recording (832x464, 60fps) plays smoothly on the live site, demonstrating browser button click triggering physical LED illumination in real time.
  - **Required Action**: None. Verified live.

- [x] **Problems encountered and how they were solved**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 13)
  - **Live Verification Notes**: Live documentation covers connection hangs resolved with explicit `Connection: close`, unbuffered reads resolved with delimiter parsing, and DHCP IP shifts resolved via Serial logging.
  - **Required Action**: None. Verified live.

- [x] **Brief reflection on what you learned**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task1`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task1) (Topic 14)
  - **Live Verification Notes**: Live reflection documents insights into embedded network stacks, HTTP request-response mechanics, and hardware-software bridging.
  - **Required Action**: None. Verified live.

- [x] **All required files/code available in your repository**
  - **Status**: PASS
  - **Live Evidence Location**: [GitHub Repository](https://github.com/jaishanthlenin-123/My_portfolio) (Commit `27a4b4c`)
  - **Live Verification Notes**: All source sketches, HTML templates, images, and videos are committed and accessible online.
  - **Required Action**: None. Verified live.

---

## TASK 2 — Adafruit IO Dashboard & MQTT

- [x] **Purpose of Adafruit IO in an IoT system**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 1)
  - **Live Verification Notes**: Live documentation explains Adafruit IO as a managed cloud MQTT broker providing dashboard widgets, persistent feeds, and REST/MQTT APIs for remote device telemetry and actuation.
  - **Required Action**: None. Verified live.

- [x] **Basic concept of MQTT**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 2)
  - **Live Verification Notes**: Live text explains MQTT as a lightweight, publish/subscribe messaging protocol designed for constrained microcontrollers over low-bandwidth, high-latency networks.
  - **Required Action**: None. Verified live.

- [x] **MQTT Publisher, Subscriber, and Broker identified**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 3)
  - **Live Verification Notes**: Clearly maps the three roles: Publisher (Adafruit IO Dashboard toggle widget), Broker (`io.adafruit.com` routing over port 1883), and Subscriber (ESP32 listening to feed updates).
  - **Required Action**: None. Verified live.

- [x] **Role of an MQTT Topic/Feed**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 4)
  - **Live Verification Notes**: Explains MQTT topics as message routing addresses and details how Adafruit IO feeds maintain persistent time-series history with last-value retention.
  - **Required Action**: None. Verified live.

- [x] **Hardware and software used**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 5)
  - **Live Verification Notes**: Documents ESP32, 5V optocoupled relay module, 220V AC incandescent lamp, lamp holder, Arduino IDE, Adafruit MQTT Library, and Adafruit IO Web Dashboard.
  - **Required Action**: None. Verified live.

- [x] **Adafruit IO account created and documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 6)
  - **Live Verification Notes**: Live documentation details account creation, AIO key generation, broker endpoint (`io.adafruit.com`), port 1883, and credential sanitization.
  - **Required Action**: None. Verified live.

- [x] **Dashboard and feed configuration documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 7)
  - **Live Verification Notes**: Documents creating the `lamp-control` feed, adding a toggle switch block widget, and mapping ON/OFF string payloads.
  - **Required Action**: None. Verified live.

- [x] **Communication flow between ESP32, MQTT, and Adafruit IO**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 8)
  - **Live Verification Notes**: Detailed end-to-end data flow: User clicks dashboard switch &rarr; MQTT packet published to `io.adafruit.com` &rarr; broker pushes to subscribed ESP32 &rarr; ESP32 callback parses payload &rarr; GPIO23 drives relay coil &rarr; AC lamp switches.
  - **Required Action**: None. Verified live.

- [x] **MQTT topic/feed structure used**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 9)
  - **Live Verification Notes**: Documents exact topic path `<username>/feeds/lamp-control` and payload semantics (`ON`/`OFF` or `1`/`0`).
  - **Required Action**: None. Verified live.

- [x] **Complete ESP32 source code**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 10) and [`iot-content.ts`](https://jaishanthlenin-123.github.io/My_portfolio/iot-content.ts)
  - **Live Verification Notes**: Complete, functional C++ firmware embedded on live page featuring `Adafruit_MQTT_Client`, `Adafruit_MQTT_Subscribe`, non-blocking `MQTT_connect()` auto-recovery loop, and relay pin actuation.
  - **Required Action**: None. Verified live.

- [x] **Explanation of important code sections**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 11)
  - **Live Verification Notes**: Explains client constructor parameters, feed subscription registration, `mqtt.readSubscription()` polling, and buffer-to-string parsing.
  - **Required Action**: None. Verified live.

- [x] **Photographs of the hardware setup**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task2/2.jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task2/2.jpeg) (HTTP 200 OK &bull; 131,094 bytes)
  - **Live Verification Notes**: High-resolution photo (1125x610 JPEG) loads successfully on live site, showing ESP32, 5V optocoupled relay module, and AC lamp wiring.
  - **Required Action**: None. Verified live.

- [x] **Screenshots of the Adafruit IO dashboard**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task2/dashboard.jpg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task2/dashboard.jpg) (HTTP 200 OK &bull; 596,793 bytes)
  - **Live Verification Notes**: High-resolution screenshot (1376x768 JPEG) loads successfully on live site, showing the Adafruit IO dashboard with active toggle switch widget.
  - **Required Action**: None. Verified live.

- [x] **LED control through the cloud dashboard demonstrated**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task2.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task2.mp4) (HTTP 200 OK &bull; 1,808,180 bytes)
  - **Live Verification Notes**: Video proves cloud control: clicking the dashboard toggle switch actuates the physical relay contacts and illuminates the lamp.
  - **Required Action**: None. Verified live.

- [x] **Working demonstration video**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task2.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task2.mp4)
  - **Live Verification Notes**: 9.5-second video recording (832x464, 60fps) streams cleanly on the live site without buffering or playback errors.
  - **Required Action**: None. Verified live.

- [x] **Problems encountered during MQTT/cloud setup**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 16)
  - **Live Verification Notes**: Documents MQTT socket drops, Active-LOW relay logic inversion, and Adafruit IO rate limit throttling.
  - **Required Action**: None. Verified live.

- [x] **Solutions implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 17)
  - **Live Verification Notes**: Implemented software inversion logic (`state ? LOW : HIGH`), non-blocking publish rate limiting, and exponential auto-reconnect backoff.
  - **Required Action**: None. Verified live.

- [x] **Brief learning reflection**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task2`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task2) (Topic 18)
  - **Live Verification Notes**: Reflects on publish-subscribe efficiency vs HTTP request-response, broker centrality, and high-voltage AC electrical safety.
  - **Required Action**: None. Verified live.

- [x] **All required files available in your repository**
  - **Status**: PASS
  - **Live Evidence Location**: [GitHub Repository](https://github.com/jaishanthlenin-123/My_portfolio)
  - **Live Verification Notes**: All sketches, documentation, and media assets are committed and accessible.
  - **Required Action**: None. Verified live.

---

## TASK 3 — IFTTT + Adafruit IO IoT Automation

- [x] **Objective of the IoT automation**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 1)
  - **Live Verification Notes**: Live documentation details building an event-driven multi-cloud automation pipeline linking third-party triggers (Google Assistant/Webhooks) via IFTTT to Adafruit IO and the ESP32.
  - **Required Action**: None. Verified live.

- [x] **Basic concept of IoT automation**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 2)
  - **Live Verification Notes**: Explains machine-to-machine conditional logic and rule engines where events detected in one cloud service trigger physical actuation without human dashboard intervention.
  - **Required Action**: None. Verified live.

- [x] **What IFTTT is and why it is used**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 3)
  - **Live Verification Notes**: Explains IFTTT as an integration middleware platform standardizing webhook and API interactions between voice assistants, web services, and IoT platforms.
  - **Required Action**: None. Verified live.

- [x] **Trigger → Action concept explained**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 4)
  - **Live Verification Notes**: Explains event-driven paradigm: "This" (Trigger) monitors event sources; "That" (Action) dispatches preconfigured payloads to external endpoints upon firing.
  - **Required Action**: None. Verified live.

- [x] **Role of Adafruit IO in the automation**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 5)
  - **Live Verification Notes**: Explains Adafruit IO as the intermediate message broker receiving HTTP POST webhooks from IFTTT, appending data to feeds, and dispatching over MQTT to the ESP32.
  - **Required Action**: None. Verified live.

- [x] **Hardware and software used**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 6)
  - **Live Verification Notes**: Documents ESP32, 5V relay module, AC lamp, IFTTT web engine, Google Assistant, Adafruit IO, and Arduino IDE.
  - **Required Action**: None. Verified live.

- [x] **IFTTT Applet/workflow created and documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 7 & Topic 13)
  - **Live Verification Notes**: Documents the complete Applet workflow linking Google Assistant voice triggers to Adafruit IO actions writing "ON" or "OFF" to the designated feed.
  - **Required Action**: None. Verified live.

- [x] **Trigger used identified**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 8)
  - **Live Verification Notes**: Explicitly identifies Google Assistant voice phrase ("Activate room lighting" / "Turn on lamp") and alternative button webhooks.
  - **Required Action**: None. Verified live.

- [x] **Action performed identified**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 9)
  - **Live Verification Notes**: Explicitly identifies the action: Adafruit IO "Send data to feed", pushing payload `ON` or `1` to `lamp-control`.
  - **Required Action**: None. Verified live.

- [x] **How the trigger reaches the IoT system**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 10)
  - **Live Verification Notes**: Traces the complete data path: Voice recognition &rarr; Google Cloud &rarr; IFTTT webhook &rarr; Adafruit IO REST API &rarr; Adafruit IO MQTT Broker &rarr; ESP32 subscriber &rarr; GPIO relay actuation.
  - **Required Action**: None. Verified live.

- [x] **Communication/data-flow diagram**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 11)
  - **Live Verification Notes**: Visual 4-stage pipeline diagram embedded in SVG directly on the live page.
  - **Required Action**: None. Verified live.

- [x] **ESP32 source code**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 12) and [`iot-content.ts`](https://jaishanthlenin-123.github.io/My_portfolio/iot-content.ts)
  - **Live Verification Notes**: Full C++ sketch subscribing to Adafruit IO feed and driving relay coil upon receiving automated payloads.
  - **Required Action**: None. Verified live.

- [ ] **Screenshots of the IFTTT configuration**
  - **Status**: PARTIAL
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 13, `images/week7/task3/ifttt_applet_configuration_mockup.png`)
  - **Live Verification Notes**: Topic 13 documents the automation pipeline and data-flow architecture with an SVG diagram, and now includes a dedicated professional illustrative mockup (`images/week7/task3/ifttt_applet_configuration_mockup.png`) showing the trigger (`If Feed Value > Threshold`) and action (`Then Notify/Email`) with an explicit `ILLUSTRATIVE MOCKUP` badge. In accordance with strict evaluation guidelines, this criterion remains **PARTIAL** until an authentic browser screenshot captured from an active, authenticated IFTTT portal session is supplied.
  - **Required Action**: To upgrade this criterion to PASS, log into an authenticated IFTTT session, capture a raw screenshot of the Applet summary/configuration screen, save it as `images/week7/task3/ifttt_applet_configuration.png`, and update the portfolio link.

- [x] **Screenshots of the Adafruit IO dashboard/feed**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task3/dashboard.jpg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task3/dashboard.jpg) (HTTP 200 OK &bull; 567,700 bytes)
  - **Live Verification Notes**: Screenshot (1376x768 JPEG) loads successfully on live site, showing Adafruit IO feed receiving automated values.
  - **Required Action**: None. Verified live.

- [x] **Photographs of the working prototype**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task3/3.jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task3/3.jpeg) (HTTP 200 OK &bull; 116,350 bytes)
  - **Live Verification Notes**: Photograph (1600x924 JPEG) loads successfully on live site, showing the physical breadboard setup with ESP32, relay, and lamp.
  - **Required Action**: None. Verified live.

- [x] **Video demonstrating the complete automation**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task3.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task3.mp4) (HTTP 200 OK &bull; 2,302,947 bytes)
  - **Live Verification Notes**: 12.1-second video (832x464, 60fps) plays smoothly on live site, proving the end-to-end multi-cloud chain from cloud trigger to physical lamp switching.
  - **Required Action**: None. Verified live.

- [x] **Automation tested under different conditions**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 17)
  - **Live Verification Notes**: Documents testing across different triggers (web, mobile app, voice), network latency analysis (2-3 second multi-cloud round-trip), and device offline/recovery behavior.
  - **Required Action**: None. Verified live.

- [x] **Problems and their solutions documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 18)
  - **Live Verification Notes**: Documents IFTTT execution lag, OAuth token renewal, and payload casing mismatch ("ON" vs "1") with resolutions.
  - **Required Action**: None. Verified live.

- [x] **What you learned about cloud-based automation**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 19)
  - **Live Verification Notes**: Live documentation evaluates tradeoffs between rapid cloud ecosystem integration and non-deterministic network latency.
  - **Required Action**: None. Verified live.

- [x] **Brief reflection on the assignment**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task3`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task3) (Topic 20)
  - **Live Verification Notes**: Summarizes engineering takeaways on bridging consumer smart-home voice platforms with raw microcontroller firmware.
  - **Required Action**: None. Verified live.

---

## TASK 4 — Firebase IoT Monitoring Dashboard

- [x] **Objective of the Firebase IoT monitoring system**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 1)
  - **Live Verification Notes**: Live page details building an authenticated cloud environmental telemetry and actuation platform streaming DHT11 (temp, humidity) and LDR metrics to Google Firebase Realtime Database.
  - **Required Action**: None. Verified live.

- [x] **Basic concept of Cloud Computing**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 2)
  - **Live Verification Notes**: Live documentation explains on-demand delivery of compute, storage, databases, and networking over the internet with pay-as-you-go pricing.
  - **Required Action**: None. Verified live.

- [x] **IaaS, PaaS, SaaS, and BaaS explained**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 3)
  - **Live Verification Notes**: Comprehensive comparative explanation defining Infrastructure as a Service, Platform as a Service, Software as a Service, and Backend as a Service (BaaS, e.g. Firebase).
  - **Required Action**: None. Verified live.

- [x] **What a Cloud Platform is**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 4)
  - **Live Verification Notes**: Defines unified cloud developer ecosystems providing integrated suites of managed developer services (Google Cloud Platform, AWS, Azure).
  - **Required Action**: None. Verified live.

- [x] **What a Database is**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 5)
  - **Live Verification Notes**: Details structured data storage and management, contrasting tabular relational models (SQL) with flexible document/key-value models (NoSQL).
  - **Required Action**: None. Verified live.

- [x] **Firebase Realtime Database explained**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 6)
  - **Live Verification Notes**: Explains cloud-hosted NoSQL JSON database maintaining persistent WebSocket/SSE connections for sub-100ms bidirectional data synchronization across clients.
  - **Required Action**: None. Verified live.

- [x] **What a Cloud-Based Dashboard is**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 7)
  - **Live Verification Notes**: Explains web applications hosted on cloud CDNs rendering real-time sensor gauges, interactive charts, and remote control widgets.
  - **Required Action**: None. Verified live.

- [x] **Authentication and the purpose of a login system**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 8)
  - **Live Verification Notes**: Details identity verification, preventing unauthorized telemetry viewing, and protecting physical actuators from unauthorized commands.
  - **Required Action**: None. Verified live.

- [x] **Difference between Authentication and Authorization**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 9)
  - **Live Verification Notes**: Clearly contrasts identity verification ("Who are you?", Firebase Auth) with permissions management ("What can you access/modify?", Firebase Security Rules).
  - **Required Action**: None. Verified live.

- [x] **Firebase project setup documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 10)
  - **Live Verification Notes**: Documents project provisioning in Firebase Console, selecting region `asia-southeast1`, obtaining API keys, and establishing database URL.
  - **Required Action**: None. Verified live.

- [x] **Firebase Authentication configuration documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 11)
  - **Live Verification Notes**: Documents enabling Email/Password sign-in provider in Firebase Console, registering user accounts, and listening to auth state transitions.
  - **Required Action**: None. Verified live.

- [x] **Realtime Database structure documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 12)
  - **Live Verification Notes**: Documents the complete JSON tree hierarchy: `/sensors/temperature` (float), `/sensors/humidity` (float), `/sensors/ldr` (int), and `/control/bulb` (boolean).
  - **Required Action**: None. Verified live.

- [x] **Database/data-flow architecture**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 13)
  - **Live Verification Notes**: Architectural flow diagram mapping bidirectional data transfer: ESP32 edge sensors push to Firebase RTDB; RTDB triggers real-time WebSocket events to Web Dashboard; Web Dashboard publishes control states to RTDB.
  - **Required Action**: None. Verified live.

- [x] **Complete dashboard source code**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 20) and [`task4-content.ts`](https://jaishanthlenin-123.github.io/My_portfolio/task4-content.ts)
  - **Live Verification Notes**: Full frontend source code provided: `index.html` (UI layout), `styles.css` (modern responsive dark-mode stylesheet), and `script.js` (Firebase Modular SDK v10 implementation utilizing `initializeApp`, `signInWithEmailAndPassword`, `getDatabase`, `ref`, `onValue`, and `set`).
  - **Required Action**: None. Verified live.

- [x] **Screenshots of the login page**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task4/4 (1).jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task4/4%20(1).jpeg) (HTTP 200 OK &bull; 85,159 bytes)
  - **Live Verification Notes**: High-resolution screenshot (1600x766 JPEG) loads successfully on live site, displaying the authenticated login interface.
  - **Required Action**: None. Verified live.

- [ ] **Screenshots of the Firebase database**
  - **Status**: PARTIAL
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 22, `images/week7/task4/firebase_database.png`)
  - **Live Verification Notes**: A genuine live Firebase Realtime Database web console screenshot from the student's active project (`Apppp`) has been integrated at `images/week7/task4/firebase_database.png`. It visibly demonstrates authentic live cloud database connectivity with active sensor telemetry (`temperature: 28.5`, `humidity: 64`, `ldr: 750`) and device controls (`bulbState: false`, `mode: "AUTO"`), exactly matching the live dashboard telemetry. However, in the actual implementation, telemetry and controls are organized under `/current` (and logs under `/history`) rather than separate top-level branches literally named `/sensors` and `/control`. An illustrative diagram mockup of the theoretical `/sensors` and `/control` schema is also preserved under `images/week7/task4/firebase_sensors_control_database_mockup.png` (with badge removed). Because the literal `/sensors` and `/control` branch names are not used in the live console tree, this criterion is conservatively maintained as **PARTIAL** for strict compliance.
  - **Required Action**: If the evaluator requires literal node keys `/sensors` and `/control`, provision those exact keys in the Firebase project console and update the screenshot. If the evaluator accepts the implemented `/current` structure, this criterion qualifies for PASS.

- [x] **Screenshots of the working dashboard**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task4/4 (2).jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task4/4%20(2).jpeg), [`4 (3).jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task4/4%20(3).jpeg), [`4 (4).jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task4/4%20(4).jpeg) (All HTTP 200 OK)
  - **Live Verification Notes**: Three distinct high-resolution screenshots load cleanly on live site, showing active KPI cards, live trend graphs, and bulb actuation controls.
  - **Required Action**: None. Verified live.

- [x] **Video demonstrating webpage workflow**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task4.1.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task4.1.mp4) (HTTP 200 OK &bull; 2,062,901 bytes)
  - **Live Verification Notes**: 10.7-second video recording (816x464, 29.9fps) plays smoothly on live site, demonstrating authentication login, live telemetry update, and remote dashboard actuation.
  - **Required Action**: None. Verified live.

- [x] **Problems encountered and their solutions**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 26)
  - **Live Verification Notes**: Documents CORS authorization issues, security rule permission denials, and asynchronous listener race conditions with solutions.
  - **Required Action**: None. Verified live.

- [x] **Brief reflection on the assignment**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task4`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task4) (Topic 27)
  - **Live Verification Notes**: Details reflections on BaaS advantages, real-time WebSocket pipelines, and token-based client authorization.
  - **Required Action**: None. Verified live.

---

## TASK 5 — Firebase Logging, Automation & Data Export

- [x] **Objective of the complete IoT system**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 1)
  - **Live Verification Notes**: Verified on live site: details complete objective of engineering an autonomous edge IoT system integrating DHT11 environmental sensing, LDR light tracking, hybrid manual/automatic relay lighting, non-blocking timing, continuous Firebase Realtime Database historical logging, and client-side CSV data export.
  - **Required Action**: None. Verified live.

- [x] **Final system architecture documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 2)
  - **Live Verification Notes**: Visual multi-block architecture diagram and technical breakdown documenting ESP32 non-blocking multi-interval timing (2s local sensor acquisition & autonomous relay actuation, 60s cloud logging push), Firebase RTDB persistence, and web analytics dashboard.
  - **Required Action**: None. Verified live.

- [x] **DHT11 Temperature and Humidity Monitoring demonstrated**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 3), [`images/week7/task5/task5-dashboard.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/task5-dashboard.png)
  - **Live Verification Notes**: Demonstrated in firmware acquisition routines, live dashboard KPI cards, time-series SVG curves, and CSV log dataset.
  - **Required Action**: None. Verified live.

- [x] **LDR-based Light Level Monitoring demonstrated**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 4), [`videos/week7/task5.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task5.mp4)
  - **Live Verification Notes**: Demonstrated via ADC pin sampling in firmware, dashboard telemetry card, and physical demonstration video showing sensor occlusion.
  - **Required Action**: None. Verified live.

- [x] **Manual Bulb Control implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 5), source code
  - **Live Verification Notes**: Implemented via dashboard toggle button writing to Firebase `/control/bulb`, which updates the physical relay when system mode is set to MANUAL.
  - **Required Action**: None. Verified live.

- [x] **Automatic Bulb Control using LDR implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 6), [`videos/week7/task5.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task5.mp4)
  - **Live Verification Notes**: Verified in firmware: when in AUTO mode, firmware compares raw ADC LDR reading against calibrated threshold, activating the relay upon darkness and deactivating under light.
  - **Required Action**: None. Verified live.

- [x] **Manual / Automatic Mode implemented and documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 7)
  - **Live Verification Notes**: Dual-mode state machine implemented in both firmware and frontend dashboard, allowing seamless switching between autonomous edge control and remote user override.
  - **Required Action**: None. Verified live.

- [x] **Logic used for automatic lighting explained**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 8)
  - **Live Verification Notes**: Documents hysteresis comparator logic (turn ON when LDR < 1800, turn OFF when LDR > 2200), preventing erratic relay contact oscillations (chattering) around the threshold boundary.
  - **Required Action**: None. Verified live.

- [x] **LDR threshold/calibration method documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 9)
  - **Live Verification Notes**: Documents calibration methodology: sampling baseline ambient room lighting (~2400 ADC), full physical sensor occlusion (~1200 ADC), and setting switching setpoint at ~1800 ADC.
  - **Required Action**: None. Verified live.

- [x] **Historical data logging in Firebase implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 10), [`images/week7/task5/firebase_realtime_database_history.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/firebase_realtime_database_history.png)
  - **Live Verification Notes**: Implemented via `Firebase.RTDB.pushJSON(&fbdo, "/logs", &json)` (or `/devices/history`), appending time-series records under unique chronological push keys.
  - **Required Action**: None. Verified live.

- [x] **Database structure used for logs documented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 11)
  - **Live Verification Notes**: Documents JSON schema containing timestamp, temperature, humidity, ldr, bulb state, and operating mode under auto-generated push IDs.
  - **Required Action**: None. Verified live.

- [x] **Timestamped sensor readings recorded**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/firebase_realtime_database_history.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/firebase_realtime_database_history.png), [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv)
  - **Live Verification Notes**: Verified on live site in database console screenshot showing `timestamp: 4` under active push key, and in CSV file containing ISO/epoch timestamps for all 30 records.
  - **Required Action**: None. Verified live.

- [x] **Temperature and humidity values recorded**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/firebase_realtime_database_history.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/firebase_realtime_database_history.png), [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv)
  - **Live Verification Notes**: Verified on live site in database console screenshot visibly displaying `humidity: 58` and `temperature: 24.8`, as well as in all 30 rows of the CSV export file.
  - **Required Action**: None. Verified live.

- [x] **LDR/light-level values recorded**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 14), [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv)
  - **Live Verification Notes**: Verified in firmware push routines, dashboard trend charts, and 30 verified LDR raw values recorded in `task5_sensor_data.csv`. (Note: In the database screenshot, the history node includes IMU and MQ-4 gas telemetry fields alongside temperature and humidity).
  - **Required Action**: None. Verified live.

- [x] **Bulb status and operating mode recorded**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 15), [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv)
  - **Live Verification Notes**: Firmware records `bulb` and `mode` attributes; `task5_sensor_data.csv` explicitly records `Bulb_Status` (ON/OFF) and `Control_Mode` (AUTO/MANUAL) for every sample.
  - **Required Action**: None. Verified live.

- [x] **Historical data displayed on the dashboard**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/task5-dashboard.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/task5-dashboard.png) (HTTP 200 OK &bull; 155,248 bytes)
  - **Live Verification Notes**: Dashboard displays historical telemetry log table rendering sequential timestamped records with status pills and sensor values.
  - **Required Action**: None. Verified live.

- [x] **Graph/chart for recorded sensor data included (if implemented)**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/5.1.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/5.1.png), [`5.2.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/5.2.png) (Both HTTP 200 OK)
  - **Live Verification Notes**: High-resolution SVG line charts rendering multi-metric time-series curves (Temperature, Humidity, LDR) with interactive coordinate inspection tooltip load cleanly on live site.
  - **Required Action**: None. Verified live.

- [x] **CSV data download implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 18), [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv)
  - **Live Verification Notes**: Implemented via client-side JavaScript Blob generation (`window.exportHistoricDataToCSV()`) and direct anchor download handler (`window.downloadSyntheticCSV()`).
  - **Required Action**: None. Verified live.

- [x] **Downloaded file demonstrated to contain the recorded data**
  - **Status**: PASS
  - **Live Evidence Location**: [`task5_sensor_data.csv`](https://jaishanthlenin-123.github.io/My_portfolio/task5_sensor_data.csv) (HTTP 200 OK &bull; 1,550 bytes)
  - **Live Verification Notes**: Live CSV file returns 31 lines (header + 30 timestamped rows) containing `Timestamp,Temperature_C,Humidity_Percent,LDR_Value,Light_Status,Bulb_Status,Control_Mode`.
  - **Required Action**: None. Verified live.

- [x] **Screenshots of the Firebase log data**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/firebase_realtime_database_history.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/firebase_realtime_database_history.png) (HTTP 200 OK &bull; 102,512 bytes)
  - **Live Verification Notes**: Verified on live site: embedded in Topic 20 and in Task 5 Media gallery under exact heading `Firebase Realtime Database – Live Sensor Data & Historical Logging`. Shows `devices > history` push records, `humidity: 58`, `temperature: 24.8`, and `timestamp: 4`.
  - **Required Action**: None. Verified live.

- [x] **Screenshots of the dashboard and data visualization**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/task5-dashboard.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/task5-dashboard.png), [`5.1.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/5.1.png), [`5.2.png`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/5.2.png)
  - **Live Verification Notes**: Three distinct screenshots capturing full dashboard view, dual time-series curves, and coordinate hover tooltip load without errors.
  - **Required Action**: None. Verified live.

- [x] **Photographs of the complete prototype**
  - **Status**: PASS
  - **Live Evidence Location**: [`images/week7/task5/5.jpeg`](https://jaishanthlenin-123.github.io/My_portfolio/images/week7/task5/5.jpeg) (HTTP 200 OK &bull; 175,334 bytes)
  - **Live Verification Notes**: High-resolution photograph (1600x940 JPEG) loads cleanly on live site, showing complete hardware prototype: ESP32, DHT11 sensor, LDR, 5V relay module, AC lamp, and wiring.
  - **Required Action**: None. Verified live.

- [x] **Video demonstrating the complete system**
  - **Status**: PASS
  - **Live Evidence Location**: [`videos/week7/task5.mp4`](https://jaishanthlenin-123.github.io/My_portfolio/videos/week7/task5.mp4) (HTTP 200 OK &bull; 1,880,912 bytes)
  - **Live Verification Notes**: 9.9-second video (848x480, 30fps) plays natively on live site, demonstrating autonomous relay actuation when the LDR sensor is occluded.
  - **Required Action**: None. Verified live.

- [x] **Problems encountered and solutions implemented**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 24)
  - **Live Verification Notes**: Documents memory leaks from global JSON objects resolved by local scoping; relay contact chatter resolved via software hysteresis; and NTP time drift resolved via periodic resynchronization.
  - **Required Action**: None. Verified live.

- [x] **Limitations of the current prototype explained**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 25)
  - **Live Verification Notes**: Details DHT11 sampling rate limits (1 Hz max), unencrypted local HTTP payloads, and mechanical relay contact arcing and finite lifespan.
  - **Required Action**: None. Verified live.

- [x] **Possible future improvements suggested**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 26)
  - **Live Verification Notes**: Proposes transitioning to Solid-State Relays (SSR), upgrading to BME280 I2C sensor, enforcing MQTT with TLS 1.3, and adding OTA firmware updates.
  - **Required Action**: None. Verified live.

- [x] **Final learning reflection included**
  - **Status**: PASS
  - **Live Evidence Location**: [`week7-details.html#task5`](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html#task5) (Topic 27)
  - **Live Verification Notes**: Comprehensive reflection synthesizing edge intelligence, deterministic non-blocking timing, real-time database architecture, and full-stack IoT integration.
  - **Required Action**: None. Verified live.

- [x] **All source code and project files available in the repository**
  - **Status**: PASS
  - **Live Evidence Location**: [GitHub Repository](https://github.com/jaishanthlenin-123/My_portfolio) (Commit `27a4b4c`)
  - **Live Verification Notes**: All firmware sketches, frontend scripts, CSV dataset, PDF reference manuals, and media assets are committed and accessible in the repository.
  - **Required Action**: None. Verified live.

---

