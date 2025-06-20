const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { DateTime } = require("luxon"); // This library allows custom date formating
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  // Copy static assets like PDF, images, etc:
  eleventyConfig.addPassthroughCopy("assets");
  // Copy styles:
  eleventyConfig.addPassthroughCopy("styles");  
  // Custom scripts:
  eleventyConfig.addPassthroughCopy("js");  
  // For github actions:
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  // For syntax highlighting:
  eleventyConfig.addPlugin(syntaxHighlight);
  // To format dates in the blog:
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("GG DDDD");
  });
  // Collect markdown posts:
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/*.md");
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
      pathPrefix: "arielwrl.github.io"
    }
  };

};
