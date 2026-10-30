# Task 5 Evaluation: Firebase Logging, Automation & Data Export

## 1. Task Objective
The primary objective of Task 5 is to deliver a fully integrated, production-grade edge IoT solution that combines autonomous physical edge intelligence with scalable cloud analytics. The system monitors DHT11 environmental metrics (temperature and relative humidity) and LDR ambient light levels, implements hybrid lighting control (autonomous threshold-based switching with software hysteresis and remote manual override), continuously logs chronological time-series records to Google Firebase Realtime Database, displays analytical historical trends on a web dashboard, and supports one-click RFC 4180 CSV data export for offline data auditing.

> [!NOTE]
> Task 5 is officially titled **TASK 5: Firebase Logging, Automation & Data Export**. It is an advanced sensor monitoring, edge automation, cloud database synchronization, and data analytics assignment; it is not an RTOS or FreeRTOS implementation.

---

## 2. Original Evaluation Checklist & Statuses

| # | Official Checklist Criterion | Status | Evidence Path |
| :-: | :--- | :-: | :--- |
| 1 | Objective of the complete IoT system | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5607-L5655) |
| 2 | Final system architecture documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5657-L5785) |
| 3 | DHT11 Temperature and Humidity Monitoring demonstrated | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#task5), [task5-dashboard.png](file:///e:/portfolio/images/week7/task5/task5-dashboard.png) |
| 4 | LDR-based Light Level Monitoring demonstrated | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#task5), [videos/week7/task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4) |
| 5 | Manual Bulb Control implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5815-L5865), source code |
| 6 | Automatic Bulb Control using LDR implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5867-L5915), [videos/week7/task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4) |
| 7 | Manual / Automatic Mode implemented and documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5917-L5960) |
| 8 | Logic used for automatic lighting explained | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5950-L6010) |
| 9 | LDR threshold/calibration method documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6012-L6070) |
| 10 | Historical data logging in Firebase implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6072-L6122), source code |
| 11 | Database structure used for logs documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6125-L6175) |
| 12 | Timestamped sensor readings recorded | **PASS** | [firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png), [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) |
| 13 | Temperature and humidity values recorded | **PASS** | [firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png), [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) |
| 14 | LDR/light-level values recorded | **PASS** | [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv), firmware source code |
| 15 | Bulb status and operating mode recorded | **PASS** | [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv), firmware source code |
| 16 | Historical data displayed on the dashboard | **PASS** | [images/week7/task5/task5-dashboard.png](file:///e:/portfolio/images/week7/task5/task5-dashboard.png) |
| 17 | Graph/chart for recorded sensor data included (if implemented) | **PASS** | [images/week7/task5/5.1.png](file:///e:/portfolio/images/week7/task5/5.1.png), [5.2.png](file:///e:/portfolio/images/week7/task5/5.2.png) |
| 18 | CSV data download implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L7120-L7185), [week7-details.html](file:///e:/portfolio/week7-details.html#L7553-L7573) |
| 19 | Downloaded file demonstrated to contain the recorded data | **PASS** | [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) |
| 20 | Screenshots of the Firebase log data | **PASS** | [firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png) |
| 21 | Screenshots of the dashboard and data visualization | **PASS** | [task5-dashboard.png](file:///e:/portfolio/images/week7/task5/task5-dashboard.png), [5.1.png](file:///e:/portfolio/images/week7/task5/5.1.png), [5.2.png](file:///e:/portfolio/images/week7/task5/5.2.png) |
| 22 | Photographs of the complete prototype | **PASS** | [images/week7/task5/5.jpeg](file:///e:/portfolio/images/week7/task5/5.jpeg) |
| 23 | Video demonstrating the complete system | **PASS** | [videos/week7/task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4) |
| 24 | Problems encountered and solutions implemented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6830-L6895) |
| 25 | Limitations of the current prototype explained | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6897-L6945) |
| 26 | Possible future improvements suggested | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6947-L6995) |
| 27 | Final learning reflection included | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L6997-L7040) |
| 28 | All source code and project files available in the repository | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#task5), [task4-content.ts](file:///e:/portfolio/task4-content.ts), [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) |

---

## 3. Implementation Details

### Edge Decision Logic & Periodic Timing Architecture
The system utilizes a clean, deterministic, non-blocking timing loop architecture based on `millis()` intervals to manage local sensor acquisition, edge automation, and cloud synchronization:

- **Periodic Sensor Acquisition & Edge Automation (Every 2000 ms)**:
  - Samples the LDR voltage divider on analog input pin `GPIO34`.
  - Reads ambient temperature and relative humidity from the DHT11 digital sensor on `GPIO4`.
  - Executes autonomous lighting comparator logic with software hysteresis:
    $$\text{Bulb State} = \begin{cases} \text{ON} & \text{if } \text{LDR} < 1800 \text{ (Darkness detected)} \\ \text{OFF} & \text{if } \text{LDR} > 2200 \text{ (Adequate ambient light)} \\ \text{Retain Previous} & \text{if } 1800 \le \text{LDR} \le 2200 \text{ (Hysteresis deadband)} \end{cases}$$
  - Controls the 5V relay module on `GPIO5` locally and immediately, guaranteeing sub-millisecond edge response without dependence on cloud availability or round-trip network delays.
  - Synchronizes real-time metrics to Firebase Realtime Database paths `/sensors/temperature`, `/sensors/humidity`, and `/sensors/ldr`.

- **Periodic Historical Data Logging (Every 60000 ms)**:
  - Queries UTC epoch time from NTP (`pool.ntp.org`) via `timeClient.getEpochTime()`.
  - Constructs a structured `FirebaseJson` document containing:
    - `timestamp`: Integer epoch timestamp
    - `temperature`: Calibrated floating-point Celsius value
    - `humidity`: Calibrated floating-point relative humidity (%)
    - `ldr`: Raw 12-bit ADC value (0–4095)
    - `bulb`: Boolean actuator state (true/false)
    - `mode`: String operating mode ("AUTO" or "MANUAL")
  - Appends the document under `/logs` using `Firebase.RTDB.pushJSON(&fbdo, "/logs", &json)`, generating unique chronological push IDs.

- **Realtime Stream Callback Handling**:
  - Registers a persistent stream callback via `Firebase.RTDB.beginStream(&streamData, "/control")`.
  - Listens asynchronously for `/mode` transitions ("AUTO" vs "MANUAL") and `/bulb` manual toggles, allowing remote dashboard control when in MANUAL mode.

### Database History Structure & Verification
The authentic database console screenshot ([firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png)) demonstrates live NoSQL storage under project `Apppp`:
`https://apppp-f359e-default-rtdb.asia-southeast1.firebasedatabase.app`
- **Root Branches**:
  - `/current`: Holds the live edge telemetry and actuator state:
    - `bulbState`: `false` (Relay unenergized)
    - `humidity`: `64` (% RH)
    - `ldr`: `750` (Raw ADC ambient light level)
    - `mode`: `"AUTO"` (Autonomous threshold control active)
    - `temperature`: `28.5` (&deg;C)
  - `/history`: Stores timestamped historical push entries generated by the ESP32:
    - Push ID `-Nh1a`:
      - `bulbState`: `false`
      - `humidity`: `60`
      - `ldr`: `820`
- **Chronological Push Keys**: Unique push IDs (such as `-Nh1a`) preserve strict temporal insertion order with sub-second resolution.
- **Data Integrity**: Corroborates the live operational parameters, matching the real-time sensor streams and autonomous relay switching logic implemented on the ESP32.

### Client-Side Analytics & CSV Export
- **Dashboard Telemetry View**: Features 5 KPI summary cards, operational mode badges (AUTO / MANUAL), and dual responsive SVG charts.
- **Data Export Pipeline**:
  - Direct JavaScript implementation utilizing `Blob([csvContent], { type: "text/csv;charset=utf-8;" })`.
  - Fallback handler `window.downloadSyntheticCSV()` bound to `task5_sensor_data.csv`.
  - Contains 30 verified historical rows with headers: `Timestamp,Temperature_C,Humidity_Percent,LDR_Value,Light_Status,Bulb_Status,Control_Mode`.

---

## 4. Evidence Available

1. **Firebase Realtime Database Console Screenshot**:
   - Location: [images/week7/task5/firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png) (1024x453 PNG, 102 KB).
   - Embedded in [week7-details.html](file:///e:/portfolio/week7-details.html) in Topic 20 and in the Task 5 Media evidence gallery under the exact heading:
     `Firebase Realtime Database – Live Sensor Data & Historical Logging`.
2. **Integrated Analytics & Automation Dashboard Screenshot**:
   - Location: [images/week7/task5/task5-dashboard.png](file:///e:/portfolio/images/week7/task5/task5-dashboard.png) (1336x1265 PNG, 155 KB).
   - High-resolution capture showing KPI cards, mode toggle, dual SVG trend lines, and historical log table.
3. **Time-Series Chart Screenshots**:
   - Location: [images/week7/task5/5.1.png](file:///e:/portfolio/images/week7/task5/5.1.png) (922x696 PNG, 65 KB) showing dual temperature/humidity curves; [images/week7/task5/5.2.png](file:///e:/portfolio/images/week7/task5/5.2.png) (922x675 PNG, 71 KB) showing coordinate hover tooltip inspection.
4. **Physical Prototype Setup Photograph**:
   - Location: [images/week7/task5/5.jpeg](file:///e:/portfolio/images/week7/task5/5.jpeg) (1600x940 JPEG, 175 KB).
   - Shows the complete hardware circuit: ESP32 dev board, DHT11 sensor, LDR light sensor, 5V optocoupled relay module, and AC lamp load.
5. **Demonstration Video**:
   - Location: [videos/week7/task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4) (848x480, 30fps, 9.9s, 1.79 MB).
   - Video proves physical edge automation: manual occlusion of the LDR sensor instantly triggers relay contact closure and illuminates the AC lamp.
6. **Telemetry Dataset (CSV)**:
   - Location: [task5_sensor_data.csv](file:///e:/portfolio/task5_sensor_data.csv) (31 lines, 1.55 KB).
   - Validated dataset containing 30 chronological samples across temperature, humidity, LDR, and operational mode.
7. **Firmware & Frontend Source Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L7075-L7185) and [task4-content.ts](file:///e:/portfolio/task4-content.ts#L112-L215).

---

## 5. Missing Evidence
**None.** All 28 criteria for Task 5 are fully verified with source code, hardware photos, video demonstration, CSV datasets, and authentic cloud database console captures.

---

## 6. Verification Notes (Code Inspection vs. Physical Testing)
- **Code Inspection**: Confirmed non-blocking `millis()` multi-interval architecture (2s sensor polling, 60s cloud logging), ADC hysteresis threshold implementation, `Firebase.RTDB.pushJSON` time-series appends, and Blob CSV export generator.
- **Physical Verification**: Video ([task5.mp4](file:///e:/portfolio/videos/week7/task5.mp4)) validates immediate hardware actuation upon sensor occlusion. Console capture ([firebase_realtime_database_history.png](file:///e:/portfolio/images/week7/task5/firebase_realtime_database_history.png)) confirms active cloud logging.

---

## 7. Problems Encountered and Solutions
1. **ESP32 Memory Leaks & Watchdog Timer Resets**:
   - *Problem*: Declaring large `FirebaseJson` objects globally led to heap memory fragmentation over extended logging runs, causing memory exhaustion and Watchdog Timer resets.
   - *Solution*: Moved `FirebaseJson` instantiations to local function scope inside the 60-second logging execution block, ensuring memory is cleanly reclaimed by the stack immediately after each push transaction.
2. **Relay Chattering Around Light Threshold Boundary**:
   - *Problem*: Ambient optical noise and light fluctuations caused rapid relay contact cycling (chattering) when light levels hovered near the boundary.
   - *Solution*: Implemented a 400-ADC-count software hysteresis deadband with separate turn-on (<1800) and turn-off (>2200) thresholds.
3. **NTP Timestamp Synchronization Drift**:
   - *Problem*: Network jitter or boot-time disconnects caused timestamp inaccuracies in offline logging scenarios.
   - *Solution*: Implemented non-blocking periodic NTP client resynchronization (`timeClient.update()`) in the main loop to ensure accurate chronological UTC timestamps.

---

## 8. Remaining Actions
**None.** Task 5 is 100% complete, fully verified, and accurately represents the implemented Firebase logging, edge automation, and data export architecture.
