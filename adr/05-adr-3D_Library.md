# ADR 3D-Library

Status: [accepted] 

## Introduction

- Prologue (Summary)
- Discussion (Context)
- Solution (Decision)
- Consequences (Results)

## Specifics

- Prologue

  - Die Anwendung soll in eine 3D-Anwendung überführt werden, daher ist eine 3D Library für Javascript nötig, welche nach möglichkeit mit dem Vue.js-Framework vereinigt werden kann.

- Discussion

  - Meine Recherche hat zu folgenden Libraries geführt:
    - three.js
    - babylon.js mit vue-babylonjs
    - gsap
    - wrapper für three.js:
      - VueGL: three.js und vue.js
      - trois.js: three.js, vue.js, Vite.js
    

  - Die bisherige recherche hat ergeben, dass mit reinem GSAP die Webseiten animiert, aber nicht in 3D dargestellt sind.
  - VueGL und trois.js sind wrapper für three.js und vue.js
  - babylon.js ist auch mit vue.js vereinbar

- Solution

  - Da mit keinen dieser Libraries expertise vorhanden ist, fällt die Auswahl erstmal auf VueGL mit dem populären und viel genutzten three.js. VueGL verbindet Vue.js und three.js miteinander und macht die Handhabung somit leichter. Trois.js benutzt noch vite.js, was ich aktuell nicht nutze.

  - EDIT: Bin auf trois.js umgestiegen, weil vue-gl nach 3 Stunden rumexperimentieren nicht laufen wollte. trois.js war nach 5 Minuten (wirklich!) importiert. 

- Consequences
  - Aktuell ist meine App mit Vue gebaut, daher hoffe ich mit dem wrapper einen einfachen Einstieg in das 3D-Thema zu haben
  - Erstmal Einarbeiten und Hands-on, um zu schauen, ob das mit VueGL funktioniert, ansonsten wird nochmal recherchiert. 