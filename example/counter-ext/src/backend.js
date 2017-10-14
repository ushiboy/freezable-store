#!./node_modules/.bin/babel-node
import { createServer } from './server';

const port = Number(process.env.PORT || '8081');
createServer().listen(port);
