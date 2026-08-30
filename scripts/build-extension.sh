#!/bin/bash
# Build the CARRGO Chrome extension zip into public/downloads/
set -e
cd /home/z/my-project
node scripts/make-icon.js
rm -f public/downloads/seo-master-chrome-extension.zip
cd extension-src
zip -r ../public/downloads/seo-master-chrome-extension.zip . -x "*.DS_Store" > /dev/null
cd ..
ls -la public/downloads/
echo "Extension zip built."
