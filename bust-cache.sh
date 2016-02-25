#!/bin/sh

# invalidates the cloudfront cache so the new blog posts appear
aws cloudfront create-invalidation --distribution-id E1TJ4K047YJBTX --paths /blog/*
