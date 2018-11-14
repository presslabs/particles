#!/usr/bin/python
"""
Creates a JSON File containing icons name, srouce, unicode and ligature:
[
    {
        "codepoint": "0xe000",
        "liga": "add",
        "name": "add",
        "src": "add.svg"
    },
    ...
]
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

def main(src):
    """
    Creates a JSON File containing icons name, srouce, unicode and ligature:
    """

    config = load_config(src)
    svgs = config.pop('input')

    files = [f for f in os.listdir(svgs) if os.path.isfile(os.path.join(svgs, f))]
    files.sort()

    start = 0xe000
    glyps = {}

    for idx, filename in enumerate(files):
        if not filename.endswith('.svg'):
            continue

        name = os.path.splitext(filename)[0]
        liga = name.replace('-', '_')

        glyps.update({ name: int(idx + start) })

    print json.dumps(glyps, indent=4, sort_keys=True)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        sys.stderr.write("\nUsage: %s src\n" % sys.argv[0])
