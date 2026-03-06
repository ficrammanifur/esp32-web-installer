#include <WiFi.h>
#include <WebServer.h>
#include <WiFiManager.h>

WebServer server(80);

int ledPin = 2;

void root(){

String page="";

page+="<h1>ESP32 LED Control</h1>";

page+="<a href='/on'><button>ON</button></a>";
page+="<a href='/off'><button>OFF</button></a>";

server.send(200,"text/html",page);

}

void on(){

digitalWrite(ledPin,HIGH);
server.send(200,"text/html","LED ON");

}

void off(){

digitalWrite(ledPin,LOW);
server.send(200,"text/html","LED OFF");

}

void setup(){

Serial.begin(115200);

pinMode(ledPin,OUTPUT);

WiFiManager wm;

wm.autoConnect("ESP32-Setup");

server.on("/",root);
server.on("/on",on);
server.on("/off",off);

server.begin();

}

void loop(){

server.handleClient();

}
