const shell = require("shelljs");
const shoutMessage = require("shout-message");
const shoutSuccess = require("shout-success");
const shoutError = require("shout-error");

/* Check for operating system support */
if (process.platform !== "darwin") {
  shoutError("Moutar is only supporting macOS systems");
  process.exit(1);
}

/* Check for BREW installation */
async function checkForBrewInstallation() {
  return new Promise((resolve, reject) => {
    if (!shell.which("brew")) {
      if (
        shell.exec(
          '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
        ).code !== 0
      ) {
        shoutError("Brew installation failed!");
        process.exit(1);
        reject();
      } else {
        shoutSuccess("Brew installed!");
        resolve();
      }
    } else {
      resolve();
    }
  });
}

/* Check for Mac FUSE installation */
async function installFUSE() {
  return new Promise((resolve, reject) => {
    if (shell.exec("brew cask install osxfuse").code !== 0) {
      shoutError("FUSE for macOS installation failed!");
      process.exit(1);
      reject();
    } else {
      shoutSuccess("FUSE for macOS installed!");
      resolve();
    }
  });
}

/* Check for SSHFS installation */
async function installSSHFS() {
  return new Promise((resolve, reject) => {
    if (shell.exec("brew install sshfs").code !== 0) {
      shoutError("SSHFS for macOS installation failed!");
      process.exit(1);
      reject();
    } else {
      shoutSuccess("SSHFS for macOS installed!");
      resolve();
    }
  });
}

/* Run */
(async () => {
  await checkForBrewInstallation();
  await installFUSE();
  await installSSHFS();
  shoutMessage("Run `mountar` to mount your SSH servers");
})();
