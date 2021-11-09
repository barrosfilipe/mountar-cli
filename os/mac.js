const shell = require("shelljs");
const shoutMessage = require("shout-message");
const shoutSuccess = require("shout-success");
const shoutError = require("shout-error");

/* Check for BREW installation */
async function checkForBrewInstallation() {
  return new Promise(resolve => {
    if (!shell.which("brew")) {
      if (
        shell.exec(
          '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
        ).code !== 0
      ) {
        shoutError("Brew installation failed!");
        process.exit(1);
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
  return new Promise(resolve => {
    if (shell.exec("brew install --cask osxfuse").code !== 0) {
      shoutError("FUSE for macOS installation failed!");
      process.exit(1);
    } else {
      shoutSuccess("FUSE for macOS installed!");
      resolve();
    }
  });
}

/* Check for SSHFS installation */
async function installSSHFS() {
  return new Promise(resolve => {
    if (!shell.which("sshfs")) {
      if (shell.exec("brew install sshfs").code !== 0) {
        shoutError("SSHFS for macOS installation failed!");
        process.exit(1);
      } else {
        shoutSuccess("SSHFS for macOS installed!");
        resolve();
      }
    } else {
      shoutSuccess("SSHFS for macOS already installed!");
      resolve();
    }
  });
}

/* Start Installation */
async function macInstall() {
  await checkForBrewInstallation();
  await installFUSE();
  await installSSHFS();
  shoutMessage("Run `mountar` to mount your SSH servers");
}

module.exports = macInstall;
