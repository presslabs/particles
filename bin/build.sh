#!/bin/bash

./node_modules/.bin/gulp cleanup
./node_modules/.bin/gulp convert-brands
# ./node_modules/.bin/gulp convert-icons
./node_modules/.bin/gulp generate-font
