const macInstall = require("./os/mac");
const linuxInstall = require("./os/linux");
const windowsInstall = require("./os/windows");

function checkForSystemSupport() {
  switch (process.platform) {
    case "darwin":
      macInstall();
      break;
    case "linux":
      linuxInstall();
      break;
    case "win32":
      windowsInstall();
      break;
  }
}

checkForSystemSupport();
