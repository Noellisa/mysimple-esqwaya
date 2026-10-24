# Architecture
- Keep case facts in a shared data module used by the directory and trial stories so legal summaries stay consistent.
- Render trial stories as deterministic SVG scenes with three explicit stages and controllable playback so users can revisit each case without video generation or network dependencies.
- Give each trial story its own `motion` value in the shared data module; TrialScene maps it to a per-case CSS keyframe class so scenes never share one generic animation.