# angular-markdown-plus

A combination of the bootstrap-markdown and the marked libraries for handling Markdown.  This plugin simply adds two useful directives to your application: `markdown-editor` and `markdown-preview`.  

The `markdown-editor` element will be turned into a bootstrap-markdown editor.

The `markdown-preview` element will be a simple div with the rendered markdown.

# Installation

Use bower:

```
bower install angular-markdown-plus
```

Then make sure that the necessary scripts from the two dependencies are loaded on your page.

# Usage

```
<markdown-editor ng-model="article.body"></markdown-editor>
<markdown-editor ng-model="article.body" placeholder="No body yet... One day it will be some body"></markdown-editor>

```

The value of the optional `placeholder` attribute will display in the output div until the ng-model value is filled with something other than an empty string. 


# License

Copyright (c) 2016, Yousuf Jukaku. (MIT License)

See LICENSE for more info.