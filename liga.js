/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'arrow_up': '&#xe600;',
            'arrow_ne': '&#xe601;',
            'arrow_right': '&#xe602;',
            'arrow-right': '&#xe603;',
            'arrow_down': '&#xe604;',
            'arrow_sw': '&#xe605;',
            'arrow_left': '&#xe606;',
            'arrow_nw': '&#xe607;',
            'return': '&#xe608;',
            'concentric': '&#xe609;',
            'eccentric': '&#xe60a;',
            'cicle': '&#xe60b;',
            'contract': '&#xe60c;',
            'expand': '&#xe60d;',
            'meeting': '&#xe60e;',
            'departing': '&#xe60f;',
            'pointer': '&#xe610;',
            'arrow': '&#xe611;',
            'right': '&#xe612;',
            'down': '&#xe613;',
            'left': '&#xe614;',
            'up': '&#xe615;',
            'rewind': '&#xe616;',
            'forward': '&#xe617;',
            'pause': '&#xe618;',
            'stop': '&#xe619;',
            'rec': '&#xe61a;',
            'plus': '&#xe61b;',
            'minus': '&#xe61c;',
            'times': '&#xe61d;',
            'divide': '&#xe61e;',
            'equal': '&#xe61f;',
            'calculator': '&#xe620;',
            'curve': '&#xe621;',
            'graphic': '&#xe622;',
            'pie': '&#xe623;',
            'upload': '&#xe624;',
            'upload2': '&#xe625;',
            'download': '&#xe626;',
            'download2': '&#xe627;',
            'login': '&#xe628;',
            'logout': '&#xe629;',
            'mark': '&#xe62a;',
            'validate': '&#xe62b;',
            'deny': '&#xe62c;',
            'edit': '&#xe62d;',
            'write': '&#xe62e;',
            'look': '&#xe62f;',
            'time': '&#xe630;',
            'search': '&#xe631;',
            'zoom_in': '&#xe632;',
            'zoom_out': '&#xe633;',
            'bullseye': '&#xe634;',
            'forbidden': '&#xe635;',
            'info': '&#xe636;',
            'caution': '&#xe637;',
            'question': '&#xe638;',
            'check': '&#xe639;',
            'denied': '&#xe63a;',
            'users': '&#xe63b;',
            'user': '&#xe63c;',
            'employee': '&#xe63d;',
            'boss': '&#xe63e;',
            'admin': '&#xe63f;',
            'heart': '&#xe640;',
            'heart_full': '&#xe641;',
            'star': '&#xe642;',
            'star_full': '&#xe643;',
            'book': '&#xe644;',
            'bookmark': '&#xe645;',
            'calendar': '&#xe646;',
            'power_plug': '&#xe647;',
            'power_socket': '&#xe648;',
            'ethernet_plug': '&#xe649;',
            'ehternet_socket': '&#xe64a;',
            'usb_plug': '&#xe64b;',
            'usb_socket': '&#xe64c;',
            'media': '&#xe64d;',
            'image': '&#xe64e;',
            'camera': '&#xe64f;',
            'music': '&#xe650;',
            'phones': '&#xe651;',
            'speaker': '&#xe652;',
            'cd': '&#xe653;',
            'glasses': '&#xe654;',
            'coffee': '&#xe655;',
            'suitcase': '&#xe656;',
            'breifcase': '&#xe657;',
            'map': '&#xe658;',
            'key': '&#xe659;',
            'shirt': '&#xe65a;',
            'bin': '&#xe65b;',
            'disk': '&#xe65c;',
            'disk2': '&#xe65d;',
            'diamond': '&#xe65e;',
            'cloud': '&#xe65f;',
            'layout': '&#xe660;',
            'bulb': '&#xe661;',
            'gauge': '&#xe662;',
            'home': '&#xe663;',
            'impulse': '&#xe664;',
            'keyboard': '&#xe665;',
            'mouse': '&#xe666;',
            'laptop': '&#xe667;',
            'mobile': '&#xe668;',
            'tablet': '&#xe669;',
            'lock': '&#xe66a;',
            'lock_open': '&#xe66b;',
            'migration': '&#xe66c;',
            'folder': '&#xe66d;',
            'box': '&#xe66e;',
            'ribbon': '&#xe66f;',
            'ruler': '&#xe670;',
            'gears': '&#xe671;',
            'wrench': '&#xe672;',
            'settings': '&#xe673;',
            'shield': '&#xe674;',
            'shield_deny': '&#xe675;',
            'shield_checker': '&#xe676;',
            'safe': '&#xe677;',
            'traffic': '&#xe678;',
            'watch': '&#xe679;',
            'wifi': '&#xe67a;',
            'antenna': '&#xe67b;',
            'network': '&#xe67c;',
            'serving': '&#xe67d;',
            'globestand': '&#xe67e;',
            'globe': '&#xe67f;',
            'america': '&#xe680;',
            'asia': '&#xe681;',
            'europe': '&#xe682;',
            'at': '&#xe683;',
            'envelope': '&#xe684;',
            'envelope_open': '&#xe685;',
            'card': '&#xe686;',
            'link': '&#xe687;',
            'link_broken': '&#xe688;',
            'code': '&#xe689;',
            'code2': '&#xe68a;',
            'code3': '&#xe68b;',
            'bug': '&#xe68c;',
            'sheep': '&#xe68d;',
            'clone': '&#xe68e;',
            'merge': '&#xe68f;',
            'branch': '&#xe690;',
            'push': '&#xe691;',
            'pull': '&#xe692;',
            'net': '&#xe693;',
            'spike': '&#xe694;',
            'cdn': '&#xe695;',
            'stack': '&#xe696;',
            'rack': '&#xe697;',
            'chip': '&#xe698;',
            'place': '&#xe699;',
            'like': '&#xe69a;',
            'dislike': '&#xe69b;',
            'facebook_full': '&#xe69c;',
            'facebook': '&#xe69d;',
            'facebook_hair': '&#xe69e;',
            'twitter_full': '&#xe69f;',
            'twitter': '&#xe6a0;',
            'twitter_hair': '&#xe6a1;',
            'google_full': '&#xe6a2;',
            'google': '&#xe6a3;',
            'google_hair': '&#xe6a4;',
            'github': '&#xe6a5;',
            'git': '&#xe6a6;',
            'python': '&#xe6a7;',
            'wordpress': '&#xe6a9;',
            'cc': '&#xe6aa;',
            'bill': '&#xe6ab;',
            'creditcard': '&#xe6ac;',
            'wallet': '&#xe6ad;',
            'cart': '&#xe6ae;',
            'ticket': '&#xe6af;',
            'scale': '&#xe6b0;',
            'quotes': '&#xe6b1;',
            'paragraph': '&#xe6b2;',
            'pen': '&#xe6b3;',
            'writing': '&#xe6b4;',
            'agenda': '&#xe6b5;',
            'board': '&#xe6b6;',
            'comment_empty': '&#xe6b7;',
            'comment': '&#xe6b8;',
            'file': '&#xe6b9;',
            'text': '&#xe6ba;',
            'zip': '&#xe6bb;',
            'shred': '&#xe6bc;',
            'shield_help': '&#xe6bd;',
            'phone': '&#xe6be;',
            'headset': '&#xe6bf;',
            '24h': '&#xe6c0;',
            'lighthouse': '&#xe6c1;',
            'buoy': '&#xe6c2;',
            'plugin': '&#xe6c3;',
            'toplytics': '&#xe6c4;',
            'gitium': '&#xe6c5;',
            'themeperuser': '&#xe6c6;',
            'autover': '&#xe6c7;',
            'protection': '&#xe6c8;',
            'theme': '&#xe6c9;',
            'mapping': '&#xe6ca;',
            'utf': '&#xe6cb;',
            'gitfs': '&#xe6cc;',
            'zipa': '&#xe6cd;',
            'tag': '&#xe6ce;',
            'silver': '&#xe6cf;',
            'zsync': '&#xe6d0;',
            'pyolite': '&#xe6d1;',
            'presslabs': '&#xe6d2;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
