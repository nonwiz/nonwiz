import lume from "lume/mod.ts";
const site = lume();
site.copy("assets", ".");
site.copy("style.css");
site.copy("main.js");

function convertAllExternalLinkToNewTab(content: string) {
  return content.replace(/(href=")([^"]+)(")/g, (_, prefix, url, suffix) => {
    return `${prefix}${url} ${suffix} ${
      url.includes("http") ? 'target="_blank"' : ""
    }`;
  });
}

function parseObsidianImages(content: string) {
  return content.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
    const cleanFilename = filename.replace(/^assets\//, "");
    return `<img src="/${encodeURIComponent(cleanFilename)}">`;
  });
}

function parseObsidian(content: string) {
  return convertAllExternalLinkToNewTab(parseObsidianImages(content));
}

site.process([".md"], (assets) => {
  for (const asset of assets) {
    asset.content = parseObsidian(asset.content);
  }
});

export default site;
