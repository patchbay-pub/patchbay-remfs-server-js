#!/usr/bin/env node

const process = require('process');
const http = require('patchbay-http');
const { createHandler } = require('remfs-server');

if (process.argv.length < 3) {
  console.log("Usage: patchbay-remfs-server ROOT_CHANNEL [AUTH_TOKEN]");
  process.exit(1);
}

const rootChannel = process.argv[2];
const rootPath = '/req' + rootChannel;

(async () => {
  const remfsHandler = await createHandler({ rootPath });
  const httpServer = http.createServer(remfsHandler);
  httpServer.setPatchbayServer('https://patchbay.pub');
  //httpServer.setPatchbayServer('http://localhost:9001');
  httpServer.setPatchbayChannel(rootChannel);
  httpServer.setNumWorkers(4);

  if (process.argv.length === 4) {
    httpServer.setAuthToken(process.argv[3]);
  }

  httpServer.listen();

})();
