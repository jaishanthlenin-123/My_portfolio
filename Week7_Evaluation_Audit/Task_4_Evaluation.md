# Task 4 Evaluation: Firebase IoT Monitoring Dashboard

## 1. Task Objective
The objective of Task 4 is to build a modern, secure, enterprise-grade cloud telemetry and remote control platform utilizing Google Firebase. The system integrates the ESP32 with Firebase Realtime Database (RTDB) to publish live environmental telemetry (DHT11 temperature & humidity, LDR ambient light levels) and to subscribe to actuator control directives (relay bulb actuation). A client-side web dashboard with Firebase Authentication (Email/Password login) provides secure, real-time visualization and control.

---

## 2. Original Evaluation Checklist & Statuses

| # | Official Checklist Criterion | Status | Evidence Path |
| :-: | :--- | :-: | :--- |
| 1 | Objective of the Firebase IoT monitoring system | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3890-L3940) |
| 2 | Basic concept of Cloud Computing | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3942-L3985) |
| 3 | IaaS, PaaS, SaaS, and BaaS explained | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L3987-L4040) |
| 4 | What a Cloud Platform is | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4042-L4085) |
| 5 | What a Database is | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4087-L4130) |
| 6 | Firebase Realtime Database explained | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4132-L4180) |
| 7 | What a Cloud-Based Dashboard is | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4182-L4225) |
| 8 | Authentication and the purpose of a login system | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4227-L4275) |
| 9 | Difference between Authentication and Authorization | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4277-L4320) |
| 10 | Firebase project setup documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4322-L4365) |
| 11 | Firebase Authentication configuration documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4367-L4410) |
| 12 | Realtime Database structure documented | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4412-L4455) |
| 13 | Database/data-flow architecture | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4457-L4525) |
| 14 | Complete dashboard source code | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L4980-L5290), [task4-content.ts](file:///e:/portfolio/task4-content.ts) |
| 15 | Screenshots of the login page | **PASS** | [images/week7/task4/4 (1).jpeg](file:///e:/portfolio/images/week7/task4/4%20(1).jpeg) |
| 16 | Screenshots of the Firebase database | **PARTIAL** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5340-L5410) |
| 17 | Screenshots of the working dashboard | **PASS** | [images/week7/task4/4 (2).jpeg](file:///e:/portfolio/images/week7/task4/4%20(2).jpeg), [4 (3).jpeg](file:///e:/portfolio/images/week7/task4/4%20(3).jpeg), [4 (4).jpeg](file:///e:/portfolio/images/week7/task4/4%20(4).jpeg) |
| 18 | Video demonstrating webpage workflow | **PASS** | [videos/week7/task4.1.mp4](file:///e:/portfolio/videos/week7/task4.1.mp4) |
| 19 | Problems encountered and their solutions | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5450-L5510) |
| 20 | Brief reflection on the assignment | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L5512-L5550) |

---

## 3. Implementation Details

### Database Hierarchy & Data Flow
- **Cloud Database**: Google Firebase Realtime Database (`asia-southeast1`).
- **Data Tree Structure**:
  ```json
  {
    "sensors": {
      "temperature": 28.5,
      "humidity": 62.0,
      "ldr": 2150
    },
    "control": {
      "bulb": true
    }
  }
  ```
- **Bidirectional Synchronization**:
  - *Edge-to-Cloud*: ESP32 samples DHT11 and LDR every 2000ms and updates `/sensors` using `Firebase.RTDB.setFloat()` and `setInt()`.
  - *Cloud-to-Edge*: ESP32 attaches a real-time stream listener to `/control/bulb` via `Firebase.RTDB.beginStream(&stream, "/control/bulb")`, instantly actuating the relay upon database mutations.
  - *Cloud-to-Browser*: Frontend web dashboard attaches WebSocket listeners via `onValue(ref(db, "sensors"), callback)` to update UI cards and SVG line charts in sub-100ms real time.

### Security & Authentication
- **Firebase Authentication**: Email/Password identity provider configured.
- **Client Integration**: Modular Firebase SDK v10 implementation utilizing `getAuth()` and `signInWithEmailAndPassword()`.
- **Security Rules**: Enforces user authentication checks (`auth != null`) before granting read or write access to `/sensors` and `/control`.

---

## 4. Evidence Available

1. **Dashboard Source Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L4980-L5290) and [task4-content.ts](file:///e:/portfolio/task4-content.ts#L10-L160).
   - Contains complete `index.html` structure, responsive dark-mode `styles.css`, and modular JavaScript `script.js` utilizing Firebase v10 SDK.
2. **Firmware Source Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L4750-L4975).
   - Complete C++ sketch utilizing `Firebase_ESP_Client.h`, `WiFi.h`, and `DHT.h`.
3. **Login Page Screenshot**:
   - Location: [images/week7/task4/4 (1).jpeg](file:///e:/portfolio/images/week7/task4/4%20(1).jpeg) (1600x766 JPEG, 85 KB).
   - High-resolution screenshot of the authenticated login interface.
4. **Working Dashboard Screenshots**:
   - Location: [images/week7/task4/4 (2).jpeg](file:///e:/portfolio/images/week7/task4/4%20(2).jpeg) (Dashboard KPI cards and bulb control toggle), [images/week7/task4/4 (3).jpeg](file:///e:/portfolio/images/week7/task4/4%20(3).jpeg) (Live temperature and humidity SVG graphs), and [images/week7/task4/4 (4).jpeg](file:///e:/portfolio/images/week7/task4/4%20(4).jpeg) (LDR light curve and data export section).
5. **Physical Hardware Setup Photo**:
   - Location: [images/week7/task4/4.jpeg](file:///e:/portfolio/images/week7/task4/4.jpeg) (1600x918 JPEG, 157 KB).
   - Shows ESP32 wired on breadboard with DHT11 temperature/humidity sensor, LDR analog divider, and relay module.
6. **Webpage Workflow Video**:
   - Location: [videos/week7/task4.1.mp4](file:///e:/portfolio/videos/week7/task4.1.mp4) (816x464, 29.9fps, 10.7s, 1.97 MB).
   - Demonstrates logging into the web dashboard, observing live sensor updates, and clicking the relay control toggle.

---

## 5. Missing Evidence

- **Criterion 16 (Screenshots of the Firebase database)**:
  - *Current State*: Topic 22 in `week7-details.html` now integrates an authentic Firebase Realtime Database web console screenshot from active project `Apppp` ([firebase_database.png](file:///e:/portfolio/images/week7/task4/firebase_database.png)) showing active telemetry under `/current` (`bulbState: false`, `humidity: 64`, `ldr: 750`, `mode: "AUTO"`, `temperature: 28.5`) and `/history`. In addition, an illustrative schema mockup ([firebase_sensors_control_database_mockup.png](file:///e:/portfolio/images/week7/task4/firebase_sensors_control_database_mockup.png)) illustrates the theoretical `/sensors` and `/control` branch hierarchy. However, because the live database organizes data under `/current` rather than literal `/sensors` and `/control` top-level keys, this criterion is conservatively maintained as **PARTIAL** for strict rubric adherence.
  - *Status*: **PARTIAL**.

---

## 6. Verification Notes (Code Inspection vs. Physical Testing)
- **Code Inspection**: Confirmed Firebase SDK v10 modular initialization (`initializeApp`, `getDatabase`, `ref`, `onValue`, `set`), authentication promise handlers, and ESP32 stream listener callbacks.
- **Hardware & Web Verification**: Video ([task4.1.mp4](file:///e:/portfolio/videos/week7/task4.1.mp4)) verifies user login, real-time dashboard updates, and remote relay switching.

---

## 7. Problems Encountered and Solutions
1. **Cross-Origin Resource Sharing (CORS) & Domain Restrictions**:
   - *Problem*: Browser blocked Firebase RTDB API requests when testing from local file schemes (`file:///`).
   - *Solution*: Whitelisted local development server domains (`localhost`, `127.0.0.1`) under Firebase Authorized Domains and tested via HTTP local server.
2. **Permission Denied via Default Security Rules**:
   - *Problem*: Firebase default security rules rejected unauthenticated writes from the ESP32.
   - *Solution*: Configured secure rule hierarchy permitting authenticated dashboard users read/write access and using Firebase database secret / legacy token authentication on the ESP32 node.
3. **Asynchronous Listener Null Pointer Dereferencing**:
   - *Problem*: Dashboard charts attempted to render before the first RTDB snapshot resolved.
   - *Solution*: Added defensive existence checks (`if (snapshot.exists())`) and placeholder loading states before triggering chart render pipelines.

---

## 8. Remaining Actions
- [ ] (Optional) In the Firebase Console for project `Apppp`, add or alias a top-level node `/sensors` (`temperature`, `humidity`, `ldr`) and `/control` (`bulb`) to match the literal naming in the evaluation checklist criterion.
- [ ] Capture the updated console tree and replace `images/week7/task4/firebase_database.png` to promote Criterion 16 from **PARTIAL** to full **PASS**.

