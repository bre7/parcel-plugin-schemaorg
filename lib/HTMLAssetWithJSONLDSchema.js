const HTMLAsset = require("parcel-bundler/src/assets/HTMLAsset")

const SCHEMA_ATTRIBUTES = [
  "image",
  "logo"
];

class HTMLAssetWithJSONLDSchema extends HTMLAsset {
  collectDependencies() {
    super.collectDependencies()
    this.ast.walk(node => {
      if (node.tag === 'script' && node.attrs && node.attrs.type && node.attrs.type === "application/ld+json") {
        const schemaJson = JSON.parse(node.content.join('').trim())
        for (let schemaKey in schemaJson) {
          if (SCHEMA_ATTRIBUTES.includes(schemaKey)) {
            const collected = super.collectSrcSetDependencies(schemaJson[schemaKey])
            for (let i = 0; i < node.content.length; i++) {
              node.content[i] = node.content[i].replace(schemaJson[schemaKey], collected)
            }
            this.isAstDirty = true
          }
        }
      }

      return node
    })
  }
}

module.exports = HTMLAssetWithJSONLDSchema