const shoutError = require("shout-error");

function windowsInstall() {
  shoutError("Mountar is not supporting Windows just yet!");
  process.exit(1);
}
module.exports = windowsInstall;
