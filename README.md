# remark-trim

> [remark](https://github.com/remarkjs/remark) plugin to trim all unnecessary spaces in `strong`, `emphasis`, `inlineCode`, `url` and `image` nodes

## Installation

```
npm install remark-trim --save
```

## Usage

Say we have the following file, `example.md`:

<!-- prettier-ignore -->
````markdown
# Title

`code`

`code  with a  few  spaces`

`    const param = [ 1,   2,  3 ]    `

`const param = false`

```
const block =  true
```

Paragraph with ** bold ** text .

Paragraph with ** _ bold italic _ ** text :

Paragraph with [ link with  spaces ](https://link.com)

Paragraph with image ![  caption with  spaces    ](https://images.com/demo.png)

Paragraph with _ italic _ text.
````

And our script, `example.js`, looks as follows:

```javascript
const vfile = require('to-vfile')
const remark = require('remark')
const trim = require('remark-trim')

const markdown = remark()
  .use(trim)
  .use({ settings: { fences: true } })
  .process(vfile.readSync('example.md'), function (err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

<!-- prettier-ignore -->
````markdown
# Title

`code`

`code  with a  few  spaces`

`    const param = [ 1,   2,  3 ]    `

`const param = false`

```
const block =  true
```

Paragraph with **bold** text.

Paragraph with **_bold italic_** text:

Paragraph with [link with spaces](https://link.com)

Paragraph with image ![caption with spaces](https://images.com/demo.png)

Paragraph with _italic_ text.
````
