# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: seed.spec.ts >> Test group >> seed
- Location: tests/seed.spec.ts:4:7

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window
<launched> pid=2505
[pid=2505][err] /home/runner/.cache/ms-playwright/webkit-2311/minibrowser-wpe/bin/MiniBrowser: error while loading shared libraries: libwoff2dec.so.1.0.2: cannot open shared object file: No such file or directory
Call log:
  - <launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window
  - <launched> pid=2505
  - [pid=2505][err] /home/runner/.cache/ms-playwright/webkit-2311/minibrowser-wpe/bin/MiniBrowser: error while loading shared libraries: libwoff2dec.so.1.0.2: cannot open shared object file: No such file or directory
  - [pid=2505] <gracefully close start>
  - [pid=2505] <kill>
  - [pid=2505] <will force kill>
  - [pid=2505] exception while trying to kill process: Error: kill ESRCH
  - [pid=2505] <process did exit: exitCode=127, signal=null>
  - [pid=2505] starting temporary directories cleanup
  - [pid=2505] finished temporary directories cleanup
  - [pid=2505] <gracefully close end>

```