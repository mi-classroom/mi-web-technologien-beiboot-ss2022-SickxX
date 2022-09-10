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

  - Kurzes adr zum Review-Prozess mit meinem Review-Buddy.

- Solution
  - Main-Branch ist geschützt und es darf nur nach einem Review gemerged werden, dies wird durch einen Pull-Request von aus dem main erzeugte branches gewährleistet.

- Consequences
  - Änderungen können nicht im main-branch stattfinden. Jede Änderung am Code ist in einem branch enstanden und wird über den PR in den main gereviewed. Ist etwas angemerkt und erfordert eine Nachbesserung, muss diese erst durchgeführt werden und dann neu gereviewed werden, bevor der PR dann am Ende passieren darf.