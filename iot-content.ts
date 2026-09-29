/**
 * Week 7 IoT, Connectivity & RTOS — Tasks 1 to 3 Source Content
 * Author: Jaishanth Lenin
 * Description: Complete firmware, web server, MQTT, and automation source
 * modules covering Tasks 1, 2, and 3.
 */

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
// TASK 1: ESP32 Web Server & HTML LED Control
// ============================================================================
export const task1Content: TaskDefinition = {
  id: "task1",
  title: "ESP32 Web Server & HTML LED Control",
  category: "Local Network Embedded Web Server",
  hardware: ["ESP32 Dev Module (30-pin)", "LED Indicator (Red)", "220 Ohm Resistor", "Micro-USB Cable", "Breadboard"],
  protocols: ["HTTP/1.1", "TCP/IP", "Wi-Fi 802.11 b/g/n (Station Mode)"],
  configuration: {
    ssid: "LAB_WIFI_NETWORK",
    ledPin: 2,
    httpPort: 80,
    baudRate: 115200,
  },
  firmwareSource: `
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "LAB_WIFI_NETWORK";
const char* password = "SECURE_WIFI_PASSWORD";

WebServer server(80);
const int LED_PIN = 2;
bool ledState = false;

String generateHTML() {
  String html = "<!DOCTYPE html><html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 Web Server</title><style>";
  html += "body { font-family: -apple-system, sans-serif; background: #0b0f19; color: #fff; text-align: center; padding-top: 50px; }";
  html += ".card { background: #131b2e; border: 1px solid #1e293b; max-width: 400px; margin: 0 auto; padding: 30px; border-radius: 16px; }";
  html += ".btn { display: inline-block; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 999px; text-decoration: none; transition: 0.2s; }";
  html += ".btn-on { background: #22c55e; color: #fff; } .btn-off { background: #ef4444; color: #fff; }";
  html += "</style></head><body><div class='card'>";
  html += "<h2>ESP32 LED Control</h2>";
  html += "<p>Current State: <strong>" + String(ledState ? "ON" : "OFF") + "</strong></p>";
  if (ledState) {
    html += "<a href='/led/off' class='btn btn-off'>TURN OFF</a>";
  } else {
    html += "<a href='/led/on' class='btn btn-on'>TURN ON</a>";
  }
  html += "</div></body></html>";
  return html;
}

void handleRoot() {
  server.send(200, "text/html", generateHTML());
}

void handleLedOn() {
  ledState = true;
  digitalWrite(LED_PIN, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  ledState = false;
  digitalWrite(LED_PIN, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected! IP: " + WiFi.localIP().toString());

  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
}

void loop() {
  server.handleClient();
}
`,
};

// ============================================================================
// TASK 2: Adafruit IO Dashboard & MQTT Cloud Telemetry
// ============================================================================
export const task2Content: TaskDefinition = {
  id: "task2",
  title: "Adafruit IO Dashboard & MQTT",
  category: "Cloud MQTT Broker & Dashboard",
  hardware: ["ESP32 Dev Module", "DHT11 Sensor", "5V Relay Module", "AC Filament Bulb (230V)", "Jumper Wires"],
  protocols: ["MQTT v3.1.1", "TCP/IP Port 1883", "QoS 0 Pub/Sub"],
  configuration: {
    broker: "io.adafruit.com",
    port: 1883,
    relayPin: 18,
    feedSubscribe: "jaishanthlenin/feeds/bulb-control",
    feedPublish: "jaishanthlenin/feeds/sensor-telemetry",
    publishIntervalMs: 5000,
  },
  firmwareSource: `
#include <WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>

#define WIFI_SSID       "LAB_WIFI_NETWORK"
#define WIFI_PASS       "SECURE_WIFI_PASSWORD"
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "jaishanthlenin"
#define AIO_KEY         "AIO_SECRET_KEY_SCRUBBED"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

Adafruit_MQTT_Subscribe bulbFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/bulb-control");
Adafruit_MQTT_Publish teleFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/sensor-telemetry");

const int RELAY_PIN = 18;

void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;
  Serial.print("Connecting to MQTT... ");
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying MQTT connection in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
  }
  Serial.println("MQTT Connected!");
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  mqtt.subscribe(&bulbFeed);
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &bulbFeed) {
      char* value = (char*)bulbFeed.lastread;
      Serial.print("Received MQTT Command: ");
      Serial.println(value);
      if (strcmp(value, "ON") == 0 || strcmp(value, "1") == 0) {
        digitalWrite(RELAY_PIN, HIGH);
      } else {
        digitalWrite(RELAY_PIN, LOW);
      }
    }
  }

  // Periodic Keepalive ping
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}
`,
};

// ============================================================================
// TASK 3: IFTTT + Adafruit IO IoT Automation & Email Alerts
// ============================================================================
export const task3Content: TaskDefinition = {
  id: "task3",
  title: "IFTTT + Adafruit IO IoT Automation",
  category: "Cloud-to-Cloud Webhook Automation",
  hardware: ["ESP32 Dev Module", "DHT11 Sensor (GPIO 4)", "LDR Light Sensor (GPIO 34)", "5V Relay (GPIO 18)"],
  protocols: ["REST Webhooks", "MQTT Reactive Triggers", "HTTPS / SSL (TLS 1.2)"],
  configuration: {
    tempThresholdHigh: 35.0,
    tempThresholdLow: 18.0,
    iftttEventName: "esp32_temperature_alert",
    actionProvider: "IFTTT Gmail Service",
  },
  firmwareSource: `
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "LAB_WIFI_NETWORK";
const char* pass = "SECURE_WIFI_PASSWORD";
const char* iftttWebhookKey = "IFTTT_WEBHOOK_KEY_SCRUBBED";
const char* eventName = "esp32_temperature_alert";

void triggerIFTTTAlert(float temperature, float humidity) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = "https://maker.ifttt.com/trigger/" + String(eventName) + "/with/key/" + String(iftttWebhookKey);
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"value1\":\"" + String(temperature, 1) + " C\",\"value2\":\"" + String(humidity, 1) + " %\",\"value3\":\"Threshold Exceeded!\"}";
    int httpResponseCode = http.POST(jsonPayload);

    Serial.print("IFTTT HTTP Response code: ");
    Serial.println(httpResponseCode);
    http.end();
  }
}
`,
};

export const week7Tasks1to3 = [task1Content, task2Content, task3Content];
export default week7Tasks1to3;
