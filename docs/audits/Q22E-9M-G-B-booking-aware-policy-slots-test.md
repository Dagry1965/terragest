# Q22E-9M-G-B — Booking-aware scheduling policy slots test

## Objectif

Valider le comportement booking-aware du runtime scheduling avec duration=60, buffer=15 et capacity variable.

## Résultats

- Sans booking : 08:00 disponible.
- Avec booking 08:00-09:00 + buffer 15 et capacity=1 : 08:00 indisponible.
- Avec booking 08:00-09:00 + buffer 15 et capacity=1 : 09:15 disponible.
- Avec booking 08:00-09:00 + buffer 15 et capacity=2 : 08:00 disponible avec 1 place restante.
