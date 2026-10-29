#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
File CRUD CLI
Usage:
  node file-crud-cli.js create <filePath> <content>
  node file-crud-cli.js read <filePath>
  node file-crud-cli.js update <filePath> <newContent>
  node file-crud-cli.js delete <filePath>
  node file-crud-cli.js --help

Examples:
  node file-crud-cli.js create sample.txt "Hello world"
  node file-crud-cli.js read sample.txt
  node file-crud-cli.js update sample.txt "Updated content"
  node file-crud-cli.js delete sample.txt
`);
}

function createFile(filePath, content) {
  const fullPath = path.resolve(filePath);

  if (fs.existsSync(fullPath)) {
    console.log(`Error: File already exists: ${fullPath}`);
    return;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`File created: ${fullPath}`);
}

function readFile(filePath) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Error: File not found: ${fullPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(content);
}

function updateFile(filePath, newContent) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Error: File not found: ${fullPath}`);
    return;
  }

  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`File updated: ${fullPath}`);
}

function deleteFile(filePath) {
  const fullPath = path.resolve(filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Error: File not found: ${fullPath}`);
    return;
  }

  fs.unlinkSync(fullPath);
  console.log(`File deleted: ${fullPath}`);
}

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

switch (command) {
  case 'create':
    if (args.length < 3) {
      console.log('Error: create requires <filePath> and <content>');
      printHelp();
      return;
    }
    createFile(args[1], args.slice(2).join(' '));
    break;

  case 'read':
    if (args.length < 2) {
      console.log('Error: read requires <filePath>');
      printHelp();
      return;
    }
    readFile(args[1]);
    break;

  case 'update':
    if (args.length < 3) {
      console.log('Error: update requires <filePath> and <newContent>');
      printHelp();
      return;
    }
    updateFile(args[1], args.slice(2).join(' '));
    break;

  case 'delete':
    if (args.length < 2) {
      console.log('Error: delete requires <filePath>');
      printHelp();
      return;
    }
    deleteFile(args[1]);
    break;

  default:
    console.log(`Unknown command: ${command}`);
    printHelp();
    break;
}
