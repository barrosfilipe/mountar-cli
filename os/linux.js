const shell = require("shelljs");
const shoutMessage = require("shout-message");
const shoutSuccess = require("shout-success");
const shoutError = require("shout-error");

/* Check for RHEL or DEB distros */
async function checkForLinuxDistro() {
  return new Promise(resolve => {
    const packageControl = shell.exec(
      `[ ! -f /etc/redhat-release ] || echo -e "yum" && [ ! -f /etc/lsb-release ] || echo -e "apt-get"`,
      { silent: true }
    );

    if (!packageControl.match(/yum|apt-get/g)) {
      shoutError("RHEL or DEB distros only!");
      process.exit(1);
    }

    resolve(packageControl);
  });
}

/* Check for SSHFS installation */
async function installSSHFS(packageControl) {
  return new Promise(resolve => {
    if (!shell.which("sshfs")) {
      if (shell.exec(`sudo ${packageControl} install sshfs -y`).code !== 0) {
        shoutError("SSHFS for Linux installation failed!");
        process.exit(1);
      } else {
        shoutSuccess("SSHFS for Linux installed!");
        resolve();
      }
    } else {
      shoutSuccess("SSHFS for Linux already installed!");
      resolve();
    }
  });
}

async function linuxInstall() {
  const packageControl = await checkForLinuxDistro();
  await installSSHFS(packageControl);
  shoutMessage("Run `mountar` to mount your SSH servers");
}

module.exports = linuxInstall;
