# Content inventory and audit

Reviewed: October 28, 2026. Scope: Phase 1 professional content and architecture. This document contains only publication-safe summaries; private evidence is not attached or embedded.

## Original site

Inspected README, package/lock, index, Vite/ESLint configuration, deployment workflow, main entry, App.jsx, both stylesheets, source/public asset inventory, and repository status. The previous single component mixed content, layout, observer effects, and a looping simulated terminal. Navigation disappeared on mobile. The featured repository link had no destination. Graduate and undergraduate entries were mixed into employment; undergraduate completion was outdated. Skills were flat badges without evidence context. There were no routes, route metadata, content tests, or static case studies. Template styles/assets and Vite identity remained.

Original projects retained: adversary/detection environment (now purple team lab), Wazuh, segmented network lab, LifeDash, allocator, editor, incident response scripts, Docker WordPress. Earlier activities retained without invented dates or rankings: Route66 infrastructure, Hivestorm captain, CyberPatriot captain, NCAE competitor. Original email and LinkedIn destinations retained; LinkedIn account ownership was not independently reverified. No résumé file existed.

## Published project inventory

One record per project in `src/content/projects.ts`; all detail pages are canonical in their home section. Work spotlights link to Workshop records rather than copying them.

| Record / home                          | Treatment                                                | Evidence basis / key boundary                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ControlGauge / work                    | Featured full technical case study                       | Public README, code and packaging docs. Desktop foundation only; AI, ingestion, database, assessments planned.                                             |
| AgentHQ / work                         | Featured full technical case study and actual screenshot | Public README, integration audit, event sanitizer, test matrix. Hermes live; OpenCode experimental. Screenshot is demo mode.                               |
| Local AI workbench / work              | Sanitized infrastructure case study                      | Owner account plus AgentHQ environment corroboration. No host details, hardware specifications or benchmarks.                                              |
| Purple teaming / labs                  | Lab case study                                           | Owner account and original portfolio; no claimed detection outcomes.                                                                                       |
| Wazuh / labs                           | Historical lab                                           | Original portfolio; no efficacy metrics.                                                                                                                   |
| Segmented network / labs               | Historical lab                                           | Owner account: unauthenticated HTTP response only. No broader compromise.                                                                                  |
| Incident response scripting / labs     | Historical team coursework                               | Public README, team attribution and personal fork. Individual contributions unresolved.                                                                    |
| Memory allocator / work                | Earlier systems work                                     | Public README, course-provided skeleton distinguished from implementation. Known correctness issues retained.                                              |
| CLI editor / work                      | Earlier systems work                                     | Public README explicitly credits kilo tutorial; no syntax highlighting claim.                                                                              |
| Docker WordPress / labs                | 2023 infrastructure learning                             | Public docs. Example credentials and obsolete database make it a historical lab, not production guidance.                                                  |
| Bug Hunters Guild / workshop           | Prototype + engineering spotlight                        | Owner-reported first quest and guarded worker execution; not independently inspected or security-audited.                                                  |
| Pokémon Party Fighter / workshop       | Prototype                                                | Owner account only; current roster/player counts withheld; no assets or build distributed.                                                                 |
| MTG Game Night / workshop              | Local prototype                                          | Relevant existing PartyMage README inspected. Two-player scope, private phone hands, XMage, reconnect. Tests not rerun here. No raw local evidence copied. |
| LifeDash / workshop                    | Historical hackathon + engineering spotlight             | Public tree and `2026/README.md`: Flutter app. Short docs do not prove old habit/goal/full-stack claims.                                                   |
| RealityCheck AI / TrustLens / workshop | Single concept                                           | Owner account only, May 2026. Names not treated as two products. No finished prototype claimed.                                                            |

## Education, experience, notes

Employment: OCII Security Compliance Analyst, October 2025–present, concise high-level duties; Cyber Fellows Administrative Assistant August 2024–May 2025. Present means the October 28, 2026 content snapshot.

Education: bachelor’s degree completed May 2026; graduate studies began Fall 2026, expected May 2028. Formal degree names unresolved, so descriptive titles used. No certification is shown as earned.

Milestones: May 2026 undergraduate completion; Fall 2026 graduate study; October 2026 ControlGauge foundation and AgentHQ telemetry/replay, supported by owner account and repository records. Dates are deliberately no more precise than sources support.

Notes: context configuration versus measured usable context; smaller-model Qwen-family experiments on a personal RTX 4070 system, explicitly owner-reported with no comparison metrics.

Pending events: Tulsa Tech Week agent workshop, Chroma demonstrations, CMMC Midwest support, workstation imaging. Omitted until exact role, date, attribution, and disclosure permission are confirmed. See CONTENT_VERIFICATION.

## Research coverage

GitHub connector inspected Xirro9’s returned public repository inventory (9 repositories). Priority repositories inspected directly without cloning unrelated work. ControlGauge public tree observed at `146cea9b757c60787de92903d6f0f6b7f3178482`; LifeDash tree at `0ad942300fc365e1b24305bc27d3f61df0310e84`. AgentHQ public README blob: `1ff954aff4f2c935c068f01d49b22e89dee5ff65`. Moving source links can change after this review.

Local PartyMage was relevant and already present. No unrelated repository was modified. No public Bug Hunters Guild, Party Fighter, or RealityCheck repository was identified in the returned inventory. This does not prove no such source exists. Portfolio live URL was attempted through the web tool but was unavailable there; the cloned source was the audit baseline.

## Media

`public/media/agenthq-night.png`: actual 1280×720 capture from `Xirro9/AgentHQ/docs/evidence/e2e-04-night.png`, visually inspected. Demonstrates demo interface/night settings. No private network details visible. Attribution and source recorded in `public/media/README.md`.

Case-study architecture flows are semantic, sanitized component overviews, not screenshots or exact deployment diagrams. No fabricated product screens. Old portfolio screenshots in `.github/readme` remain historical repository artifacts and are no longer advertised as current previews.

## Structural blueprint follow-up

The separate structural-blueprint branch reorganizes existing verified/qualified content into the Observatory, Engineering Archive and Technomancer Workshop compositions, with no added employment, qualification or project-capability claims. Existing education emphasis remains. `MEDIA_MANIFEST.md` records the authentic AgentHQ cover/gallery and all missing captures. The task-board screenshot was inspected before reuse; its fixture tasks remain explicitly DEMO. No actual preview video was supplied or invented.
