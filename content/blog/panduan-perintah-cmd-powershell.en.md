*This material is written for Windows 10 and Windows 11. All syntax follows modern versions and is presented in standard English.*

## Table 1: Command Prompt (CMD)

> **How to open:** press `Win + R`, type `cmd`, press Enter. For administrative commands, right-click → **Run as administrator**.

### A. Directory Navigation

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `cd` | Change directory | `cd [path]` | `cd C:\Users\You\Documents` | Use `cd ..` to go up one level; `cd /d D:\Folder` to switch drives in one step. |
| `dir` | List folder contents | `dir [path]` | `dir` | Add `/w` (wide view) or `/s` (include subfolders). |
| `cls` | Clear the screen | `cls` | `cls` | The most commonly used command to keep the output tidy. |
| `pushd` / `popd` | Save & return to a directory | `pushd [path]` then `popd` | `pushd D:\Data` → ... → `popd` | Useful when moving between folders in a single session. |
| `tree` | Display the folder structure | `tree [path]` | `tree C:\Users\You\Documents` | Use `tree /f` to include file names. |

### B. File & Folder Management

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `md` / `mkdir` | Create a new folder | `md [folder name]` | `md Reports2026` | Can create nested folders: `md a\b\c`. |
| `rd` / `rmdir` | Delete a folder | `rd [folder]` | `rd /s /q Reports2026` | `/s` deletes with contents, `/q` without confirmation. Be careful! |
| `del` / `erase` | Delete files | `del [file]` | `del *.tmp` | Files are not moved to the Recycle Bin. Use wildcards `*` and `?`. |
| `copy` | Copy files | `copy [source] [destination]` | `copy report.docx D:\Backup` | For whole folders, use `xcopy` or `robocopy`. |
| `xcopy` | Copy files & folders | `xcopy [source] [destination] /e /i` | `xcopy C:\Data D:\Backup /e /i` | `/e` includes empty subfolders, `/i` assumes destination is a folder. |
| `robocopy` | Advanced folder copying | `robocopy [source] [destination] [options]` | `robocopy C:\Data D:\Backup /MIR` | More reliable than `xcopy`; `/MIR` mirrors the source. |
| `move` | Move files/folders | `move [source] [destination]` | `move report.docx D:\Backup` | Can also be used for renaming (see `ren`). |
| `ren` / `rename` | Rename files/folders | `ren [old name] [new name]` | `ren report.docx report-final.docx` | Cannot move between drives. |
| `attrib` | Change file attributes | `attrib [+/-r/+h/+s] [file]` | `attrib +h data.txt` | `+r` read-only, `+h` hidden, `+s` system. |
| `type` | Display the contents of a text file | `type [file]` | `type config.txt` | For long files use `more`. |
| `more` | Display file contents one screen at a time | `more [file]` | `more readme.txt` | Press `Space` to continue, `Q` to quit. |
| `fc` | Compare two files | `fc [file1] [file2]` | `fc version1.txt version2.txt` | Use `fc /b` for binary comparison. |

### C. Searching for Files & Text

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `where` | Find the location of a program | `where [program name]` | `where notepad` | Shows the full path to the executable. |
| `find` | Search for text within a file | `find "text" [file]` | `find "ERROR" server.log` | Case-sensitive by default. |
| `findstr` | Search for text using patterns | `findstr [options] "pattern" [file]` | `findstr /i "fail" *.log` | `/i` ignores case; supports regex. |
| `dir /s /b` | Search for files across all subfolders | `dir /s /b [file name]` | `dir /s /b *.pdf` | The fastest combination for searching by file name. |

### D. System Information

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `ver` | Display the Windows version | `ver` | `ver` | Shows the build version. |
| `systeminfo` | Full system information | `systeminfo` | `systeminfo` | RAM, OS, hardware, etc. Takes a few seconds. |
| `hostname` | Display the computer name | `hostname` | `hostname` | Useful for automation scripts. |
| `whoami` | Display the current user | `whoami` | `whoami` | `whoami /all` shows full user & group details. |
| `set` | Display all environment variables | `set` | `set` | `set NAME=value` to create one temporarily. |

### E. Network Information & Configuration

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `ipconfig` | Display IP configuration | `ipconfig` | `ipconfig /all` | `/all` full details; `/flushdns` clears the DNS cache. |
| `ping` | Test connectivity to a host | `ping [host]` | `ping google.com` | `ping -t` pings continuously (stop with Ctrl+C). |
| `tracert` | Trace the route of packets | `tracert [host]` | `tracert google.com` | Shows the hops toward the destination. |
| `pathping` | Combination of ping + tracert | `pathping [host]` | `pathping google.com` | Analyzes packet loss per hop; slower. |
| `netstat` | Display network connections | `netstat -ano` | `netstat -ano` | `-a` all connections, `-n` no DNS, `-o` process PID. |
| `nslookup` | Look up DNS information | `nslookup [domain]` | `nslookup google.com` | Returns the IP address of a domain name. |
| `getmac` | Display the MAC address | `getmac /v` | `getmac /v` | Useful for device whitelisting. |
| `net use` | Connect to a network drive | `net use [drive]: [path]` | `net use Z: \\server\data` | `net use Z: /delete` to disconnect. |
| `netsh` | Advanced network configuration | `netsh [context] [command]` | `netsh wlan show profiles` | Wi-Fi, firewall, etc. configuration. |

### F. Process & Program Management

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `tasklist` | Display the list of processes | `tasklist` | `tasklist /svc` | `/svc` shows the services running in each process. |
| `taskkill` | Terminate processes | `taskkill /PID [number] /F` | `taskkill /IM chrome.exe /F` | `/IM` by name, `/PID` by number, `/F` force. |
| `start` | Run a program/URL | `start [program/url]` | `start notepad` | `start http://...` to open a browser. |

### G. Service Management

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `net start` | Display/start services | `net start [name]` | `net start wuauserv` | With no arguments, lists all running services. |
| `net stop` | Stop a service | `net stop [name]` | `net stop wuauserv` | Requires administrator rights. |
| `sc` | Advanced service control | `sc query [name]` | `sc query \| findstr RUNNING` | `sc config [name] start= auto` sets the startup mode. |

### H. Environment Variables & Disk

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `setx` | Set a permanent environment variable | `setx [NAME] "value"` | `setx JAVA_HOME "C:\Program Files\Java\jdk-17"` | Applies to new sessions only. |
| `echo %VAR%` | Display a variable value | `echo %PATH%` | `echo %USERNAME%` | `%VAR%` is the variable syntax in CMD. |
| `chkdsk` | Check a disk | `chkdsk C:` | `chkdsk C: /f` | `/f` fixes errors; may require a restart. |
| `diskpart` | Disk management (partition, format) | `diskpart` → `list disk` | `list disk` | Interactive mode — **be careful, it is very dangerous**. |
| `wmic` | System information via WMI | `wmic logicaldisk get name,freespace` | `wmic logicaldisk get size,freespace` | Being deprecated on newer Windows 11; use PowerShell. |

### I. Users, Shutdown & Utilities

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `net user` | Manage user accounts | `net user` | `net user Andi /add` | `net user Andi *` to set a password interactively. |
| `net localgroup` | Manage local groups | `net localgroup [group]` | `net localgroup Administrators` | Add a user to a group: `net localgroup Administrators Andi /add`. |
| `runas` | Run a program as another user | `runas /user:[user] [program]` | `runas /user:Administrator cmd` | Requires the target user's password. |
| `shutdown` | Shut down / restart the computer | `shutdown /r /t 0` | `shutdown /s /t 60` | `/s` shutdown, `/r` restart, `/a` abort, `/t` seconds. |
| `logoff` | Log out of the current session | `logoff` | `logoff` | Closes all applications in the active session. |
| `sfc /scannow` | Repair system files | `sfc /scannow` | `sfc /scannow` | Requires admin; verifies Windows file integrity. |
| `DISM` | Repair the Windows image | `DISM /Online /Cleanup-Image /RestoreHealth` | `DISM /Online /Cleanup-Image /RestoreHealth` | Run before `sfc` for severe damage. |
| `gpupdate` | Refresh group policy | `gpupdate /force` | `gpupdate /force` | Applies policy without restarting. |
| `help` | Help for commands | `help [command]` | `help cd` | `command /?` also shows help. |
| `exit` | Close the CMD window | `exit` | `exit` | Also used to end batch scripts. |
| `title` | Set the window title | `title [text]` | `title Server Monitor` | Useful for telling many CMD windows apart. |
| `date` / `time` | Display/set the date & time | `time` | `time` | For scripts, use `echo %DATE% %TIME%`. |
| `assoc` | Display file extension associations | `assoc .txt` | `assoc .txt` | `assoc .txt=txtfile` to change an association. |

---

## Table 2: Windows PowerShell

> **How to open:** right-click Start → **Windows PowerShell** or **Terminal**. For administrative commands, choose *Run as administrator*.
> **Tip:** PowerShell understands almost all CMD commands (built-in aliases). This table focuses on native PowerShell *cmdlets* (the **Verb-Noun** pattern, e.g. `Get-ChildItem`).

### A. Directory Navigation

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `Get-Location` | Display the current directory | `Get-Location` | `Get-Location` | Aliases: `pwd`, `gl`. |
| `Set-Location` | Change directory | `Set-Location [path]` | `Set-Location C:\Users\You\Documents` | Aliases: `cd`, `sl`. |
| `Clear-Host` | Clear the screen | `Clear-Host` | `Clear-Host` | Alias: `cls`. |
| `Push-Location` / `Pop-Location` | Save & return to a directory | `Push-Location [path]` → `Pop-Location` | `Push-Location D:\Data` → ... → `Pop-Location` | Equivalent to `pushd`/`popd` in CMD. |
| `Get-ChildItem` | List folder contents | `Get-ChildItem [path]` | `Get-ChildItem C:\Users\You -Recurse` | Aliases: `dir`, `ls`, `gci`. `-Recurse` includes subfolders. |

### B. File & Folder Management

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `New-Item` | Create a file/folder | `New-Item -Path [path] -ItemType [type]` | `New-Item -Path Reports2026 -ItemType Directory` | `-ItemType File` for an empty file. |
| `Remove-Item` | Delete files/folders | `Remove-Item [path]` | `Remove-Item Reports2026 -Recurse -Force` | Aliases: `rm`, `del`. `-Recurse` for folders with contents. |
| `Copy-Item` | Copy files/folders | `Copy-Item [source] [destination]` | `Copy-Item report.docx D:\Backup` | Aliases: `cp`, `copy`. `-Recurse` for folders. |
| `Move-Item` | Move files/folders | `Move-Item [source] [destination]` | `Move-Item report.docx D:\Backup` | Aliases: `mv`, `move`. |
| `Rename-Item` | Rename files/folders | `Rename-Item [path] -NewName [name]` | `Rename-Item report.docx -NewName report-final.docx` | Aliases: `ren`, `rni`. |
| `Get-Content` | Display the contents of a file | `Get-Content [path]` | `Get-Content server.log -Tail 50` | Aliases: `cat`, `type`. `-Tail 50` last 50 lines. |
| `Set-Content` | Write/overwrite file contents | `Set-Content [path] -Value [text]` | `Set-Content config.txt -Value "port=8080"` | `Add-Content` to append without overwriting. |
| `Out-File` | Save output to a file | `[command] \| Out-File [path]` | `Get-Process \| Out-File processes.txt` | Saves any output as text. |
| `Test-Path` | Check whether a path exists | `Test-Path [path]` | `Test-Path C:\Windows` | Returns `True`/`False`. |
| `Select-String` | Search for text in files | `Select-String -Path [file] -Pattern [pattern]` | `Select-String -Path *.log -Pattern "ERROR"` | Alias: `sls`. A more powerful equivalent of `findstr`. |
| `Where-Object` | Filter objects by condition | `[objects] \| Where-Object { condition }` | `Get-Process \| Where-Object {$_.CPU -gt 100}` | Aliases: `?`, `where`. A key feature of the PowerShell pipeline. |

### C. System & Network Information

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `Get-ComputerInfo` | Full system information | `Get-ComputerInfo` | `Get-ComputerInfo` | RAM, OS, BIOS, etc. |
| `Get-Date` | Display the date & time | `Get-Date` | `Get-Date -Format "yyyy-MM-dd"` | Very useful for naming backup files. |
| `Get-NetIPAddress` | Display IP configuration | `Get-NetIPAddress` | `Get-NetIPAddress -AddressFamily IPv4` | The modern equivalent of `ipconfig`. |
| `Test-Connection` | Test connectivity to a host | `Test-Connection [host]` | `Test-Connection google.com -Count 4` | Alias: `ping`. |
| `Test-NetConnection` | Test connection + port | `Test-NetConnection [host] -Port [port]` | `Test-NetConnection google.com -Port 443` | Alias: `tnc`. Checks connectivity & open ports. |
| `Resolve-DnsName` | Look up DNS information | `Resolve-DnsName [domain]` | `Resolve-DnsName google.com` | The modern equivalent of `nslookup`. |
| `Get-NetTCPConnection` | Display network connections | `Get-NetTCPConnection` | `Get-NetTCPConnection -State Listen` | A more structured equivalent of `netstat -ano`. |
| `Clear-DnsClientCache` | Clear the DNS cache | `Clear-DnsClientCache` | `Clear-DnsClientCache` | Equivalent to `ipconfig /flushdns`. |

### D. Processes, Services & Disk

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `Get-Process` | Display the list of processes | `Get-Process` | `Get-Process chrome` | Aliases: `ps`, `gps`. |
| `Stop-Process` | Terminate a process | `Stop-Process -Name [name] -Force` | `Stop-Process -Name chrome -Force` | Alias: `kill`. |
| `Start-Process` | Run a program | `Start-Process [program]` | `Start-Process notepad` | `-Verb RunAs` to run as administrator. |
| `Get-Service` | Display the list of services | `Get-Service` | `Get-Service \| Where-Object {$_.Status -eq "Running"}` | Alias: `gsv`. |
| `Start-Service` / `Stop-Service` | Start/stop services | `Start-Service [name]` | `Restart-Service wuauserv` | Requires admin. `Restart-Service` combines both. |
| `Get-PSDrive` | Display drives & locations | `Get-PSDrive` | `Get-PSDrive -PSProvider FileSystem` | Includes network & registry drives. |
| `Get-Volume` | Display volume/disk information | `Get-Volume` | `Get-Volume` | Capacity & free space per drive. |
| `Get-Disk` | Display physical disks | `Get-Disk` | `Get-Disk` | Information about attached physical disks. |

### E. Users, Environment & Utilities

| Command | Function / Short Description | Basic Syntax | Example Usage | Notes |
|---|---|---|---|---|
| `Get-LocalUser` | Display local user accounts | `Get-LocalUser` | `Get-LocalUser` | Modern Windows 10/11. |
| `Get-LocalGroup` | Display local groups | `Get-LocalGroup` | `Get-LocalGroup -Name Administrators` | List members: `Get-LocalGroupMember -Group "Administrators"`. |
| `$env:NAME` | Read an environment variable | `$env:NAME` | `$env:USERNAME` | Set permanently: `[Environment]::SetEnvironmentVariable("NAME","value","User")`. |
| `Get-ChildItem Env:` | Display all environment variables | `Get-ChildItem Env:` | `Get-ChildItem Env: \| Sort-Object Name` | Equivalent to `set` in CMD. |
| `Get-Help` | Help for cmdlets | `Get-Help [cmdlet]` | `Get-Help Get-Process -Full` | Alias: `help`. Try `Update-Help` for the full version. |
| `Get-Command` | Find available cmdlets/aliases | `Get-Command [word]` | `Get-Command *service*` | Lists every command matching the pattern. |
| `Get-History` | Command history of this session | `Get-History` | `Get-History \| Select-Object -Last 10` | The last 10 commands. |
| `Export-Csv` | Save output as CSV | `[objects] \| Export-Csv [path]` | `Get-Process \| Export-Csv processes.csv` | Can be opened in Excel. |
| `ConvertTo-Json` | Convert output to JSON | `[objects] \| ConvertTo-Json` | `Get-Service \| ConvertTo-Json` | Useful for API integration. |
| `Invoke-RestMethod` | Call a REST API | `Invoke-RestMethod -Uri [url]` | `Invoke-RestMethod -Uri https://api.github.com/users/rohmansyah23` | Alias: `irm`. Test/fetch data from APIs. |
| `Restart-Computer` / `Stop-Computer` | Restart / shut down the computer | `Restart-Computer -Force` | `Restart-Computer -Force` | Equivalent to `shutdown /r` but more PowerShell-native. |
| `Get-EventLog` / `Get-WinEvent` | Read Windows logs | `Get-WinEvent -LogName System -MaxEvents 20` | `Get-WinEvent -LogName Application -MaxEvents 10` | Log-based troubleshooting. |
| `Set-ExecutionPolicy` | Set the script execution policy | `Set-ExecutionPolicy RemoteSigned` | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` | Required before running `.ps1` files. |
| `Compress-Archive` / `Expand-Archive` | Zip / unzip files | `Compress-Archive [source] -DestinationPath [zip]` | `Compress-Archive *.log -DestinationPath logs.zip` | Built-in zip without extra applications. |

---

## Differences Between CMD and PowerShell

| Aspect | Command Prompt (CMD) | Windows PowerShell |
|---|---|---|
| **Paradigm** | Text-based command interpreter (DOS legacy) | Object-oriented shell & scripting language based on .NET |
| **Output** | Pure text (strings) | **Objects** (with properties & methods) |
| **Pipeline** | Passes text between commands | Passes **objects** between cmdlets (`\|`) |
| **Scripting support** | Simple batch (`.bat`/`.cmd`) | Full scripting (`.ps1`) — functions, classes, modules, error handling |
| **Variables** | `%NAME%` | `$NAME`, objects, arrays, hash tables |
| **Number of commands** | Limited (a few dozen) | Thousands of cmdlets + full access to .NET & WMI/CIM |
| **Enrichment features** | Minimal | Automatic formatting, `Export-Csv`, `ConvertTo-Json`, remoting (WinRM) |
| **Script security** | No restrictions | `ExecutionPolicy` restricts running `.ps1` |
| **Use cases** | Quick tasks & simple scripts, legacy batch compatibility | Modern administration, automation, large-scale system management |
| **Recommendation** | Still useful, but no longer evolving | **The standard for modern Windows administration** — all new learning material points here |

**In short:** CMD is a text typewriter — what you see is plain text. PowerShell is an object engine — every output can be filtered, sorted, and processed further, making it far more flexible for administration and automation.

---

## Learning Recommendations

The order of commands recommended for beginners, from the most basic to advanced:

### Stage 1 — Foundations (Days 1–3)
1. **Navigation:** `cd` / `dir` → `Set-Location` / `Get-ChildItem`
2. **Clearing the screen:** `cls` → `Clear-Host`
3. **Creating folders:** `md` → `New-Item -ItemType Directory`
4. **Viewing file contents:** `type` → `Get-Content`

### Stage 2 — File Management (Week 1)
5. **Copying:** `copy` / `xcopy` → `Copy-Item`
6. **Moving & renaming:** `move` / `ren` → `Move-Item` / `Rename-Item`
7. **Deleting:** `del` / `rd` → `Remove-Item -Recurse -Force`
8. **Searching files & text:** `findstr` / `where` → `Select-String` / `Where-Object`

### Stage 3 — System & Network (Week 2)
9. **System information:** `systeminfo` / `hostname` / `whoami` → `Get-ComputerInfo`
10. **Basic networking:** `ipconfig` / `ping` / `nslookup` → `Get-NetIPAddress` / `Test-Connection` / `Resolve-DnsName`
11. **Active connections:** `netstat -ano` → `Get-NetTCPConnection`

### Stage 4 — Administration (Weeks 3–4)
12. **Processes:** `tasklist` / `taskkill` → `Get-Process` / `Stop-Process`
13. **Services:** `net start` / `sc` → `Get-Service` / `Restart-Service`
14. **Environment variables:** `set` / `setx` → `$env:NAME`
15. **Troubleshooting:** `sfc /scannow` / `DISM` → `Get-WinEvent` / `Test-NetConnection`

### Stage 5 — Automation (Month 1+)
16. **Pipeline & filtering:** `Where-Object` / `Select-Object` / `Sort-Object`
17. **Your first script:** save commands to a `.ps1` file, set the `ExecutionPolicy`
18. **Output to file:** `Out-File` / `Export-Csv` / `ConvertTo-Json`
19. **API & integration:** `Invoke-RestMethod`
20. **Functions & modules:** create your own functions for repetitive tasks

> **Practical advice:** learn the commands in **both CMD and PowerShell at the same time** — because they complement each other, and many CMD commands are still used in modern scripts for compatibility. Start with PowerShell as your main target because it is the standard for Windows administration today.
