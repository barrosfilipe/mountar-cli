#!/usr/bin/env node
"use strict";

const shell = require("shelljs");
const shoutMessage = require("shout-message");
const shoutSuccess = require("shout-success");
const shoutError = require("shout-error");
const homeDir = require("os").homedir();

/* Assign arguments */
const user = process.argv[2],
  host = process.argv[3],
  dir = process.argv[4],
  port = process.argv[5] || 22;

/* Check for arguments and print "help" */
if (!user || !host || !dir) {
  shoutError("Missing arguments!");
  shoutMessage("Usage: mountar <user> <host> <dir> <port (Default: 22)>");
  process.exit(1);
}

/* Check if folder already exists */
if (!shell.test("-d", `${homeDir}/${host}`)) {
  shell.mkdir(`${homeDir}/${host}`);
} else {
  shell.exec(`umount ${homeDir}/${host} 2> /dev/null`);
}

/* Check if SSHFS mounted successfully */
function appleVolName() {
  if (process.platform === "darwin") {
    return `-ovolname=${host}`;
  } else {
    return "";
  }
}

if (
  shell.exec(
    `sshfs ${user}@${host}:${dir} -p ${port} ${homeDir}/${host} ${appleVolName()} 2> /dev/null`
  ).code !== 0
) {
  shoutError("Connection failed!");
  shoutMessage("Usage: mountar <user> <host> <dir> <port (Default: 22)>");
  process.exit(1);
} else {
  shoutSuccess(`Mounted on ${homeDir}/${host}`);
  shell.exec(`open ${homeDir}/${host}`);
}
