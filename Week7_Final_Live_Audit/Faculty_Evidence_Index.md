# ProtoSem Week 7: Comprehensive Evidence Index & Asset Mapping

**Submission Title:** ProtoSem Sprint Week 7 — Embedded Systems, IoT Connectivity & Cloud Telemetry
**Student Name:** Jaishanth Lenin
**Repository:** [https://github.com/jaishanthlenin-123/My_portfolio](https://github.com/jaishanthlenin-123/My_portfolio)
**Main Documentation Page:** [week7-details.html](file:///e:/portfolio/week7-details.html)

This index maps every physical, digital, cloud, and architectural asset in the repository to its corresponding faculty checklist requirement across all five tasks.

---

## 1. Standalone Task GitHub Repositories

| Repository Name | Target Task | Primary Technologies | Checklist Criteria Addressed |
| :--- | :---: | :--- | :--- |
| [ProtoSem-Week7-Task1-ESP32-WebServer](https://github.com/jaishanthlenin-123/ProtoSem-Week7-Task1-ESP32-WebServer) | Task 1 | C++, WebServer.h, HTML5/CSS3 | Task 1: Criteria 7, 8, 15 |
| [ProtoSem-Week7-Task2-AdafruitIO-MQTT](https://github.com/jaishanthlenin-123/ProtoSem-Week7-Task2-AdafruitIO-MQTT) | Task 2 | C++, Adafruit MQTT, TLS (8883) | Task 2: Criteria 10, 11, 19 |
| [ProtoSem-Week7-Task3-IFTTT-Automation](https://github.com/jaishanthlenin-123/ProtoSem-Week7-Task3-IFTTT-Automation) | Task 3 | C++, Adafruit MQTT, IFTTT Webhooks | Task 3: Criteria 12, 18, 20 |
| [ProtoSem-Week7-Task4-Firebase-IoT](https://github.com/jaishanthlenin-123/ProtoSem-Week7-Task4-Firebase-IoT) | Task 4 | C++, Firebase RTDB, JS Modular v10 | Task 4: Criteria 10, 14, 20 |
| [ProtoSem-Week7-Task5-Firebase-Logging-Automation](https://github.com/jaishanthlenin-123/ProtoSem-Week7-Task5-Firebase-Logging-Automation) | Task 5 | C++, Bare-metal non-RTOS, NTP, CSV | Task 5: Criteria 10, 18, 28 |

---

## 2. Technical Diagrams, Schematics & Flowcharts (12 Total)

| Diagram Identifier | Location in Documentation | Format | Description / Function | Addressed Criteria |
| :--- | :--- | :---: | :--- | :--- |
| **T1-Diag-1** | [week7-details.html#task1](file:///e:/portfolio/week7-details.html#task1) (Sec 3) | Vector SVG | Communication Pipeline: Client GET `/on` -> ESP32 -> GPIO 2 Actuation | Task 1: Criterion 3 |
| **T1-Diag-2** | [week7-details.html#task1](file:///e:/portfolio/week7-details.html#task1) (Sec 5) | Vector SVG | Hardware Schematic: ESP32 DevKit, 330Ω resistor, 5mm Red LED, GND | Task 1: Criterion 5, 6 |
| **T2-Diag-1** | [week7-details.html#task2](file:///e:/portfolio/week7-details.html#task2) (Sec 3) | Vector SVG | System Architecture: ESP32 MQTT Client -> TLS Broker -> Adafruit IO Feed | Task 2: Criterion 3, 8 |
| **T2-Diag-2** | [week7-details.html#task2](file:///e:/portfolio/week7-details.html#task2) (Sec 5) | Vector SVG | Hardware Schematic: ESP32 GPIO 5 to 5V Optocoupler Relay & AC Bulb | Task 2: Criterion 5 |
| **T3-Diag-1** | [week7-details.html#task3](file:///e:/portfolio/week7-details.html#task3) (Sec 3) | Vector SVG | Automation Pipeline: Voice/Threshold -> IFTTT Webhook -> Adafruit Feed | Task 3: Criterion 4, 10, 11 |
| **T3-Diag-2** | [images/week7/task3/ifttt_applet_configuration_mockup.png](file:///e:/portfolio/images/week7/task3/ifttt_applet_configuration_mockup.png) | Raster PNG | Architecture Workflow Diagram: Google Assistant to Adafruit IO Feed | Task 3: Criterion 11 |
| **T4-Diag-1** | [week7-details.html#task4](file:///e:/portfolio/week7-details.html#task4) (Sec 2) | Vector SVG | Cloud Architecture: ESP32 REST/WebSocket -> Firebase RTDB -> Client | Task 4: Criterion 6, 13 |
| **T4-Diag-2** | [images/week7/task4/firebase_sensors_control_database_mockup.png](file:///e:/portfolio/images/week7/task4/firebase_sensors_control_database_mockup.png) | Raster PNG | NoSQL Database Schema: `/sensors` (temp/humidity/ldr) & `/control` (bulb) | Task 4: Criterion 12, 16 |
| **T4-Diag-3** | [week7-details.html#task4](file:///e:/portfolio/week7-details.html#task4) (Sec 5) | Vector SVG | Multi-Sensor Hardware Schematic: DHT11 (GPIO 4), LDR (GPIO 34), Relay | Task 4: Criterion 12 |
| **T5-Diag-1** | [week7-details.html#task5](file:///e:/portfolio/week7-details.html#task5) (Sec 2) | Vector SVG | Full System Pipeline: ESP32 Edge Core -> RTDB Streaming -> Web UI | Task 5: Criterion 2 |
| **T5-Diag-2** | [week7-details.html#task5](file:///e:/portfolio/week7-details.html#task5) (Sec 3) | Vector SVG | Algorithm Flowchart: Non-blocking Hysteresis Loop (1800/2200 thresholds) | Task 5: Criterion 8 |
| **T5-Diag-3** | [week7-details.html#task5](file:///e:/portfolio/week7-details.html#task5) (Sec 5) | Vector SVG | Complete Multi-Sensor Wiring Schematic: ESP32, DHT11, LDR, Relay | Task 5: Criterion 2 |

---

## 3. Genuine Project Screenshots & Interface Evidence

| Asset Path | Resolution | Description & Provenance | Addressed Criteria |
| :--- | :---: | :--- | :--- |
| [images/week7/task1/task1_webpage_led_off.png](file:///e:/portfolio/images/week7/task1/task1_webpage_led_off.png) | 1280 × 800 | ESP32 Web Server Interface — OFF State (Browser simulation of firmware HTML) | Task 1: Criterion 8, 11 |
| [images/week7/task1/task1_webpage_led_on.png](file:///e:/portfolio/images/week7/task1/task1_webpage_led_on.png) | 1280 × 800 | ESP32 Web Server Interface — ON State (Browser simulation of firmware HTML) | Task 1: Criterion 8, 11 |
| [images/week7/task2/adafruit_io_dashboards_list.png](file:///e:/portfolio/images/week7/task2/adafruit_io_dashboards_list.png) | 1917 × 1008 | Genuine Adafruit IO console showing dashboard directory and metadata | Task 2: Criterion 6, 7 |
| [images/week7/task2/adafruit_io_dashboard_off.png](file:///e:/portfolio/images/week7/task2/adafruit_io_dashboard_off.png) | 1917 × 1008 | Genuine Adafruit IO dashboard showing toggle switch in OFF state | Task 2: Criterion 13, 14 |
| [images/week7/task2/adafruit_io_dashboard_on.png](file:///e:/portfolio/images/week7/task2/adafruit_io_dashboard_on.png) | 1917 × 1008 | Genuine Adafruit IO dashboard showing toggle switch in ON state | Task 2: Criterion 13, 14 |
| [images/week7/task3/ifttt_applets_overview.jpg](file:///e:/portfolio/images/week7/task3/ifttt_applets_overview.jpg) | 1917 × 1008 | Genuine IFTTT "My Applets" console showing configured Google Assistant applets | Task 3: Criterion 7, 13 |
| [images/week7/task3/ifttt_applet_configuration.png](file:///e:/portfolio/images/week7/task3/ifttt_applet_configuration.png) | 1917 × 1030 | Genuine IFTTT Applet editor showing trigger field and action service parameters | Task 3: Criterion 7, 13 |
| [images/week7/task3/ifttt_applet_turn_on.png](file:///e:/portfolio/images/week7/task3/ifttt_applet_turn_on.png) | 1917 × 1031 | Genuine IFTTT Applet details: Google Assistant "Turn on bulb" -> Adafruit IO | Task 3: Criterion 8, 9, 13 |
| [images/week7/task3/ifttt_applet_turn_off.png](file:///e:/portfolio/images/week7/task3/ifttt_applet_turn_off.png) | 1917 × 1022 | Genuine IFTTT Applet details: Google Assistant "Turn off bulb" -> Adafruit IO | Task 3: Criterion 8, 9, 13 |
| [images/week7/task3/dashboard.jpg](file:///e:/portfolio/images/week7/task3/dashboard.jpg) | 1376 × 768 | Genuine Adafruit IO Feed and Trigger configuration interface | Task 3: Criterion 14 |
| [images/week7/task4/4 (1).jpeg](file:///e:/portfolio/images/week7/task4/4%20(1).jpeg) | 1600 × 766 | Client-Side Authentication Interface (Smart Environment Monitor sign-in) | Task 4: Criterion 15 |
| [images/week7/task4/4 (2).jpeg](file:///e:/portfolio/images/week7/task4/4%20(2).jpeg) | 1600 × 766 | Real-Time Telemetry & Gauges (Temperature, Humidity, LDR illumination) | Task 4: Criterion 17 |
| [images/week7/task4/4 (3).jpeg](file:///e:/portfolio/images/week7/task4/4%20(3).jpeg) | 1600 × 766 | Interactive Actuator Latching Interface (Bulb control button) | Task 4: Criterion 17 |
| [images/week7/task4/4 (4).jpeg](file:///e:/portfolio/images/week7/task4/4%20(4).jpeg) | 1600 × 766 | Reactive State Synchronization across multiple client viewports | Task 4: Criterion 17 |
| [images/week7/task4/firebase_authentication_users.png](file:///e:/portfolio/images/week7/task4/firebase_authentication_users.png) | 1917 × 1025 | Firebase Authentication Console showing registered user accounts | Task 4: Criterion 11 |
| [images/week7/task4/firebase_database.png](file:///e:/portfolio/images/week7/task4/firebase_database.png) | 1917 × 1025 | Firebase Realtime Database Console (Project `apppp`) showing `/current` node | Task 4: Criterion 16 |
| [images/week7/task5/firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png) | 1917 × 1025 | Firebase Console showing chronological push key logs under `/history` | Task 5: Criterion 11, 20 |
| [images/week7/task5/task5_web_dashboard.png](file:///e:/portfolio/images/week7/task5/task5_web_dashboard.png) | 1917 × 865 | Genuine Supervisory Web Dashboard with sensor gauges, status, and CSV table | Task 5: Criterion 16, 17, 21 |

---

## 4. Hardware Setup Photographs

| Asset Path | Resolution | Description | Addressed Criteria |
| :--- | :---: | :--- | :--- |
| [images/week7/task1/1.jpeg](file:///e:/portfolio/images/week7/task1/1.jpeg) | 1280 × 960 | ESP32 Web Server Bench Assembly (ESP32 DevKit, resistor, LED on breadboard) | Task 1: Criterion 10 |
| [images/week7/task2/2.jpeg](file:///e:/portfolio/images/week7/task2/2.jpeg) | 1280 × 960 | ESP32 MQTT Client Bench Assembly (ESP32 connected to 5V optocoupler relay) | Task 2: Criterion 12 |
| [images/week7/task3/3.jpeg](file:///e:/portfolio/images/week7/task3/3.jpeg) | 1280 × 960 | ESP32 IFTTT Prototype Assembly (Relay module with AC test load on bench) | Task 3: Criterion 15 |
| [images/week7/task4/4.jpeg](file:///e:/portfolio/images/week7/task4/4.jpeg) | 1280 × 960 | Multi-Sensor Breadboard Assembly (ESP32, DHT11 sensor, LDR divider, relay) | Task 4: Criterion 10 |
| [images/week7/task5/5.jpeg](file:///e:/portfolio/images/week7/task5/5.jpeg) | 1280 × 960 | Final Integrated Prototype Assembly (Full system sensor array and relay) | Task 5: Criterion 22 |

---

## 5. Demonstration Videos (5 Total)

| Asset Path | Duration | File Size | Demonstration Content | Addressed Criteria |
| :--- | :---: | :---: | :--- | :--- |
| [videos/week7/task1.mp4](file:///e:/portfolio/videos/week7/task1.mp4) | 15.3s | 2.9 MB | Webpage interface toggle actuation (student notes lack of physical hardware execution) | Task 1: Criterion 12 (PARTIAL) |
| [videos/week7/task2.mp4](file:///e:/portfolio/videos/week7/task2.mp4) | 18.0s | 1.8 MB | Adafruit IO cloud dashboard toggle triggering physical relay module switching | Task 2: Criterion 14, 15 |
| [videos/week7/task3.mp4](file:///e:/portfolio/videos/week7/task3.mp4) | 22.5s | 2.3 MB | Complete end-to-end automation: IFTTT trigger -> Adafruit feed -> Relay actuation | Task 3: Criterion 16, 17 |
| [videos/week7/task4.1.mp4](file:///e:/portfolio/videos/week7/task4.1.mp4) | 20.0s | 2.0 MB | Full-Stack Firebase IoT: Web authentication login, telemetry stream, toggle actuation | Task 4: Criterion 18 |
| [videos/week7/task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4) | 19.5s | 1.9 MB | Closed-loop ambient automation: LDR threshold transition, relay switching, live sync | Task 5: Criterion 23 |

---

## 6. Datasets & Downloadable Project Reference Documents

| Asset Path | Format | Size | Description | Addressed Criteria |
| :--- | :---: | :---: | :--- | :--- |
| [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) | CSV | 2.8 KB | 30 chronological sensor records: Timestamp, Temperature, Humidity, LDR, Bulb, Mode | Task 5: Criterion 12, 18, 19 |
| [docs/task5-sensor-data-reference.pdf](file:///e:/portfolio/docs/task5-sensor-data-reference.pdf) | PDF | 148 KB | Project Reference: Telemetry schema, sensor calibration analysis, and statistical range | Task 5: Criterion 9, 19 |
| [docs/firebase-realtime-database-reference.pdf](file:///e:/portfolio/docs/firebase-realtime-database-reference.pdf) | PDF | 162 KB | Project Reference: Firebase JSON tree structure, security rules, and CSV parser design | Task 4: Criterion 12, Task 5: 11 |

---

## 7. Live Hosted Cloud Applications

| Web Application | Hosting Provider | Cloud Infrastructure | Verified Features | Addressed Criteria |
| :--- | :--- | :--- | :--- | :--- |
| [https://apppp-f359e.web.app](https://apppp-f359e.web.app) | Firebase Hosting | Google Cloud / asia-southeast1 | Sign-in interface, Email/Password auth, Google Auth, Realtime Database listener | Task 4: Criteria 10, 15, Task 5: 16 |
| [https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html](https://jaishanthlenin-123.github.io/My_portfolio/week7-details.html) | GitHub Pages | GitHub Infrastructure | Complete 5-task documentation, interactive lightbox galleries, video streaming | All Tasks |
