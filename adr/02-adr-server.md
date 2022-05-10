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

Als Server hinter der Webapplikation kommen eine Vielzahl an Linux Distributionen infrage.
Die populärsten und am Markt am weitesten verbreitet sind Debian GNU/Linux, Ubuntu Linux und Red Hat
Enterprise Linux (RHEL) bzw. der binärkompatible freie Ableger CentOS. Oracle Linux ist ebenfalls
binärkompatibel zu RHEL.

- Discussion (Context)

RHEL und der Doppelgänger CenOS finden sich im Enterprise-Bereich wieder. Sie haben eine hohe Stabilität und
lange Lebenszyklen für den Support. RHEL ist nur mit einem Supportvertrag zu erwerben und fällt damit weg.
CentOS ist der kostenfreie recompile von RHEL. Vor kurzem hat Red Hat jedoch eine gravierende Änderung
vorgenommen. CentOS 8.x (aktuellste Version) wird eingestellt und stattdessen wird auf CentOS Stream
gewechselt. CentOS Stream bekommt vor RHEL Updates/Packete, ist also für RHEL quasi die Beta. Eine Beta
möchte man als Server produktiv nicht einsetzen. CentOS 7.x wird zwar noch unterstützt, der Support läuft
aber nur noch bis Ende 2024.

Oracle Linux ist zwar auch frei nutzbar, jedoch steht eben Oracle dahinter und könnte seine Lizenzmodell
jederzeit ändern, was sie bspw. bei Java zuletzt getan haben.

Debian ist eine der ältesten Distributionen und bietet eine stable-Version für produktive Server an und ist
kostenfrei.

Ubuntu basiert auf Debian, ebenfalls frei verfügbar und bieten die LTS-Versionen (long-term support) an,
welche für produktive Server empfohlen werden.

Debian oder Ubuntu würden somit zur Wahl stehen.

- Solution
  Ubuntu, gehostet auf AWS, ändert sich aber vermutlich noch, da mein Kontingent ausläuft :>

- Consequences
  Langzeit-Support für produktive Server ist mit den entsprechenden LTS Versionen gegeben.
