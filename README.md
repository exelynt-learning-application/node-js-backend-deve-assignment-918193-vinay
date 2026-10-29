# node-js-backend-deve-assignment-918193-vinay

Module & Week Assignments - This repository contains module-wise and week-wise assignment submissions.

## File CRUD CLI

This project includes a Node.js command-line application that can create, read, update, and delete files.

### Usage

```bash
node file-crud-cli.js create sample.txt "Hello world"
node file-crud-cli.js read sample.txt
node file-crud-cli.js update sample.txt "Updated content"
node file-crud-cli.js delete sample.txt
node file-crud-cli.js --help
```

### Notes

- The CLI resolves file paths relative to the current working directory.
- Parent folders are created automatically when creating a new file.
- Invalid commands or missing files return an error code.
