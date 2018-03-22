#!/usr/bin/python
"""
Relace a string in given file
"""

import sys
import os
import json

def load_config(filename='font.json'):
    """
    Load JSON config file
    """
    with open(filename) as infile:
        return json.load(infile)

def main(src, old_needle, new_needle):
    """
    Relace a string in given file
    """

    config = load_config(src)
    svgs = config.pop('input')

    files = [f for f in os.listdir(svgs) if os.path.isfile(os.path.join(svgs, f))]
    files.sort()

    for filename in files:
        if not filename.endswith('.svg'):
            continue

        with open(svgs + '/' + filename, 'r+') as icon:
            content = icon.read()
            icon.seek(0)
            icon.truncate()
            content = content.replace(old_needle, new_needle)
            icon.write(content)


if __name__ == '__main__':
    if len(sys.argv) == 4:
        main(*sys.argv[1:])
    else:
        sys.stderr.write("\nUsage: %s src old_needle new_needle\n" % sys.argv[0])
