# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: OrderProduct/LoginPageTest.spec.ts >> Login Page Test >> Verify Login
- Location: tests/OrderProduct/LoginPageTest.spec.ts:9:9

# Error details

```
Error: browserType.launch: Target page, context or browser has been closed
Browser logs:

<launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window
<launched> pid=2666
[pid=2666][err] /home/runner/.cache/ms-playwright/webkit-2311/minibrowser-wpe/bin/MiniBrowser: error while loading shared libraries: libwoff2dec.so.1.0.2: cannot open shared object file: No such file or directory
Call log:
  - <launching> /home/runner/.cache/ms-playwright/webkit-2311/pw_run.sh --inspector-pipe --headless --no-startup-window
  - <launched> pid=2666
  - [pid=2666][err] /home/runner/.cache/ms-playwright/webkit-2311/minibrowser-wpe/bin/MiniBrowser: error while loading shared libraries: libwoff2dec.so.1.0.2: cannot open shared object file: No such file or directory
  - [pid=2666] <gracefully close start>
  - [pid=2666] <kill>
  - [pid=2666] <will force kill>
  - [pid=2666] <process did exit: exitCode=127, signal=null>
  - [pid=2666] starting temporary directories cleanup
  - [pid=2666] finished temporary directories cleanup
  - [pid=2666] <gracefully close end>

```