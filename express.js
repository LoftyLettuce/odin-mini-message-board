import http from "node:http";
import { match } from "path-to-regexp";

function ResObj(url, method, handler) {
  if (!new.target) {
    return "Please use new operator";
  }
  this.url = url;
  this.method = method;
  this.handler = handler;
}
const express = function () {
  const apis = [];
  function requestHandler(req, res) {
    const filteredApis = apis.filter(
      ({ url, method }) =>
        url(req.url) && (req.method === method || method === "MIDDLE"),
    );
    if (filteredApis.length === 0) {
      res.end("none");
      return;
    }
    let i = 0;
    function next() {
      i++;
      const newReq = {
        ...req,
        url: req.url.slice(filteredApis[i].url(req.url).path.length),
      };
      filteredApis[i].handler(newReq, res, next);
    }
    const newReq = {
      ...req,
      url: req.url.slice(filteredApis[i].url(req.url).path.length),
    };
    filteredApis[i].handler(newReq, res, next);
  }
  function get(url, handler) {
    apis.push(new ResObj(match(url), "GET", handler));
  }
  function post(url, handler) {
    apis.push(new ResObj(match(url), "POST", handler));
  }
  function use(url, handler) {
    apis.push(new ResObj(match(url, { end: false }), "MIDDLE", handler));
  }
  function listen() {
    const server = http.createServer(requestHandler);
    server.listen.apply(server, arguments);
  }

  return { get, use, post, listen };
};

export default express;
