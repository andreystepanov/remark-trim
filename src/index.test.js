import trim from './'
import remark from 'remark'

// prettier-ignore
const data = `
# Title

 \` code \`

 \` code  with 2  spaces \`

\`\xa0\xa0\xa0\xa0const param = [  1, 2,   3 ]\xa0\xa0\xa0\xa0\`

\` const param = false  \`

\`\`\`
const block =  true
\`\`\`

 Paragraph with  ** bold **  text .

   Paragraph with  ** * bold italic * **  text  :

Paragraph    with [  link with  spaces    ]( https://link.com )

Paragraph     with image ![  caption with  spaces    ]( https://images.com/demo.png  )

Paragraph with  * italic *  text.

-   List 1
-  List   2
`

function parse(data, options) {
  return remark()
    .use(trim)
    .use({ settings: { fences: true } })
    .processSync(data)
    .toString()
}

test('defined', () => {
  expect(trim).toBeDefined()
  expect(typeof trim).toBe('function')
})

test('trims all unnecessary spaces', () => {
  const md = parse(data)
  expect(md).toMatchSnapshot()
})
