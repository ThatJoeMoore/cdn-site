import axios from 'axios';

const libraryTypes = [
  { id: 'web-component', display: 'Web Components' },
  { id: 'javascript', display: 'Javascript' },
  { id: 'stylesheet', display: 'CSS Stylesheets' },
  { id: 'font', display: 'Fonts' },
  { id: 'images', display: 'Images & Icons' },
];

export function allLibraryTypes() {
  return [...libraryTypes];
}

function prepLibraries(manifest) {
  return Object.entries(manifest.libraries)
    .map(([id, lib]) => {
      lib.id = id;
      return lib;
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

async function loadAndPrepManifest(host) {
  console.log('loading manifest');
  const response = await axios(host + '/manifest.json')
  const manifest = response.data;
  manifest.libraryArray = prepLibraries(manifest);
  console.log('loaded manifest');
  return manifest;
}

export async function loadManifest(context) {
  if (!context.env.manifest) {
    context.env.manifest = loadAndPrepManifest(context.env.cdnBase);
  }
  return context.env.manifest;
}

export async function loadLibrary(context, id) {
  console.log('loadLibraryVersion', id);
  const manifest = await loadManifest(context);

  console.log('done with loadLibrary', id);
  return manifest.libraries[id];
}

export async function loadLibraryVersion(context, libId, versionName) {
  console.log('loadLibraryVersion', libId, versionName);
  const manifest = await loadManifest(context);

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

export async function loadLibraryVersionManifest(context, libId, versionName) {
  if (!versionManifestCache[libId]) {
    versionManifestCache[libId] = {};
  }
  const cached = versionManifestCache[libId][versionName];
  if (cached) {
    return cached;
  }

  const version = await loadLibraryVersion(context, libId, versionName);

  const fetched = (await axios(context.env.cdnBase + version.manifest_path)).data;
  versionManifestCache[libId][versionName] = fetched;
  return fetched;
}

