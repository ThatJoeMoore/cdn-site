import axios from 'axios';

const CDN_HOST = 'https://dev.cdn.byu.edu';

let promise;

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
    const response = await axios(CDN_HOST + '/manifest.json')
    const manifest = response.data;
    manifest.libraryArray = prepLibraries(manifest);
    return manifest;
}

export function loadManifest() {
    if (!promise) {
        promise = loadAndPrepManifest();
    }
    return promise;
}

export async function loadLibrary(id) {
  const manifest = await loadManifest();

  return manifest.libraries[id];
}

export async function loadLibraryVersion(libId, versionName) {
  const manifest = await loadManifest();

  const lib = manifest.libraries[libId];
  const version = lib.versions.find(v => v.name === versionName);

  const versionPath = version.type === 'release' ? version.name : 'experimental/' + version.name;

  version.manifest = (await axios(`${CDN_HOST}/${libId}/${versionPath}/.cdn-meta/version-manifest.json`)).data;

  console.log('version', version);

  return version;
}


