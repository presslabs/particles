import sys
import os.path
import json

# try:
#     unicode
# except NameError:
#     unicode = str

def load_config(filename='font.json'):
    """
    Load JSON config file
    """
    with open(filename) as infile:
        return json.load(infile)

def create_empty_char(font, char):
    """
    Creates an empty fontforge char
    """
    pen = font.createChar(ord(char), char).glyphPen()
    pen.moveTo((0, 0))
    pen = None

def set_properties(font, config):
    """
    Sets properties to the font file from config
    """
    props = config['props']
    lang = props.pop('lang', 'English (US)')
    family = props.pop('family', None)
    style = props.pop('style', 'Regular')
    props['encoding'] = props.get('encoding', 'UnicodeFull')
    if family is not None:
        font.familyname = family
        font.fontname = family + '-' + style
        font.fullname = family + ' ' + style

    for key, value in config['props'].items():
        if hasattr(font, key):
            if isinstance(value, list):
                value = tuple(value)
            setattr(font, key, value)
        else:
            font.appendSFNTName(lang, key, value)
    for sfnt_names in config.get('sfnt_names', []):
        font.appendSFNTName(
            str(sfnt_names[0]),
            str(sfnt_names[1]),
            unicode(sfnt_names[2])
        )

def add_glyphs(font, data, config):
    """
    Creates a new glyph with data from the SVG file
    """
    for key, value in enumerate(data):
        ligature_name = value.pop('liga')
        name = str(ligature_name)

        for char in name:
            create_empty_char(font, char)
        glyph = font.createMappedChar(key + 57344)
        glyph.addPosSub('liga', tuple(name))

        src = '%s%s%s' % (config['input'], os.path.sep, value.pop('src'))
        glyph.importOutlines(src)

        glyph.removeOverlap()
        glyph.correctDirection()
        glyph.canonicalStart()
        glyph.canonicalContours()
        glyph.width = 512
        glyph.vwidth = 512
        glyph.round()

        # Crate and export temporary glyph without fontforge flipping it
        tmp_glyph = font.createMappedChar(key + 47344)
        tmp_glyph.importOutlines(src)
        tmp_glyph.removeOverlap()
        tmp_glyph.correctDirection()
        tmp_glyph.canonicalStart()
        tmp_glyph.canonicalContours()
        tmp_glyph.width = 512
        tmp_glyph.vwidth = 512
        tmp_glyph.transform([1, 0, 0, -1, 0, 512])
        tmp_glyph.round()
        tmp_glyph.export('%s/%s.svg' % (config['exportdir'], name))
        font.removeGlyph(tmp_glyph)

def main(config_file, data_file):
    """
    Generates the font files
    """
    config = load_config(config_file)
    data = load_config(data_file)
    os.chdir(os.path.dirname(config_file) or '.')
    font = fontforge.font()
    set_properties(font, config)
    font.addLookup('ligatures', 'gsub_ligature', (), [[b'liga', [[b'latn', [b'dflt']]]]])
    font.addLookupSubtable('ligatures', 'liga')

    glyph = font.createChar(32)
    glyph.width = 0

    add_glyphs(font, data, config)

    for format in config['format']:
        outfile_name = "%s/%s/%s.%s" % (config['outdir'],
            config['fonts_outdir'], config['outfile'], format)

        sys.stderr.write('Generating %s...\n' % outfile_name)
        font.generate(outfile_name)

if __name__ == '__main__':
    if len(sys.argv) > 2:
        main(sys.argv[1], sys.argv[2])
    else:
        sys.stderr.write("\nUsage: %s config.json data.json\n" % sys.argv[0])
