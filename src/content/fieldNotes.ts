import type { FieldNote } from "./types";

/**
 * Public, sanitized field notes. Source: the owner's private October 2026
 * research report and agent handoff. Deliberately excluded: endpoint
 * addresses and ports, container and network names, driver versions,
 * hardware specifications beyond the already-published personal GPU,
 * throughput figures, vendor quotes, and workplace details. Every claim keeps
 * the basis it had in the source (observed, reported, explored).
 */
export const fieldNotes: FieldNote[] = [
  {
    slug: "local-llm-workbench",
    path: "/labs/notes/local-llm-workbench",
    title: "Running coding agents on local hardware",
    dek: "Field notes from three weeks of serving models, wiring agent harnesses, and finding out what a context window actually means.",
    description:
      "Field notes on local LLM serving, agent harnesses, KV-cache limits and evidence discipline, October 2026. Sanitized; no benchmarks claimed.",
    period: "October 6–28, 2026",
    basis: "Owner-reported reconstruction from setup reports, selected logs and run outputs",
    question: {
      before: "Can I run a useful model locally?",
      after:
        "Can I operate a private, agentic engineering platform, with specialist agents, dependable tools, observability, and premium models only on approval?",
    },
    environments: [
      {
        title: "Personal desktop",
        when: "RTX 4070 · Windows",
        body: "A 9B-class Q4 model on CUDA llama.cpp with Hermes and OpenCode. Useful for bounded edits, repository search, scripts and test runs.",
        basis: "reported",
      },
      {
        title: "Single-GPU Linux bench",
        when: "Test environment",
        body: "A 27B-class Q4 model with Hermes delegating to OpenCode. Where tool routing worked, and where long-context sessions started failing.",
        basis: "reported",
      },
      {
        title: "Multi-GPU Linux workstation",
        when: "Test environment",
        body: "GLM-5.3-Flash Q4 served by llama.cpp in Docker, Hermes and OpenCode 2.x, six specialist roles sharing one inference slot.",
        basis: "reported",
      },
    ],
    timeline: [
      {
        when: "Early October",
        title: "Model type before model speed",
        body: "A selected model turned out to be an embedding model, not a chat model. Separating wrong model type from wrong endpoint became the first habit.",
        basis: "observed",
      },
      {
        when: "Around Oct 13",
        title: "The GPU was idle",
        body: "A llama.cpp build compiled without CUDA accepted requests and answered them on the CPU. A CUDA build changed throughput dramatically. Requests succeeding proved nothing about where they ran.",
        basis: "observed",
      },
      {
        when: "Oct 19",
        title: "Harness and model are different things",
        body: "Hermes added a gateway, provider configuration and memory. A “provider unavailable” error meant no server was listening, not that anything was wrong with the model.",
        basis: "observed",
      },
      {
        when: "Oct 22–23",
        title: "The context crisis",
        body: "A large configured context window, several server slots, and fresh sessions failing far below the headline number, with KV-cache “failed to find free space” errors and a CUDA fault. The root cause was never uniquely established.",
        basis: "observed",
      },
      {
        when: "Oct 23",
        title: "Trimming prompts did not fix memory",
        body: "Shrinking the always-loaded skill index roughly halved its size, made some skills harder to discover, and did not stop the KV failures.",
        basis: "reported",
      },
      {
        when: "Oct 23–27",
        title: "Fewer hops for small models",
        body: "On the 9B desktop setup, routing every tiny edit through Hermes into OpenCode added tokens and failure points. Direct OpenCode was the better default for routine tasks.",
        basis: "reported",
      },
      {
        when: "Oct 26–28",
        title: "One slot, six roles",
        body: "Six specialist roles: architect and security intended read-only, implementation, frontend, tester and debugger with edit scope. Health and model-list checks passed, and an eight-test delegation fixture passed. That validates wiring, not engineering quality.",
        basis: "reported",
      },
      {
        when: "Oct 27–28",
        title: "Evidence tools join the harness",
        body: "Playwright screenshots, Semgrep, Gitleaks, Trivy, Biome, Ruff, ast-grep, Serena and Repomix, plus screenshot input to the model. A context-pruning A/B looked promising in one scenario and was left disabled.",
        basis: "reported",
      },
    ],
    incidents: [
      {
        symptom: "“Provider temporarily unavailable”",
        cause: "The harness was configured; no model server was listening.",
        check: "Confirm the process, then /health and /v1/models, before touching the agent.",
      },
      {
        symptom: "Responses arrive, but slowly",
        cause: "A CPU-only llama.cpp build left the GPU idle.",
        check: "Confirm the CUDA build and watch the server appear in the GPU process list.",
      },
      {
        symptom: "Chat requests fail against a valid endpoint",
        cause: "The served model was an embedding model.",
        check: "Match the model type and the exact ID returned by /v1/models.",
      },
      {
        symptom: "Connection refused from inside a container",
        cause: "localhost inside a container is that container.",
        check: "Use the service name on the shared private network.",
      },
      {
        symptom: "The harness rejects a working server",
        cause: "The server advertised less context than the harness requires.",
        check: "Fix the real server context; never just relabel the number.",
      },
      {
        symptom: "Fresh sessions fail far below the headline context",
        cause: "KV cache exhausted: large window × several slots.",
        check: "Inspect n_ctx, slots, cache type and VRAM together; reduce slots first.",
      },
      {
        symptom: "A CUDA kernel crash mid-session",
        cause: "Unresolved. Not evidence about the model's reasoning.",
        check: "Capture the command line, build, cache settings and a minimal reproducer.",
      },
      {
        symptom: "An inference API reachable from outside",
        cause: "OpenAI-compatible servers are usually unauthenticated.",
        check: "Keep inference on loopback or a private network by default.",
      },
    ],
    rules: [
      "Start with an inspectable inference API: process, GPU use, /health, /v1/models and one completion, before any gateway or agent.",
      "Budget weights and KV cache separately. Context size, cache precision, GPU layers, slots and offload set the real capacity.",
      "Never infer usable context from frontend metadata. Check the backend, then stress it.",
      "One model server can serve many roles without duplicating weights, but every role still costs context and queue time.",
      "Harness tests are not leaderboards. A passing routing fixture proves that workflow and nothing more.",
      "Keep telemetry truthful: LIVE, DEMO, REPLAY and STALE are separate states.",
      "Load skills on demand from a small registry; giant always-on skill packs crowd out the task.",
      "Every optimization needs a quality A/B. Saving tokens while doubling correction loops is not a win.",
      "Local-first is enforced, not requested: provider allowlists, egress rules, tool permissions, and no cloud credentials present.",
      "Measure results, not activity: tests, review findings, regressions, cost and time.",
    ],
    confidence: {
      established: [
        "A 9B Q4 model served on the personal RTX 4070 through CUDA llama.cpp and used GPU memory.",
        "A 27B-class model completed Hermes → OpenCode delegation fixtures.",
        "Long-context, multi-slot configuration produced KV allocation errors and a CUDA fault.",
        "A Docker llama.cpp GLM-5.3-Flash Q4 server passed health and model-list checks with Hermes integration.",
        "One inference slot and sequential orchestration were deliberate choices.",
      ],
      unproven: [
        "Throughput figures from individual runs; conditions were not controlled.",
        "Reliable reasoning across the full configured context window.",
        "Token savings from context pruning across real workloads.",
        "Quality rankings between local and hosted models beyond single tasks.",
      ],
      notEstablished: [
        "Six agents running in parallel on the one-slot server: they queue.",
        "A fine-tuned model checkpoint; specialization came from prompts, tools and routing.",
        "A continuously running premium-planner / local-executor hybrid with measured savings.",
        "Any purchase decision from the hardware research.",
      ],
    },
    experiments: [
      "Record the same matrix on every machine: build, model file and hash, quantization, context, cache type, slots, placement, prefill and decode.",
      "Validate usable context with retrieval and coherent-edit tests at increasing prompt lengths.",
      "Compare a single general agent against Hermes → specialist delegation on identical tasks.",
      "Compare direct premium, premium-planned local, and direct local on identical tasks: tokens, retries, wall time, acceptance.",
      "Benchmark screenshot-based detection of seeded UI regressions.",
    ],
    brief: `# Local LLM engineering: compact brief
Goal: a private, agentic engineering setup. Local models, specialist roles, tools, tests, visual QA; premium models only with explicit approval.

Stack
- Hermes: conversation, memory, policy, routing.
- OpenCode: repo search, edits, commands, tests; specialist roles.
- llama.cpp: OpenAI-compatible serving on a private network.
- Roles: architect + security (read-only), implementation, frontend, tester, debugger (edit). One inference slot, so roles run sequentially.

Lessons
1. Weights, KV cache, active context and concurrency are separate budgets. A large configured context is not usable capacity.
2. Harness and routing tests validate the harness, not open-ended coding quality.
3. Prefer one strong local model with role-specific contexts before adding models or parallel agents.
4. Keep skill indexes small; load detail on demand.
5. No silent cloud fallback. Ask first, especially for private source.
6. Compact task briefs, bounded retries (~3), symbol-level search, tests, screenshots, evidence-based reports.
7. Keep implemented and planned work apart in every status report.

Rules for the next agent
- Check the running machine before claiming what is installed.
- Never publish machine identifiers, addresses, secrets or workplace details.
- Never turn a reported run into a benchmark.`,
    related: ["local-ai-workbench", "agenthq", "controlgauge"],
  },
];

export const fieldNotePath = (slug: string) =>
  fieldNotes.find((note) => note.slug === slug)?.path ?? "/labs";
