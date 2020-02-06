#!/usr/bin/env node

const process = require('process');
const http = require('patchbay-http');
const { createHandler } = require('remfs-server');

const args = process.argv
  .slice(2)
  .map(arg => arg.split('='))
  .reduce((args, [value, key]) => {
      args[value] = key;
      return args;
  }, {});

if (!args['--root']) {
  console.log("Usage: patchbay-remfs-server --root=ROOT_CHANNEL [--token=[AUTH_TOKEN]");
  process.exit(1);
}

const rootChannel = args['--root'];
const rootPath = '/req' + rootChannel;

(async () => {
  const remfsHandler = await createHandler({ rootPath, dir: args['--dir'] });
  const httpServer = http.createServer(remfsHandler);
  httpServer.setPatchbayServer('https://patchbay.pub');
  //httpServer.setPatchbayServer('http://localhost:9001');
  httpServer.setPatchbayChannel(rootChannel);
  httpServer.setNumWorkers(4);

  if (args['--token']) {
    httpServer.setAuthToken(args['--token']);
  }

  httpServer.listen();

})();
