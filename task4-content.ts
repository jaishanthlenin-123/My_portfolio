/**
 * Week 7 IoT, Connectivity & RTOS — Tasks 4 & 5 Source Content
 * Author: Jaishanth Lenin
 * Description: Complete Firebase Realtime Database firmware, Edge Automation,
 * FreeRTOS multitasking, and CSV telemetry analytics module.
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
  hardware: ["ESP32 Dual-Core SoC", "DHT11 Sensor (GPIO 4)", "LDR Light Sensor (GPIO 34)", "5V Relay Module (GPIO 18)", "Diagnostic LED (GPIO 2)"],
  protocols: ["FreeRTOS Preemptive Scheduling", "Firebase RTDB Push Queue", "Client-Side Blob CSV Generation"],
  configuration: {
    ldrDarkThreshold: 1200,
    historicalLogsNode: "/logs",
    csvExportFilename: "task5_sensor_data.csv",
    sampleIntervalMs: 2000,
    syntheticRecordsCount: 30,
  },
  firmwareSource: `
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define DHTPIN 4
#define LDRPIN 34
#define RELAYPIN 18
#define LDR_DARK_THRESHOLD 1200

DHT dht(DHTPIN, DHT11);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// FreeRTOS Task Handles
TaskHandle_t TaskTelemetryHandle;
TaskHandle_t TaskAutomationHandle;

volatile float globalTemp = 0.0;
volatile float globalHum = 0.0;
volatile int globalLdr = 0;
volatile bool autoMode = true;
volatile bool bulbStatus = false;

// Core 0: Read Sensors & Edge Automation
void vAutomationTask(void* pvParameters) {
  for (;;) {
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    int l = analogRead(LDRPIN);

    if (!isnan(t) && !isnan(h)) {
      globalTemp = t;
      globalHum = h;
      globalLdr = l;

      // Autonomous threshold logic
      if (autoMode) {
        if (l < LDR_DARK_THRESHOLD && !bulbStatus) {
          bulbStatus = true;
          digitalWrite(RELAYPIN, HIGH);
        } else if (l >= LDR_DARK_THRESHOLD && bulbStatus) {
          bulbStatus = false;
          digitalWrite(RELAYPIN, LOW);
        }
      }
    }
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}

// Core 1: Push Historical Telemetry to Firebase
void vCloudSyncTask(void* pvParameters) {
  for (;;) {
    if (Firebase.ready()) {
      FirebaseJson json;
      json.set("temperature", globalTemp);
      json.set("humidity", globalHum);
      json.set("ldr", globalLdr);
      json.set("lightStatus", globalLdr >= LDR_DARK_THRESHOLD ? "BRIGHT" : "DARK");
      json.set("bulbStatus", bulbStatus ? "ON" : "OFF");
      json.set("mode", autoMode ? "AUTO" : "MANUAL");
      json.set("timestamp", (int)time(nullptr));

      // Append historical record
      Firebase.RTDB.pushJSON(&fbdo, "/logs", &json);
    }
    vTaskDelay(pdMS_TO_TICKS(5000));
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAYPIN, OUTPUT);
  dht.begin();

  WiFi.begin("LAB_WIFI", "SECURE_PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  xTaskCreatePinnedToCore(vAutomationTask, "AutomationTask", 4096, NULL, 2, &TaskTelemetryHandle, 0);
  xTaskCreatePinnedToCore(vCloudSyncTask, "CloudSyncTask", 8192, NULL, 1, &TaskAutomationHandle, 1);
}

void loop() {
  vTaskDelete(NULL); // Free loop task since FreeRTOS manages execution
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
