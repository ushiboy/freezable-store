import http from 'http';
import url from 'url';
import createFreezableStore from '@ushiboy/freezable-store';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import Html from './presentation/component/Html.js';
import Application from './presentation/component/Application.js';
import AppContext from './AppContext.js';
import LocalCounterRepository from './infrastructure/LocalCounterRepository.js';
import Counter from './domain/Counter.js';

function responseJson(res, body, statusCode) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.write(body);
  res.end();
}

export function createServer() {
  const server = http.createServer((req, res) => {
    const { method } = req;
    const { pathname } = url.parse(req.url);
    const counterRepository = new LocalCounterRepository();
    const counter = new Counter(counterRepository);
    if (method === 'GET' && pathname === '/') {
      counter.load().then(() => {
        const count = counter.count;
        const store = createFreezableStore({ count });
        const appContext = AppContext(store, counterRepository);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<!doctype html>');
        renderToNodeStream(
          <Html count={count}>
            <Application appContext={appContext} store={store} />
          </Html>
        ).pipe(res);
      });
    } else if (method === 'GET' && pathname === '/api/count') {
      counter.load().then(() => {
        const count = counter.count;
        responseJson(res, `{"count":${count}}`, 200);
      });
    } else if (method === 'POST' && pathname === '/api/vote') {
      counter.increment().then(() => {
        const count = counter.count;
        responseJson(res, `{"count":${count}}`, 201);
      });
    } else if (method === 'DELETE' && pathname === '/api/vote') {
      counter.decrement().then(() => {
        const count = counter.count;
        responseJson(res, `{"count":${count}}`, 200);
      });
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.write(`Not Found.`);
      res.end();
    }

  });
  return server;
}
