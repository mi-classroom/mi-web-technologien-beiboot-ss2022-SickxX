# Linux Server Distribution

Status: [accepted]

## Introduction

- Prologue (Summary)
- Discussion (Context)
- Solution (Decision)
- Consequences (Results)
- Another decision (still to be clarified)

## Specifics

- Prologue (Summary)

  - Zu anfang lief ein Server auf meinem AWS-Account, siehe [Server-adr](./02-adr-server.md). Mein kostenloses Kontingent ist dann nach einer Weile abgelaufen und ich wechselte kurzerhand auf [github-pages](https://pages.github.com/).

- Discussion (Context)

  - Es gibt sicher noch weitere Hosting-Plattformen, jedoch war der begrenzten Zeit geschuldet, dass ich auf das mir schon aus Projekt-3 bekannte github-pages gewechselt bin. Zunächst hatte ich bei anderen Cloud-Anbietern wie Google oder Cloudflare nach kostenlosen möglichkeiten geschaut, wurde nur bei Google fündig. Dort scheiterte es dann daran, dass man eine Kreditkarte angeben muss bei der Erstellung eines Accounts. Sonst hätte ich gerne mal die Google-Services ausprobiert, da sie neben Amazon und Microsoft mit die größten Anbieter sind mit einer großen Bandbreite an Services. Mein Stundent-Azure-Account konnte ich leider nicht nochmal verifizieren, um dort etwas zu hosten.


- Solution
  - Github-pages für schnelles, unkompliziertes und kostenloses hosting.

- Consequences
  - Zuvor hatte ich meinen AWS-Server abgesichert und mit PW geschützt. Wie sicher github-pages ist kann ich noch nicht sagen und da die Bilder, die wir benutzen dürfen, mitlerweile auch bei Cranach öffentlich sind, habe ich kein Passwortschutz mehr eingebaut. Dies müsste man vermutlich über ein eigenes Login-Formular absichern, falls es nötig wäre.