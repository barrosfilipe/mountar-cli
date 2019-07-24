#!/usr/bin/env node
const shell = require("shelljs");
const shoutMessage = require("shout-message");
const shoutSuccess = require("shout-success");
const shoutError = require("shout-error");
const homeDir = require("os").homedir();

const user = process.argv[2],
  host = process.argv[3],
  path = process.argv[4],
  port = process.argv[5] || 22;

if (!user || !host || !path) {
  shoutError("Missing arguments!");
  shoutMessage("Run `mountar [User] [Host] [Path] [Port (Default: 22)]`");
  process.exit(1);
}

if (!shell.test("-d", `${homeDir}/${host}`)) {
  shell.mkdir(`${homeDir}/${host}`);
}

shell.exec(`umount ${homeDir}/${host} 2> /dev/null`);

shell.exec(
  `sshfs ${user}@${host}:${path} -p ${port} ${homeDir}/${host} -ovolname=${host}`
);

shoutSuccess(`Mounted on ${homeDir}/${host}`);

shell.exec(`open ${homeDir}/${host}`);
