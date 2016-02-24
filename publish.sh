#!/bin/sh

# replace with your compile command
# removes the html extension
for f in `ls _site/blog/**/**/**/*.html`; do mv $f "${f%%.*}"; done

# requires s3cmd >= v1.5.0-beta1 for
# https://github.com/s3tools/s3cmd/issues/243
s3cmd sync --default-mime-type="text/html; charset=utf-8" --guess-mime-type --delete-removed _site/ s3://nico.cool/
