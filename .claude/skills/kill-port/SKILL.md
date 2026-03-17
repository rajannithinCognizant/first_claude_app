---
name: kill-port
description: Kill the process running on a local port (default 4200). Use when user says "stop", "kill", "stop the server", "kill the port", or "stop hosting locally".
tools: Bash
---

# Kill Port

Stop the process listening on a given port. Defaults to port **4200** (Angular dev server) if no port is specified.

## Steps

1. Find the PID listening on the port using `netstat`.
2. If a process is found, kill it via PowerShell `Stop-Process`.
3. Confirm the port is free.

## Implementation

```
$PORT = <port from user, default 4200>

1. Run: netstat -ano | grep LISTENING | grep :$PORT
   - Parse the PID from the last column.

2. If no PID found → report "Nothing is running on port $PORT."

3. If PID found → run:
   powershell.exe -Command "Stop-Process -Id <PID> -Force; Write-Host 'Stopped'"

4. Re-run netstat check to confirm port is free and report result.
```

## Notes

- On Windows, use `powershell.exe -Command "Stop-Process"` — do NOT use `taskkill` directly from bash as it resolves to the wrong path.
- Residual `TIME_WAIT` entries after killing are normal OS TCP cleanup and not a problem.
- If the user specifies a different port (e.g. "stop port 3000"), use that port number instead.
