#!/bin/sh

gulp build --NODE_ENV=production

jekyll build

s3cmd sync --default-mime-type="text/html; charset=utf-8" --guess-mime-type --delete-removed _site/ s3://nico.cool/

rm -rf _site


