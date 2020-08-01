import visit from 'unist-util-visit'

export default function trim(options) {
  return function transform(tree, vfile) {
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

  if (node.type === 'image') {
    value = node.alt
  }

  if (
    ['strong', 'emphasis', 'link'].includes(type) ||
    (type === 'paragraph' && node.type === 'image') ||
    (node.type === 'inlineCode' && /^\s{4}.*\s{4}$/.test(value) === false)
  ) {
    value = value.trim()
  } else if (type === 'paragraph' && node.type === 'text') {
    // trim spaces at the start of the paragraph
    if (index === 0) {
      value = value.trimLeft()
    } else if (
      // if it's the last element in paragraph and it has extra spaces
      index === children.length - 1 &&
      /\s{0,}[.,:-]\s{0,}?$/.test(value)
    ) {
      value = value.replace(/\s{0,}?([.,:-])\s{0,}?$/, '$1')
    }
  }

  if (node.type !== 'inlineCode') {
    value = value.replace(/\s\s+/g, ' ')
  }

  if (node.type === 'image') {
    node.alt = value
  } else {
    node.value = value
  }
}
