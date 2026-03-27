````markdown
# TP3 – Réusinage et amélioration de la qualité logicielle

> **MGL843 – Sujets avancés en conception logicielle**
>
> ![CI Status](https://img.shields.io/badge/CI-GitHub_Actions-blue?logo=github-actions)
> ![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
> ![Moose](https://img.shields.io/badge/Analysis-Moose-orange)

---

## Description

Ce projet s’inscrit dans la continuité du **TP2** et a pour objectif de réaliser un **réusinage (refactoring)** d’un système existant afin d’en améliorer la qualité logicielle.

L’approche adoptée repose sur deux axes :

- 🔧 **Réusinage manuel**, basé sur l’analyse des métriques
- 🤖 **Réusinage assisté par IA**, via Codex (mode agent)

👉 Les deux approches sont ensuite **comparées** afin d’évaluer leur impact sur la qualité du système.

---

## Objectifs

- Identifier les problèmes de conception à partir des métriques
- Proposer des améliorations pertinentes
- Appliquer le principe de responsabilité unique (SRP)
- Comparer les approches **humaine vs IA**
- Évaluer l’impact sur :
  - La complexité
  - Le couplage
  - La cohésion

---

## Architecture du projet

Le projet repose sur une architecture modulaire :

```text
src/
├── domain/
│   └── Note.ts
├── persistence/
│   └── NotesRepository.ts
├── services/
│   ├── NotesService.ts
│   ├── SearchNotes.ts
│   └── TagService.ts
├── web/
│   ├── app.ts
│   ├── routes.ts
│   └── views/
├── index.ts              # Façade CLI (NoteManager)
tests/
scripts/
.github/
````

---

## Problèmes identifiés (TP2)

L’analyse des métriques a permis d’identifier :

* 🔴 **God Class** : `NotesService`
* 🔴 **Complexité élevée** : `NoteManager`
* 🔴 **Problème de cohésion** : `Note`

---

## 🔧 Améliorations manuelles

### Amélioration 1 – Refactoring de NotesService

* Application du **SRP**
* Séparation en :

  * `SearchNotes`
  * `TagService`
* Réduction de la complexité et du couplage

---

### Amélioration 2 – Refactoring de Note

* Allègement de l’entité `Note`
* Meilleure répartition des responsabilités
* Simplification du code

---

## 🔧 Améliorations avec IA (Copilot)

### Amélioration 1 (IA)

* Séparation en :

  * `NotesQueryService`
  * `NotesCommandService`
  * `NotesPersistenceManager`
* Conservation de `NotesService` comme façade

---

### Amélioration 2 (IA)

* Extraction de la logique des tags vers `TagPolicy`
* Amélioration de la cohésion de `Note`
* Approche minimaliste et non intrusive

---

## Analyse des métriques

Les métriques utilisées :

* **LOC** : lignes de code
* **NOM** : nombre de méthodes
* **WMC** : complexité
* **FanIn / FanOut** : couplage

👉 Les résultats montrent que :

* Le réusinage manuel améliore fortement les métriques
* L’IA propose des solutions plus conservatrices

---

## ⚖️ Comparaison Manuel vs IA

| Critère             | Manuel               | IA                  |
| ------------------- | -------------------- | ------------------- |
| Impact architecture | Élevé                | Faible              |
| Réduction métriques | Importante           | Limitée             |
| Cohésion            | Amélioration globale | Amélioration locale |
| Approche            | Structurelle         | Incrémentale        |
| Risque              | Plus élevé           | Faible              |

---

## Cas particulier : NoteManager

Bien que la classe `NoteManager` présente des métriques élevées, elle agit comme une **façade CLI**.

👉 Elle ne contient pas de logique métier critique.

Le refactoring de cette classe n’a donc pas été priorisé, car il n’apporterait pas d’amélioration significative de la qualité du domaine.

---

## ⚙️ CI/CD & Analyse

Le pipeline CI permet :

1. Exécution des tests
2. Génération du modèle (`model.json`)
3. Analyse via Moose
4. Export des métriques (`.csv`)

---

## Utilisation

```bash
npm install
npm run dev:web
npm test
```
---

## 🔧 Refactoring

Les améliorations de ce projet sont documentées via des Pull Requests :

- Amélioration 1 (Manuel)
- Amélioration 2 (Manuel)
- Amélioration 1 (IA)
- Amélioration 2 (IA)

---

## Conclusion

Ce projet montre que :

* Le **réusinage manuel** est plus efficace pour améliorer les métriques
* L’**IA** propose des solutions pertinentes mais plus prudentes

Les deux approches sont **complémentaires**

---

## ✍️ Auteurs

Équipe 3 :
Konan Thierry Kouadio
Ghita Aimarah
Hossein Kargar

ÉTS – MGL843 – Hiver 2026

````
