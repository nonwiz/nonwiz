import lume from "lume/mod.ts";

const site = lume();
site.copy("assets", ".");
site.copy("style.css");
site.copy("main.js");

site.data("G", {
  cv: "https://read.cv/nonwiz",
  title: "Nonwiz",
  mail: "mailto:7pistrongpydf@mozmail.com",
  github: "https://github.com/nonwiz",
  x: "https://x.com/itsNonwiz",
});

function parseObsidian(content: string) {
  return content.replace(/!\[\[(.*?)\]\]/g, (_, filename) => {
    const cleanFilename = filename.replace(/^assets\//, "");
    return `<img src="/${encodeURIComponent(cleanFilename)}">`;
  });
}

site.process([".md"], (assets) => {
  for (const asset of assets) {
    asset.content = parseObsidian(asset.content);
  }
});

export default site;
