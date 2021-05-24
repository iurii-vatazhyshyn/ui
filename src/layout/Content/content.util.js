import { isEqual } from 'lodash'

export const generateGroupedItems = (content, selectedRowData) => {
  const groupedItems = {}

  content.forEach(contentItem => {
    if (selectedRowData?.[contentItem.name]?.content) {
      groupedItems[contentItem.name] =
        selectedRowData[contentItem.name]?.content
    } else if (
      selectedRowData?.[`${contentItem.name}-${contentItem.metadata?.name}`]
        ?.content
    ) {
      groupedItems[`${contentItem.name}-${contentItem.metadata.name}`] =
        selectedRowData[
          `${contentItem.name}-${contentItem.metadata.name}`
        ]?.content
    } else if (selectedRowData?.[contentItem.db_key]?.content) {
      groupedItems[contentItem.db_key] =
        selectedRowData[contentItem.db_key]?.content
    } else if (contentItem.metadata?.name) {
      groupedItems[`${contentItem.name}-${contentItem.metadata.name}`] ??= []
      groupedItems[`${contentItem.name}-${contentItem.metadata.name}`].push(
        contentItem
      )
    } else if (contentItem.name) {
      groupedItems[contentItem.name] ??= []
      groupedItems[contentItem.name].push(contentItem)
    } else if (contentItem.db_key) {
      groupedItems[contentItem.db_key] ??= []
      groupedItems[contentItem.db_key].push(contentItem)
    } else {
      groupedItems[contentItem.key] ??= []
      groupedItems[contentItem.key].push(contentItem)
    }
  })

  return groupedItems
}

export const matchItem = ({ name, tag, uid }, { metadata }) => {
  return tag && uid
    ? isEqual(metadata.name, name) &&
        isEqual(metadata.tag, tag) &&
        isEqual(metadata.uid, uid)
    : tag
    ? isEqual(metadata.name, name) && isEqual(metadata.tag, tag)
    : uid
    ? isEqual(metadata.tag, tag) && isEqual(metadata.uid, uid)
    : isEqual(metadata.name, name)
}
