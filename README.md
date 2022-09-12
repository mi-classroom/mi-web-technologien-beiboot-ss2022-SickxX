# Web Technologien // begleitendes Projekt Sommersemester 2022

Zum Modul Web Technologien gibt es ein begleitendes Projekt. Im Rahmen dieses Projekts werden wir von Veranstaltung zu Veranstaltung ein Projekt sukzessive weiter entwickeln und uns im Rahmen der Veranstaltung den Fortschritt anschauen, Code Reviews machen und Entwicklungsschritte vorstellen und diskutieren.

Als organisatorischen Rahmen für das Projekt nutzen wir GitHub Classroom. Inhaltlich befassen wir uns mit der Entwicklung einer kleinen Web-Anwendung für die Bearbeitung von Bildern. Hierbei steht weniger ein professioneller Konzeptions-, Entwurfs- und Entwicklungsprozess im Vordergrund, sondern vielmehr die sukzessive Weiterentwicklung einer Anwendung, das Ausprobieren, Vergleichen, Refactoren und die Freude an lauffähigem Code.

# Ansprechpartner
Christopher Toth

# Setup
## Requisiten:
  - NodeJS (Versionen getestet: 16.2, 16.15), npm (8.5)

  oder

  - Docker

das Projekt clonen mit:
```sh
git clone https://github.com/mi-classroom/mi-web-technologien-beiboot-ss2022-SickxX.git
```

Im `/src` Ordner muss ein Ordner `/data` erstellt werden und dort das cda-paintings `json` abgelegt werden.
## Mit NodeJS und npm
Die folgenden Befehle für den Development Server ausführen:

Im geclonten Repository
```sh
cd frontend
```
```sh
npm install
```
```sh
npm run serve
```
## Mit Docker
1. Docker installieren, falls noch nicht geschehen
2. `cd frontend`
3. Image erstellen mit: `docker build -t <IMAGENAME> . `
4. Den Container mit dem Image starten: `docker run -p 8080:8080 --rm --name <YOUR-CONTAINERNAME> <IMAGENAME>`
5. App ist dann im Browser unter [http://localhost:8080](http://localhost:8080) zu finden

- Oder noch einfacher:
`docker-compose up` im root-Verzeichnis, statt der build und run commands

# Deployment

Aktuell auf github.io, da AWS-Kontingent ausgelaufen ist.

https://sickxx.github.io/

# Movement

Mit der `Enter` Taste wird in den Bewegungsmodus geschaltet. Mit den ` W A S D` Tasten wird sich bewegt, mit ` Q und E` ist das "fliegen" im Raum möglich und mit der Maus kann sich umgeschaut werden. Für weitere Informationen der Bilder über bspw. Referenzbilder, muss mit der `ESC` Taste die Bewegungssteuerung verlassen werden um dann das Bild klicken zu können.

# Timetracker

Issue 1: 36h

Issue 2: 1h

Nachbereitung von Server auf gh-pages: 1h

Issue 3: 44h

Issue 4: 7h

Issue 5: 5h