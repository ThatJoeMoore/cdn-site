import axios from 'axios';

const CDN_HOST = 'https://dev.cdn.byu.edu';

const hiddenLibraries = ["2017-core-components", "cdn-site"];

// This is here until we include types in the CDN configs
const typeMappings = {
  "2017-core-components": "unknown",
  "byu-theme-components": "web-component",
  "byu-card": "web-component",
  "byu-calendar-components": "web-component",
  "byu-calendar-row": "web-component",
  "byu-calendar-tile": "web-component",
  "web-component-polyfills": "javascript",
  "shared-icons": "images",
  "byu-theme-style-helpers": "stylesheet",
  "byu-news-components": "web-component",
  "byu-feature-card": "web-component",
  "byu-hero-banner": "web-component",
  "byu-faculty-directory": "web-component",
  "theme-fonts": "font",
  "byu-random-content": "web-component",
  "browser-oauth-implicit": "javascript",
  "browser-oauth": "javascript",
  "byu-person-lookup": "web-component"
};

let promise;
let cached;

function prepLibraries(manifest) {
  return Object.entries(manifest.libraries)
    .map(([id, lib]) => {
      lib.id = id;
      lib.type = typeMappings[id] || "unknown";
      return lib;
    })
    .filter(lib => {
      return !hiddenLibraries.includes(lib.id);
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

async function loadAndPrepManifest() {
  console.log('loading manifest');
  const response = await axios(CDN_HOST + '/manifest.json')
  const manifest = response.data;
  manifest.libraryArray = prepLibraries(manifest);
  console.log('loaded manifest');
  return manifest;
}

export async function loadManifest() {
  if (!cached) {
    if (promise) {
      await promise;
    } else {
      promise = loadAndPrepManifest();
      cached = await promise;
    }
  }
  return cached;
}

export async function loadLibrary(id) {
  console.log('loadLibraryVersion', id);
  const manifest = await loadManifest();

  console.log('done with loadLibrary', id);
  return manifest.libraries[id];
}

export async function loadLibraryVersion(libId, versionName) {
  console.log('loadLibraryVersion', libId, versionName);
  const manifest = await loadManifest();

  const lib = manifest.libraries[libId];
  if (!lib.versions) {
    console.log('Lib missing versions', lib);
    return null;
  }
  const version = lib.versions.find(v => v.name === versionName);

  if (!version) {
    console.log('missing requested version', libId, versionName, lib.versions);
    return null;
  }

  console.log('done with loadLibraryVersion', libId, versionName);
  return version;
}

const versionManifestCache = {};

export async function loadLibraryVersionManifest(libId, versionName) {
  if (!versionManifestCache[libId]) {
    versionManifestCache[libId] = {};
  }
  const cached = versionManifestCache[libId][versionName];
  if (cached) {
    return cached;
  }

  const version = await loadLibraryVersion(libId, versionName);
  const versionPath = version.type === 'release' ? version.name : 'experimental/' + version.name;

  const fetched = (await axios(`${CDN_HOST}/${libId}/${versionPath}/.cdn-meta/version-manifest.json`)).data;
  versionManifestCache[libId][versionName] = fetched;
  return fetched;
}

