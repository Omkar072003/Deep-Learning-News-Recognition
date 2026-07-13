// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"MAtcu":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "5687d663397c74d2";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"agb61":[function(require,module,exports,__globalThis) {
var _analysisJs = require("./modules/analysis.js");
// === Dark Mode Toggle ===
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (themeToggle) {
    themeToggle.addEventListener('click', ()=>{
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        themeToggle.textContent = isDark ? "\u2600\uFE0F Light Mode" : "\uD83C\uDF19 Dark Mode";
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = "\u2600\uFE0F Light Mode";
    }
}
// === File Upload + Analysis ===
const fileInput = document.getElementById('fileInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const fileInfo = document.getElementById('fileInfo');
// Show file name when selected
if (fileInput) fileInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    if (file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        const fileType = file.type.startsWith('video/') ? 'Video' : 'Image';
        if (fileInfo) {
            fileInfo.textContent = `Selected: ${file.name} (${fileSize} MB) - ${fileType}`;
            fileInfo.classList.add('text-green-600', 'font-medium');
        }
        showNotification(`\u{2705} Selected: ${file.name}`, 'success');
    }
});
// Analyze button click handler
if (analyzeBtn) analyzeBtn.addEventListener('click', async ()=>{
    const file = fileInput?.files[0];
    if (!file) {
        showNotification("\u26A0\uFE0F Please select a file first", 'error');
        return;
    }
    // Determine file type
    const fileType = file.type.startsWith('video/') ? 'video' : 'image';
    try {
        // Disable button and show loading
        analyzeBtn.disabled = true;
        const originalText = analyzeBtn.innerHTML;
        analyzeBtn.innerHTML = `
                <div class="flex items-center justify-center">
                    <div class="spinner mr-3" style="width: 20px; height: 20px;"></div>
                    Analyzing with AI...
                </div>
            `;
        // Show results section with loading
        if (resultsSection) {
            resultsSection.style.display = 'block';
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) resultsContainer.innerHTML = `
                        <div class="text-center py-12">
                            <div class="spinner mb-4"></div>
                            <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                                Processing with ${fileType === 'video' ? 'RNN/LSTM' : 'CNN'} model...
                            </p>
                            <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
                                This may take a few moments
                            </p>
                        </div>
                    `;
        }
        // Call analysis function
        console.log("\uD83D\uDD0D Starting analysis...");
        await (0, _analysisJs.handleAnalyze)(file, fileType);
        showNotification("\u2705 Analysis completed successfully!", 'success');
        // Reset button
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = originalText;
    } catch (error) {
        console.error("\u274C Analysis error:", error);
        showNotification(`\u{274C} Analysis failed: ${error.message}`, 'error');
        // Show error in results if section exists
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer && resultsSection) {
            resultsSection.style.display = 'block';
            resultsContainer.innerHTML = `
                    <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">\u{274C} Analysis Failed</h3>
                        <p class="text-red-700 dark:text-red-300 mb-4">${error.message}</p>
                        <p class="text-sm text-red-600 dark:text-red-400 mb-4">
                            Make sure the backend server is running on http://localhost:3000
                        </p>
                        <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                            Try Again
                        </button>
                    </div>
                `;
        }
        // Reset button
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = "\uD83D\uDD0D Analyze Content with AI";
        }
    }
});
// Notification helper
function showNotification(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    const notification = document.createElement('div');
    notification.className = `notification ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg`;
    notification.textContent = message;
    document.body.appendChild(notification);
    // Auto remove after 3 seconds
    setTimeout(()=>{
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(()=>{
            if (notification.parentNode) notification.remove();
        }, 300);
    }, 3000);
}
// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
// Initialize
console.log("\uD83D\uDE80 Deep Learning Content Recognition System initialized");
console.log("\uD83D\uDCE1 Backend API:", 'http://localhost:3000/api/v1');
// Test backend connection on page load
fetch('http://localhost:3000/api/v1/health').then((response)=>response.json()).then((data)=>{
    console.log("\u2705 Backend connected:", data);
    showNotification("\u2705 Connected to backend server", 'success');
}).catch((error)=>{
    console.error("\u274C Backend connection failed:", error);
    showNotification("\u26A0\uFE0F Backend server not responding. Start the backend with: npm start", 'warning');
});

},{"./modules/analysis.js":"eogH4"}],"eogH4":[function(require,module,exports,__globalThis) {
// analysis.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleAnalyze", ()=>handleAnalyze);
// Helper to format analysis results for display
parcelHelpers.export(exports, "formatAnalysisResults", ()=>formatAnalysisResults);
var _analysisServiceJs = require("../services/analysisService.js");
var _resultDisplayJs = require("../components/resultDisplay.js");
async function handleAnalyze(file, fileType = 'image') {
    if (!file) {
        alert("Please select a file to analyze.");
        return;
    }
    const resultsSection = document.getElementById('resultsSection');
    let resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) resultsContainer = document.getElementById('results');
    try {
        // Show loading state
        if (resultsSection) resultsSection.style.display = 'block';
        if (resultsContainer) resultsContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="spinner mb-4"></div>
                    <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
                        Analyzing with ${fileType === 'video' ? 'RNN/LSTM' : 'CNN'} model...
                    </p>
                    <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
                        This may take a few moments
                    </p>
                </div>
            `;
        // Call backend analyze service
        const result = await (0, _analysisServiceJs.analyzeContent)(file, fileType);
        console.log("\u2705 Analysis complete:", result);
        // Display results using resultDisplay module
        (0, _resultDisplayJs.displayResult)(result);
    } catch (error) {
        console.error("\u274C Error analyzing file:", error);
        if (resultsContainer) resultsContainer.innerHTML = `
                <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                    <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">\u{274C} Analysis Failed</h3>
                    <p class="text-red-700 dark:text-red-300 mb-4">${error.message}</p>
                    <button onclick="location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Try Again
                    </button>
                </div>
            `;
        throw error;
    }
}
function formatAnalysisResults(result) {
    if (!result) return null;
    // Handle different result structures
    const data = result.result || result;
    return {
        dominantObjects: data.detectedObjects || data.objects || data.labels || [],
        sceneType: data.sceneType || data.scene || data.category || 'Unknown',
        dominantColors: data.dominantColors || data.colors || [],
        qualityScore: data.qualityScore || data.quality || data.confidence || 'N/A',
        processedAt: new Date(data.timestamp || Date.now()).toLocaleString(),
        modelVersion: data.modelVersion || 'v1.0',
        confidence: data.overallConfidence || data.confidence || 'N/A',
        predictions: data.predictions || [],
        metadata: data.imageMetadata || data.videoMetadata || data.metadata || {}
    };
}

},{"../services/analysisService.js":"3kw4N","../components/resultDisplay.js":"3Hnum","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3kw4N":[function(require,module,exports,__globalThis) {
// analysisService.js - frontend wrapper to call backend analysis API
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "analyzeContent", ()=>analyzeContent);
var _apiJs = require("../config/api.js");
async function analyzeContent(file, fileType = 'image') {
    if (!file) throw new Error("File input is required for analyzeContent");
    const formData = new FormData();
    formData.append("file", file);
    // Determine endpoint based on file type
    const endpoint = fileType === 'video' ? (0, _apiJs.API_ENDPOINTS).analyzeVideo : (0, _apiJs.API_ENDPOINTS).analyzeImage;
    console.log("\uD83D\uDD0D Analyzing:", file.name, 'Type:', fileType);
    console.log("\uD83D\uDCE1 Endpoint:", endpoint);
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            credentials: 'omit',
            mode: 'cors' // Enable CORS
        });
        console.log("\uD83D\uDCE5 Response status:", response.status);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("\u274C Server error:", errorText);
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch  {
                errorData = {
                    error: errorText
                };
            }
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("\u2705 Analysis result:", result);
        return result;
    } catch (error) {
        console.error("\u274C Error in analyzeContent service:", error);
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch')) throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:3000');
        throw error;
    }
}

},{"../config/api.js":"g6Hir","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"g6Hir":[function(require,module,exports,__globalThis) {
// API Configuration
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_ENDPOINTS", ()=>API_ENDPOINTS);
const API_BASE_URL = 'http://localhost:3000/api/v1';
const API_ENDPOINTS = {
    analyzeImage: `${API_BASE_URL}/analyze/image`,
    analyzeVideo: `${API_BASE_URL}/analyze/video`,
    upload: `${API_BASE_URL}/upload`,
    results: `${API_BASE_URL}/results`,
    health: `${API_BASE_URL}/health`
};
exports.default = API_BASE_URL;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3Hnum":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Display analysis results in UI
 */ parcelHelpers.export(exports, "displayResult", ()=>displayResult);
var _analysisJs = require("../modules/analysis.js");
function displayResult(data) {
    // Try multiple possible container IDs
    let resultsContainer = document.getElementById('results-container');
    if (!resultsContainer) resultsContainer = document.getElementById('results');
    if (!resultsContainer) {
        console.error("\u274C Results container not found. Creating one...");
        // Create results section if it doesn't exist
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'results-container';
            resultsSection.appendChild(resultsContainer);
            resultsSection.style.display = 'block';
        } else {
            console.error("\u274C No results section found in HTML");
            alert('Error: Results display area not found');
            return;
        }
    }
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection) resultsSection.style.display = 'block';
    // Check if data has success flag
    if (!data || !data.success) {
        resultsContainer.innerHTML = `
            <div class="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
                <h3 class="text-xl font-bold text-red-800 dark:text-red-200 mb-2">\u{274C} Analysis Failed</h3>
                <p class="text-red-700 dark:text-red-300">${data?.error || 'No results returned from server'}</p>
            </div>
        `;
        return;
    }
    // Handle nested result structure
    let result = data;
    if (data.result && data.result.result) {
        console.log("\uD83D\uDCE6 Unwrapping nested result structure");
        result = data.result.result;
    } else if (data.result) {
        console.log("\uD83D\uDCE6 Using result object");
        result = data.result;
    }
    // Keep the filename and originalName from the top level if they exist
    if (data.filename) result.filename = data.filename;
    if (data.originalName) result.originalName = data.originalName;
    console.log("\u2705 Final result object:", result);
    // Format results
    const formatted = (0, _analysisJs.formatAnalysisResults)(result);
    if (!formatted) {
        resultsContainer.innerHTML = `
            <div class="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg">
                <h3 class="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">\u{26A0}\u{FE0F} Invalid Results</h3>
                <p class="text-yellow-700 dark:text-yellow-300">Unable to parse analysis results</p>
            </div>
        `;
        return;
    }
    // Determine badge color based on category
    const categoryColors = {
        'politics': 'bg-blue-500',
        'disaster': 'bg-red-500',
        'sports': 'bg-green-500',
        'social': 'bg-orange-500',
        'military': 'bg-gray-500',
        'entertainment': 'bg-purple-500',
        'technology': 'bg-cyan-500',
        'business': 'bg-indigo-500',
        'health': 'bg-pink-500',
        'nature': 'bg-emerald-500',
        'education': 'bg-yellow-500',
        'general': 'bg-gray-400'
    };
    const badgeColor = categoryColors[result.newsCategory] || 'bg-gray-400';
    // Build comprehensive results HTML
    resultsContainer.innerHTML = `
        <div class="space-y-6 fade-in">
            <!-- Header with Category -->
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-2xl font-bold mb-2">Analysis Complete</h3>
                    <span class="${badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold">
                        ${result.newsCategory?.toUpperCase() || 'GENERAL'}
                    </span>
                </div>
                <div class="text-right">
                    <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">
                        ${result.overallConfidence || 'N/A'}
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Confidence Score</div>
                </div>
            </div>

            <!-- Description Section (NEW) -->
            <div class="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 p-6 rounded-lg">
                <h4 class="font-bold text-lg mb-3 flex items-center">
                    <span class="text-2xl mr-2">\u{1F4DD}</span>
                    Content Description
                </h4>
                <p class="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                    ${result.description || 'No description available'}
                </p>
                <div class="mt-3 text-sm">
                    <span class="text-gray-600 dark:text-gray-400">Confidence Range:</span>
                    <span class="ml-2 font-bold text-blue-600 dark:text-blue-400">
                        ${result.confidenceRange || 'N/A'}
                    </span>
                </div>
            </div>

            <!-- Category Predictions (NEW) -->
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 class="font-bold text-lg mb-4 flex items-center">
                    <span class="text-2xl mr-2">\u{1F4CA}</span>
                    Multi-Category Analysis (All Categories with Confidence Range)
                </h4>
                <div class="space-y-3">
                    ${result.categoryPredictions ? Object.entries(result.categoryPredictions).sort((a, b)=>b[1] - a[1]).map(([category, score])=>{
        const percentage = (score * 100).toFixed(1);
        const barWidth = percentage;
        const isTop = score === Math.max(...Object.values(result.categoryPredictions));
        return `
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-sm">
                                            <span class="font-medium ${isTop ? 'text-blue-600 dark:text-blue-400 text-base' : ''}">
                                                ${isTop ? "\u2B50 " : ''}${category.toUpperCase()}
                                            </span>
                                            <span class="font-semibold ${isTop ? 'text-blue-600 dark:text-blue-400 text-base' : ''}">
                                                ${percentage}%
                                            </span>
                                        </div>
                                        <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                            <div class="bg-gradient-to-r ${isTop ? 'from-blue-500 to-blue-600' : 'from-gray-400 to-gray-500'} h-3 rounded-full transition-all duration-500" 
                                                 style="width: ${barWidth}%">
                                            </div>
                                        </div>
                                    </div>
                                `;
    }).join('') : '<p class="text-gray-500">No category predictions available</p>'}
                </div>
            </div>

            <!-- Main Results Grid -->
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Detected Objects -->
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h4 class="font-bold text-lg mb-4 flex items-center">
                        <span class="text-2xl mr-2">\u{1F50D}</span>
                        ${result.type === 'video' ? 'Detected Events' : 'Detected Objects'}
                    </h4>
                    <div class="space-y-2">
                        ${result.detectedObjects && result.detectedObjects.length > 0 ? result.detectedObjects.map((obj, idx)=>`
                                <div class="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                                    <span class="font-medium">${obj}</span>
                                    <span class="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                                        ${result.predictions?.[idx]?.confidence ? (result.predictions[idx].confidence * 100).toFixed(1) + '%' : 'N/A'}
                                    </span>
                                </div>
                            `).join('') : result.detectedEvents && result.detectedEvents.length > 0 ? result.detectedEvents.map((evt, idx)=>`
                                <div class="flex justify-between items-center bg-white dark:bg-gray-600 p-3 rounded-lg">
                                    <span class="font-medium">${evt}</span>
                                    <span class="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                                        ${result.predictions?.[idx]?.confidence ? (result.predictions[idx].confidence * 100).toFixed(1) + '%' : 'N/A'}
                                    </span>
                                </div>
                            `).join('') : '<p class="text-gray-500">No objects/events detected</p>'}
                    </div>
                </div>

                <!-- Visual Features & Metadata -->
                <div class="space-y-4">
                    <!-- Scene Information -->
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">\u{1F3AC}</span>
                            Scene Analysis
                        </h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Type:</span>
                                <span class="font-semibold">${result.sceneType || result.type || 'Unknown'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Quality:</span>
                                <span class="font-semibold">${result.qualityScore || 'N/A'}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-400">Model:</span>
                                <span class="font-semibold">${result.modelType || 'CNN'}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Dominant Colors (for images) -->
                    ${result.dominantColors ? `
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">\u{1F3A8}</span>
                            Dominant Colors
                        </h4>
                        <div class="flex gap-3">
                            ${formatted.dominantColors && formatted.dominantColors.length > 0 ? formatted.dominantColors.map((color)=>`
                                    <div class="flex-1">
                                        <div class="w-full h-16 rounded-lg shadow-md" style="background: ${color}"></div>
                                        <p class="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">${color}</p>
                                    </div>
                                `).join('') : '<p class="text-gray-500">Not analyzed</p>'}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Activity Sequence (for videos) -->
                    ${result.activitySequence ? `
                    <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <h4 class="font-bold text-lg mb-3 flex items-center">
                            <span class="text-2xl mr-2">\u{23F1}\u{FE0F}</span>
                            Activity Sequence
                        </h4>
                        <div class="space-y-2">
                            ${result.activitySequence.map((activity, idx)=>`
                                <div class="flex items-center bg-white dark:bg-gray-600 p-2 rounded">
                                    <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">${idx + 1}</span>
                                    <span class="font-medium">${activity}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- News Insights -->
            ${result.newsInsights || result.videoInsights ? `
                <div class="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                    <h4 class="font-bold text-lg mb-4 flex items-center">
                        <span class="text-2xl mr-2">\u{1F4F0}</span>
                        ${result.type === 'video' ? 'Video' : 'News'} Insights
                    </h4>
                    <div class="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">Relevance:</span>
                            <span class="ml-2 font-semibold">${result.newsInsights?.relevance || result.videoInsights?.category || 'N/A'}</span>
                        </div>
                        <div>
                            <span class="text-gray-600 dark:text-gray-400">Content Filter:</span>
                            <span class="ml-2 font-semibold">${result.newsInsights?.contentFilter || result.videoInsights?.contentModeration || 'N/A'}</span>
                        </div>
                        ${result.newsInsights?.urgency || result.videoInsights?.urgency ? `
                            <div>
                                <span class="text-gray-600 dark:text-gray-400">Urgency:</span>
                                <span class="ml-2 font-semibold uppercase">${result.newsInsights?.urgency || result.videoInsights?.urgency}</span>
                            </div>
                        ` : ''}
                    </div>
                    ${result.newsInsights?.suggestedTags?.length > 0 ? `
                        <div class="mt-4">
                            <span class="text-gray-600 dark:text-gray-400 text-sm">Suggested Tags:</span>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${result.newsInsights.suggestedTags.map((tag)=>`<span class="bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            <!-- Metadata Footer -->
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                <div class="flex flex-wrap justify-between gap-4">
                    <div><strong>Model Version:</strong> ${result.modelVersion || 'v1.0'}</div>
                    <div><strong>Processing Time:</strong> ${result.processingTimeMs || 0}ms</div>
                    <div><strong>Analyzed:</strong> ${new Date(result.timestamp).toLocaleString()}</div>
                </div>
                ${result.note ? `
                    <div class="mt-2 text-yellow-600 dark:text-yellow-400">
                        \u{2139}\u{FE0F} ${result.note}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    // Scroll to results
    resultsContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

},{"../modules/analysis.js":"eogH4","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["MAtcu","agb61"], "agb61", "parcelRequirec9ce", {})

//# sourceMappingURL=frontend.397c74d2.js.map
