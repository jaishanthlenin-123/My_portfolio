/**
 * Week 7 IoT, Connectivity & RTOS — Tasks 4 & 5 Source Content
 * Author: Jaishanth Lenin
 * Description: Complete Firebase Realtime Database firmware, Edge Automation,
 * non-blocking sensor acquisition, and CSV telemetry analytics module.
 */

export interface TelemetryRecord {
  timestamp: string;
  temperatureC: number;
  humidityPercent: number;
  ldrValue: number;
  lightStatus: "BRIGHT" | "DARK";
  bulbStatus: "ON" | "OFF";
  controlMode: "AUTO" | "MANUAL";
}

export interface TaskDefinition {
  id: string;
  title: string;
  category: string;
  hardware: string[];
  protocols: string[];
  firmwareSource: string;
  frontendSource?: string;
  configuration: Record<string, string | number | boolean>;
}

// ============================================================================
// TASK 4: Firebase IoT Monitoring Dashboard & Live Telemetry
// ============================================================================
export const task4Content: TaskDefinition = {
  id: "task4",
  title: "Firebase IoT Monitoring Dashboard",
  category: "Cloud NoSQL Streaming & Real-Time Sync",
  hardware: ["ESP32 Dev Module", "DHT11 Sensor (GPIO 4)", "LDR Light Sensor (GPIO 34)", "5V Single-Channel Relay (GPIO 18)", "Status LED (GPIO 2)"],
  protocols: ["HTTPS REST Streaming", "Server-Sent Events (SSE)", "TLS 1.2 Encrypted WebSockets"],
  configuration: {
    firebaseHost: "https://iot-smart-environment-default-rtdb.firebaseio.com/",
    authDomain: "iot-smart-environment.firebaseapp.com",
    telemetryNode: "/live_telemetry",
    controlNode: "/control",
    syncRateMs: 2000,
  },
  firmwareSource: `
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define WIFI_SSID "LAB_WIFI_NETWORK"
#define WIFI_PASSWORD "SECURE_WIFI_PASSWORD"
#define API_KEY "FIREBASE_API_KEY_SCRUBBED"
#define DATABASE_URL "https://iot-smart-environment-default-rtdb.firebaseio.com/"

#define DHTPIN 4
#define DHTTYPE DHT11
#define LDRPIN 34
#define RELAYPIN 18

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  pinMode(RELAYPIN, OUTPUT);
  pinMode(LDRPIN, INPUT);
  dht.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected! Local IP: " + WiFi.localIP().toString());

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.signUp(&config, &auth, "", "");
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready()) {
    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int ldr = analogRead(LDRPIN);

    if (!isnan(temp) && !isnan(hum)) {
      FirebaseJson json;
      json.set("temperature", temp);
      json.set("humidity", hum);
      json.set("ldr", ldr);
      json.set("timestamp", (int)time(nullptr));

      Firebase.RTDB.setJSON(&fbdo, "/live_telemetry", &json);
    }

    // Read remote control state
    if (Firebase.RTDB.getBool(&fbdo, "/control/bulbState")) {
      digitalWrite(RELAYPIN, fbdo.boolData() ? HIGH : LOW);
    }
  }
  delay(2000);
}
`,
};

// ============================================================================
// TASK 5: Firebase Logging, Edge Automation & CSV Data Export
// ============================================================================
export const task5Content: TaskDefinition = {
  id: "task5",
  title: "Firebase Logging, Automation & Data Export",
  category: "Autonomous Edge Computing & Analytical Export",
  hardware: ["ESP32 Development Board", "DHT11 Sensor (GPIO 4)", "LDR Light Sensor (GPIO 34)", "5V Relay Module (GPIO 5)", "Diagnostic LED (GPIO 2)"],
  protocols: ["Non-blocking millis() Timing", "Firebase RTDB Push Queue", "Client-Side Blob CSV Generation"],
  configuration: {
    ldrOnThreshold: 1800,
    ldrOffThreshold: 2200,
    historicalLogsNode: "/logs",
    csvExportFilename: "task5_sensor_data.csv",
    sampleIntervalMs: 2000,
    loggingIntervalMs: 60000,
    syntheticRecordsCount: 30,
  },
  firmwareSource: `
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include <WiFiUdp.h>
#include <NTPClient.h>

#define DHTPIN 4
#define LDRPIN 34
#define BULBPIN 5
#define LDR_ON_THRESHOLD 1800
#define LDR_OFF_THRESHOLD 2200

DHT dht(DHTPIN, DHT11);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000);

FirebaseData fbdo;
FirebaseData streamData;
FirebaseAuth auth;
FirebaseConfig config;

bool autoMode = true;
bool currentBulbState = false;

unsigned long lastSensorRead = 0;
unsigned long lastHistoryLog = 0;
const unsigned long SENSOR_INTERVAL = 2000;
const unsigned long LOG_INTERVAL = 60000;

void streamCallback(FirebaseStream data) {
  String path = data.dataPath();
  if (path == "/mode") {
    autoMode = data.stringData().equalsIgnoreCase("AUTO");
  } else if (path == "/bulb" && !autoMode) {
    currentBulbState = data.boolData();
    digitalWrite(BULBPIN, currentBulbState ? HIGH : LOW);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BULBPIN, OUTPUT);
  pinMode(LDRPIN, INPUT);
  dht.begin();

  WiFi.begin("LAB_WIFI", "SECURE_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  timeClient.begin();
  timeClient.update();

  config.api_key = "FIREBASE_API_KEY";
  config.database_url = "FIREBASE_DATABASE_URL";
  Firebase.begin(&config, &auth);

  Firebase.RTDB.beginStream(&streamData, "/control");
  Firebase.RTDB.setStreamCallback(&streamData, streamCallback, nullptr);
}

void loop() {
  timeClient.update();
  unsigned long now = millis();

  // 1. Periodic sensor read & edge decision logic (every 2s)
  if (now - lastSensorRead >= SENSOR_INTERVAL) {
    lastSensorRead = now;
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    int ldr = analogRead(LDRPIN);

    if (autoMode) {
      if (ldr < LDR_ON_THRESHOLD && !currentBulbState) {
        currentBulbState = true;
        digitalWrite(BULBPIN, HIGH);
        Firebase.RTDB.setBool(&fbdo, "/control/bulb", true);
      } else if (ldr > LDR_OFF_THRESHOLD && currentBulbState) {
        currentBulbState = false;
        digitalWrite(BULBPIN, LOW);
        Firebase.RTDB.setBool(&fbdo, "/control/bulb", false);
      }
      // Retain state between 1800 and 2200 to eliminate relay chatter
    }

    Firebase.RTDB.setFloat(&fbdo, "/sensors/temperature", t);
    Firebase.RTDB.setFloat(&fbdo, "/sensors/humidity", h);
    Firebase.RTDB.setInt(&fbdo, "/sensors/ldr", ldr);
  }

  // 2. Periodic historical log push (every 60s)
  if (now - lastHistoryLog >= LOG_INTERVAL) {
    lastHistoryLog = now;
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    int ldr = analogRead(LDRPIN);
    unsigned long epoch = timeClient.getEpochTime();

    FirebaseJson json;
    json.set("timestamp", epoch);
    json.set("temperature", t);
    json.set("humidity", h);
    json.set("ldr", ldr);
    json.set("bulb", currentBulbState);
    json.set("mode", autoMode ? "AUTO" : "MANUAL");

    Firebase.RTDB.pushJSON(&fbdo, "/logs", &json);
  }
}
`,
  frontendSource: `
// Task 5 Frontend CSV Analytics Module
export async function downloadTask5CSV(records: TelemetryRecord[]) {
  const header = "Timestamp,Temperature_C,Humidity_Percent,LDR_Value,Light_Status,Bulb_Status,Control_Mode\\r\\n";
  const rows = records.map(r => 
    [r.timestamp, r.temperatureC, r.humidityPercent, r.ldrValue, r.lightStatus, r.bulbStatus, r.controlMode].join(",")
  ).join("\\r\\n");

  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "task5_sensor_data.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
`,
};

// ============================================================================
// 30 SYNTHETIC SENSOR RECORDS DATASET
// ============================================================================
export const synthetic30Records: TelemetryRecord[] = [
  { timestamp: "2026-09-29 18:00:00", temperatureC: 29.8, humidityPercent: 51.2, ldrValue: 2450, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:02:00", temperatureC: 29.6, humidityPercent: 51.8, ldrValue: 2380, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:04:00", temperatureC: 29.4, humidityPercent: 52.5, ldrValue: 2210, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:06:00", temperatureC: 29.1, humidityPercent: 53.0, ldrValue: 1950, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:08:00", temperatureC: 28.9, humidityPercent: 54.2, ldrValue: 1720, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:10:00", temperatureC: 28.7, humidityPercent: 55.1, ldrValue: 1480, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:12:00", temperatureC: 28.5, humidityPercent: 56.0, ldrValue: 1290, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:14:00", temperatureC: 28.2, humidityPercent: 57.3, ldrValue: 1050, lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:16:00", temperatureC: 28.0, humidityPercent: 58.1, ldrValue: 920,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:18:00", temperatureC: 27.8, humidityPercent: 59.4, ldrValue: 840,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:20:00", temperatureC: 27.6, humidityPercent: 60.2, ldrValue: 790,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:22:00", temperatureC: 27.4, humidityPercent: 61.5, ldrValue: 750,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:24:00", temperatureC: 27.3, humidityPercent: 62.0, ldrValue: 720,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:26:00", temperatureC: 27.1, humidityPercent: 63.2, ldrValue: 690,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:28:00", temperatureC: 27.0, humidityPercent: 63.8, ldrValue: 670,  lightStatus: "DARK",   bulbStatus: "OFF", controlMode: "MANUAL" },
  { timestamp: "2026-09-29 18:30:00", temperatureC: 26.8, humidityPercent: 64.5, ldrValue: 660,  lightStatus: "DARK",   bulbStatus: "OFF", controlMode: "MANUAL" },
  { timestamp: "2026-09-29 18:32:00", temperatureC: 26.7, humidityPercent: 65.1, ldrValue: 650,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "MANUAL" },
  { timestamp: "2026-09-29 18:34:00", temperatureC: 26.5, humidityPercent: 66.0, ldrValue: 640,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "MANUAL" },
  { timestamp: "2026-09-29 18:36:00", temperatureC: 26.4, humidityPercent: 66.8, ldrValue: 630,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:38:00", temperatureC: 26.2, humidityPercent: 67.5, ldrValue: 620,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:40:00", temperatureC: 26.1, humidityPercent: 68.2, ldrValue: 610,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:42:00", temperatureC: 25.9, humidityPercent: 69.0, ldrValue: 600,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:44:00", temperatureC: 25.8, humidityPercent: 70.1, ldrValue: 590,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:46:00", temperatureC: 25.6, humidityPercent: 71.3, ldrValue: 580,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:48:00", temperatureC: 25.5, humidityPercent: 72.0, ldrValue: 2150, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:50:00", temperatureC: 25.4, humidityPercent: 72.8, ldrValue: 2300, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:52:00", temperatureC: 25.3, humidityPercent: 73.5, ldrValue: 2240, lightStatus: "BRIGHT", bulbStatus: "OFF", controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:54:00", temperatureC: 25.1, humidityPercent: 74.2, ldrValue: 780,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:56:00", temperatureC: 25.0, humidityPercent: 75.0, ldrValue: 620,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
  { timestamp: "2026-09-29 18:58:00", temperatureC: 24.8, humidityPercent: 75.6, ldrValue: 590,  lightStatus: "DARK",   bulbStatus: "ON",  controlMode: "AUTO" },
];

export const week7Tasks4to5 = [task4Content, task5Content];
export default week7Tasks4to5;
