#!/bin/sh

jekyll build

NODE_ENV=production gulp build

# removes the html extension
for f in `ls _site/blog/**/**/**/*.html`; do mv $f "${f%%.*}"; done

# s3cmd sync --default-mime-type="text/html; charset=utf-8" --guess-mime-type --delete-removed _site/ s3://nico.cool/

# removes the generated site which has the .html and renamed files
rm -rf _site


