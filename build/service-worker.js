/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-4dbac9ba'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "0.built.js",
    "revision": "85ed150a9778596df34a56945c9d0b81"
  }, {
    "url": "2ebc922c8bae779741762bf35e2f3938.eot",
    "revision": "23a514768065271261c3d72f5e38413d"
  }, {
    "url": "54f48b5093f40faa535569b481e9f9ea.woff",
    "revision": "b987f93076a435068ea61d4acf9f4362"
  }, {
    "url": "608b58104be004a57320bb9d048a9ae9.ttf",
    "revision": "cd326ae2209ab1239f3f20cd22839314"
  }, {
    "url": "6fbd4180e26a789ddae7200e2fc8f876.svg",
    "revision": "dd8693e9ce4c166ef8479aa2198b6dcf"
  }, {
    "url": "built.js",
    "revision": "39b5d5bde20a5b2b0fb3f04ec3f4d7da"
  }, {
    "url": "index.html",
    "revision": "1db2eade71f295a6ceb3a7b3f53adc3b"
  }, {
    "url": "main.css",
    "revision": "8fad64eeeb8b476f549b138a20ef954f"
  }, {
    "url": "name-a8b7623cdf.png",
    "revision": "8f3b14eefed17337035cb719a18024f7"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
