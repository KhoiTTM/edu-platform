const { execSync } = require('child_process');

try {
    const script = `Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*discord-chat-sync*' } | Stop-Process -Force`;
    // We can write a ps1 file and execute it to avoid quoting issues!
    const fs = require('fs');
    fs.writeFileSync('kill.ps1', script);
    
    console.log("Running powershell script...");
    const out = execSync('powershell -NoProfile -ExecutionPolicy Bypass -File kill.ps1');
    console.log("Done:", out.toString());
} catch(e) {
    console.error(e.toString());
}
