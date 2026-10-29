#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const usage = `File CRUD CLI

Usage:
  node file-crud-cli.js create <filePath> <content>
  node file-crud-cli.js read <filePath>
  node file-crud-cli.js update <filePath> <newContent>
  node file-crud-cli.js delete <filePath>
  node file-crud-cli.js --help

Examples:
  node file-crud-cli.js create notes.txt "Hello from CLI"
  node file-crud-cli.js read notes.txt
  node file-crud-cli.js update notes.txt "Updated content"
  node file-crud-cli.js delete notes.txt
`;

function printHelp() {
  console.log(usage);
}

function ensureParentDirectory(targetPath) {
  const parentDir = path.dirname(targetPath);
  if (parentDir && parentDir !== '.' && !fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
}

function createFile(filePath, content) {
  const fullPath = path.resolve(filePath);

  if (fs.existsSync(fullPath)) {
    console.error(`Error: File already exists: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  ensureParentDirectory(fullPath);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`File created: ${fullPath}`);
}

function readFile(filePath) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Error: File not found: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  if (fs.statSync(fullPath).isDirectory()) {
    console.error(`Error: Path is a directory, not a file: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(content);
}

function updateFile(filePath, newContent) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Error: File not found: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  if (fs.statSync(fullPath).isDirectory()) {
    console.error(`Error: Path is a directory, not a file: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`File updated: ${fullPath}`);
}

function deleteFile(filePath) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Error: File not found: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  if (fs.statSync(fullPath).isDirectory()) {
    console.error(`Error: Cannot delete a directory with this command: ${fullPath}`);
    process.exitCode = 1;
    return;
  }

  fs.unlinkSync(fullPath);
  console.log(`File deleted: ${fullPath}`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  switch (command) {
    case 'create': {
      if (args.length < 3) {
        console.error('Error: create requires <filePath> and <content>');
        printHelp();
        process.exitCode = 1;
        return;
      }
      createFile(args[1], args.slice(2).join(' '));
      return;
    }

    case 'read': {
      if (args.length < 2) {
        console.error('Error: read requires <filePath>');
        printHelp();
        process.exitCode = 1;
        return;
      }
      readFile(args[1]);
      return;
    }

    case 'update': {
      if (args.length < 3) {
        console.error('Error: update requires <filePath> and <newContent>');
        printHelp();
        process.exitCode = 1;
        return;
      }
      updateFile(args[1], args.slice(2).join(' '));
      return;
    }

    case 'delete': {
      if (args.length < 2) {
        console.error('Error: delete requires <filePath>');
        printHelp();
        process.exitCode = 1;
        return;
      }
      deleteFile(args[1]);
      return;
    }

    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exitCode = 1;
      return;
  }
}

main();
