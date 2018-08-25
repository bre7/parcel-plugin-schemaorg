const assert = require('assert');
const { setupBundler } = require('./utils');
const assertBundleTree = require('parcel-assert-bundle-tree');
const path = require('path');
const fs = require('fs-extra');

describe('basic', function() {
  it('Should create a basic imagemin bundle', async function() {
    this.timeout(0);
    const bundler = await setupBundler(path.join(__dirname, './Integration/Basic/schema.html'), {
      production: true
    });
    const bundle = await bundler.bundle();

    assertBundleTree(bundle, {
      name: 'schema.html',
      assets: ['schema.html'],
      childBundles: [
        {
          type: 'jpeg'
        },
        {
          type: 'png'
        }
      ]
    });

  });
});