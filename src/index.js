import visit from 'unist-util-visit'

export default function trim(options) {
  return function transform(tree, vfile) {
    // console.log(JSON.stringify(tree, null, 3))

    visit(
      tree,
      node => ['text', 'inlineCode', 'image'].includes(node.type),
      onnode,
    )
  }
}

function onnode(node, index, parent) {
  let value = node.value
  const { type, children } = parent
  const onlyChild = children.length === 1
  const first = index === 0 && !onlyChild
  const last = index === children.length - 1 && !onlyChild
  const isImage = node.type === 'image'
  const isInlineCode = node.type === 'inlineCode'

  if (isImage) {
    value = node.alt.trim()
  }

  if (
    ['strong', 'emphasis', 'link'].includes(type) ||
    (type === 'paragraph' && ['image', 'text'].includes(node.type)) ||
    (isInlineCode && /^\s{4,}.*\s{4,}$/.test(value) === false)
  ) {
    if (onlyChild) {
      value = value.trim()
    } else if (first) {
      value = value.trimLeft()
    } else if (last) {
      value = value.trimRight()
    }
  }

  if (
    // if it's the last element in paragraph and it has extra spaces
    last &&
    /\s{0,}[.,:]\s{0,}?$/.test(value)
  ) {
    value = value.replace(/\s{0,}?([.,:])\s{0,}?$/, '$1')
  }

  // /\r?\n|\r/.test(value) === false
  if (!isInlineCode && value) {
    value = value.replace(/\s\s+/g, ' ')
  }

  node[isImage ? 'alt' : 'value'] = value
}
