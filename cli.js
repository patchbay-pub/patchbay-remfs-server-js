#!/usr/bin/env node

const process = require('process');
const http = require('patchbay-http');
const { createHandler } = require('remfs-server');

if (process.argv.length < 3) {
  console.log("Usage: patchbay-remfs-server ROOT_CHANNEL");
  process.exit(1);
}

const rootChannel = process.argv[2];
const rootPath = '/req' + rootChannel;

const remfsHandler = createHandler({ rootPath });
const httpServer = http.createServer(remfsHandler);
httpServer.setPatchbayServer('https://patchbay.pub');
httpServer.setPatchbayChannel(rootChannel);
httpServer.setNumWorkers(4);
httpServer.listen();
