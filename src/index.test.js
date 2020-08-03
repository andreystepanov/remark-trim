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

 Paragraph with  ** bold **  text\xa0\xa0.\xa0

\xa0\xa0Paragraph with  ** * bold italic * **  text\xa0\xa0\xa0:\xa0\xa0

*Paragraph\xa0\xa0\xa0with\xa0\xa0[\xa0\xa0link with\xa0\xa0spaces\xa0\xa0\xa0]( https://link.com ). Some oher text follows...*

Paragraph\xa0\xa0\xa0with image ![\xa0\xa0caption with\xa0\xa0spaces\xa0\xa0\xa0]( https://images.com/demo.png  )

Paragraph with  * italic *  text.

Paragraph with  * italic\xa0\xa0\xa0*\xa0\xa0\xa0text\xa0,\xa0\xa0

Paragraph with text\xa0\xa0-\xa0\xa0

**Paragraph with \n**line break

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
  // console.log(md)
  expect(md).toMatchSnapshot()
})
