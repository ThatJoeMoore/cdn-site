
import * as highlight from 'highlight.js/lib/highlight.js';

import * as xmlLang from 'highlight.js/lib/languages/xml.js';
import * as cssLang from 'highlight.js/lib/languages/css.js';
import * as jsLang from 'highlight.js/lib/languages/javascript.js';

highlight.registerLanguage('css', cssLang);
highlight.registerLanguage('html', xmlLang);
highlight.registerLanguage('javascript', jsLang);
highlight.registerLanguage('xml', xmlLang);

export default highlight;
