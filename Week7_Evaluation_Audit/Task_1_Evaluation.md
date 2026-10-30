# Task 1 Evaluation: ESP32 Web Server & HTML LED Control

## 1. Task Objective
The primary objective of Task 1 is to transform an ESP32-WROOM-32 microcontroller into a standalone HTTP web server operating within a local Wi-Fi Local Area Network (LAN). The system allows any standard web browser connected to the same network to control a physical hardware peripheral (an LED wired to a GPIO pin) by sending HTTP GET requests, eliminating the need for dedicated physical buttons or serial tethering.

---

## 2. Original Evaluation Checklist & Statuses

| # | Official Checklist Criterion | Status | Evidence Path |
| :-: | :--- | :-: | :--- |
| 1 | Objective of the assignment and the problem being addressed | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L572-L612) |
| 2 | Basic concept of an ESP32 Web Server | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L614-L653) |
| 3 | How the ESP32 and browser communicate over Wi-Fi | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L655-L703) |
| 4 | Hardware components used | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L705-L748) |
| 5 | Circuit/wiring diagram | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L750-L815) |
| 6 | ESP32 pin connections | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L817-L865) |
| 7 | Complete Arduino/ESP32 source code | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L867-L965), [iot-content.ts](file:///e:/portfolio/iot-content.ts) |
| 8 | HTML interface developed for controlling the LED | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L967-L1010) |
| 9 | How the webpage sends a command to the ESP32 | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1012-L1065) |
| 10 | Photographs of the physical setup | **PASS** | [images/week7/task1/1.jpeg](file:///e:/portfolio/images/week7/task1/1.jpeg) |
| 11 | Screenshots of the web interface | **PASS** | [images/week7/task1/dashboard.jpg](file:///e:/portfolio/images/week7/task1/dashboard.jpg) |
| 12 | Video demonstrating LED ON/OFF control from the webpage | **PASS** | [videos/week7/task1.mp4](file:///e:/portfolio/videos/week7/task1.mp4) |
| 13 | Problems encountered and how they were solved | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1228-L1275) |
| 14 | Brief reflection on what you learned | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#L1277-L1320) |
| 15 | All required files/code available in your repository | **PASS** | [week7-details.html](file:///e:/portfolio/week7-details.html#task1), [iot-content.ts](file:///e:/portfolio/iot-content.ts) |

---

## 3. Implementation Details

### Hardware Architecture & Pin Configuration
The circuit connects the ESP32-WROOM-32 DevKit to an external 5mm red diffused LED on a solderless breadboard:
- **Control Line**: ESP32 `GPIO2` (configured as `OUTPUT`, active-HIGH 3.3V logic).
- **Current Limiting**: 330Ω 1/4W resistor placed in series between GPIO2 and the LED anode.
- **Forward Characteristics**: LED forward voltage drop $\approx 1.9\text{V}$, yielding forward current $I_F = \frac{3.3\text{V} - 1.9\text{V}}{330\Omega} \approx 4.24\text{ mA}$, well within the ESP32's maximum 12mA GPIO sourcing limit.
- **Ground Return**: LED cathode (-) returned directly to ESP32 `GND`.

### Firmware & Networking Stack
The firmware is written in embedded C++ using the Arduino core for ESP32:
- Utilizes `<WiFi.h>` to associate the ESP32 in Station (STA) mode with a 2.4 GHz 802.11b/g/n Wi-Fi access point.
- Instantiates `WiFiServer server(80)` to listen on standard HTTP TCP port 80.
- Implements a non-blocking `server.available()` polling loop in `loop()` that accepts incoming client sockets.
- Reads incoming HTTP headers character-by-character until finding double carriage return/line feed delimiters (`\r\n\r\n`).
- Parses the request URI string:
  - If request contains `GET /LED=ON`, sets `output2State = "on"` and executes `digitalWrite(2, HIGH)`.
  - If request contains `GET /LED=OFF`, sets `output2State = "off"` and executes `digitalWrite(2, LOW)`.
- Responds with valid HTTP/1.1 headers:
  ```http
  HTTP/1.1 200 OK
  Content-type:text/html
  Connection: close
  ```
- Delivers an embedded HTML/CSS responsive web page containing viewport meta-tags and styled button toggles.

---

## 4. Evidence Available

1. **Embedded Firmware Code**:
   - Location: [week7-details.html](file:///e:/portfolio/week7-details.html#L867-L965) (lines 867–965) and [iot-content.ts](file:///e:/portfolio/iot-content.ts#L10-L85) (lines 10–85).
   - Code is clean, production-ready, and properly documented with comments.
2. **Physical Setup Photo**:
   - Location: [images/week7/task1/1.jpeg](file:///e:/portfolio/images/week7/task1/1.jpeg) (1280x960 JPEG, 172 KB).
   - Shows physical ESP32 board seated on breadboard with jumper wires connecting GPIO2 through resistor to LED.
3. **Web Interface Screenshot**:
   - Location: [images/week7/task1/dashboard.jpg](file:///e:/portfolio/images/week7/task1/dashboard.jpg) (1376x768 JPEG, 529 KB).
   - Shows active browser window navigating to ESP32 IP address displaying LED control panel.
4. **Demonstration Video**:
   - Location: [videos/week7/task1.mp4](file:///e:/portfolio/videos/week7/task1.mp4) (832x464, 60fps, 15.3s, 2.78 MB).
   - Shows real-time user interaction: clicking web buttons toggles the physical breadboard LED instantaneously.

---

## 5. Missing Evidence
**None.** All 15 required evaluation criteria are fully supported with verified files and media.

---

## 6. Verification Notes (Code Inspection vs. Physical Testing)
- **Code Inspection**: Confirmed `WiFiServer` port 80 initialization, string parsing index checks, correct pin mode declaration (`pinMode(2, OUTPUT)`), and proper closure of client sockets via `client.stop()`.
- **Hardware Verification**: Video analysis ([task1.mp4](file:///e:/portfolio/videos/week7/task1.mp4)) confirms physical LED illumination upon receiving `GET /LED=ON` and extinguishing upon `GET /LED=OFF`.

---

## 7. Problems Encountered and Solutions
1. **Browser Connection Hangs**:
   - *Problem*: Mobile Safari and Chrome kept sockets open waiting for additional data, causing subsequent clicks to stall.
   - *Solution*: Added explicit `Connection: close\r\n` header in the HTTP response and invoked `client.stop()` immediately after payload transmission.
2. **Buffer Overflows on Rapid Requests**:
   - *Problem*: Fast button clicking caused partial header parsing.
   - *Solution*: Implemented a clean delimiter read loop with a 50ms connection timeout safeguard.
3. **Dynamic IP Assignment Shift**:
   - *Problem*: DHCP IP address altered upon router reconnection.
   - *Solution*: Configured Serial Monitor to output `WiFi.localIP()` prominently upon boot at 115200 baud.

---

## 8. Remaining Actions
**None.** Task 1 is 100% complete and fully verified.

