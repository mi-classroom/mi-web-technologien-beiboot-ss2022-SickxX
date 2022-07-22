# Docker

Status: [accepted]

## Introduction

- Prologue (Summary)
- Discussion (Context)
- Solution (Decision)
- Consequences (Results)

## Specifics

- Prologue

  - Für das einfache bereitstellen der Anwendung zum Testen für den Review-Buddy ist ein geeignetes Mittel zu wählen.

- Discussion

  - Vorgabe des Issues ist Docker.
  - Wunsch vom Review-Buddy: Docker-Compose für das einfachere handling.

- Solution
  - Docker ist eine Plattform, die es ermöglicht Anwendungen in leichtgewichtigen virtuellen Umgebungen, genannt Containern, laufen zu lassen.
  -docker-compose als zusatz.

- Consequences
  - Schnelles Ausführen der zu testenden Anwendung mittels Docker führt zu schnellerem Review-Prozess. Kein Server nötig, lokal ausführbar.
  - Mit docker-compose lassen sich mehrere Container auf einmal starten/stoppen etc., sodass man nur noch einen Befehl nutzen muss, um bspw. Frontend und Backend zusammen auszuführen. In meinem Fall habe ich kein Backend, es vereinfacht nur das CLI-handling.