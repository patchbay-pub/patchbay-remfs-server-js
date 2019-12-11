#!/usr/bin/env node

const process = require('process');
const http = require('patchbay-http');
const { createHandler } = require('webfs-server');

if (process.argv.length < 3) {
  console.log("Usage: patchbay-webfs-server ROOT_CHANNEL");
  process.exit(1);
}

const rootChannel = process.argv[2];
const rootPath = '/req' + rootChannel;

const webfsHandler = createHandler({ rootPath });
const httpServer = http.createServer(webfsHandler);
httpServer.setPatchbayServer('https://patchbay.pub');
httpServer.setPatchbayChannel(rootChannel);
httpServer.listen();
