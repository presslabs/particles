#!/usr/bin/python
"""
Creates a JSON containing particles path data such as:
{
    "add": [
        "M48 256c0 9 ..."
    ],
    ...
}
"""

import sys
import os
import json
import xml.etree.ElementTree as ET

def load_config(filename='font.json'):
    """
    Load JSON config file
    """
    with open(filename) as infile:
        return json.load(infile)

def main(src):
    """
    Get the src, generate the object and print it in JSON format
    """

    config = load_config(src)
    svgs = config.pop('exportdir')

    files = [f for f in os.listdir(svgs) if os.path.isfile(os.path.join(svgs, f))]
    files.sort()

    start = 0xe000
    glyps = {}

    for filename in files:
        if not filename.endswith('.svg'):
            continue

        name = os.path.splitext(filename)[0]
        tree = ET.parse(svgs + '/' + filename)

        liga = name.replace('-', '_')
        definition = tree.getroot()[0][0].attrib['d']

        glyps[str(liga)] = definition

    print json.dumps(glyps, indent=4, sort_keys=True)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        sys.stderr.write("\nUsage: %s src\n" % sys.argv[0])
