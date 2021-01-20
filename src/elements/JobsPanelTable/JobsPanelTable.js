import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Edit } from '../../images/edit.svg'
import { ReactComponent as Delete } from '../../images/delete.svg'

import JobsPanelTableView from './JobsPanelTableView'

import './jobsPanelTable.scss'

const JobsPanelTable = ({
  addNewItem,
  children,
  className,
  content,
  handleDeleteItems,
  handleEditItems,
  handleSetSelectedVolume,
  headers,
  match,
  section,
  selectedItem,
  matches,
  inputOnChange,
  selectDropdownList,
  selectOnChange,
  setSelectedItem
}) => {
  const [editItem, setEditItem] = useState(false)

  const handleEdit = useCallback(
    item => {
      if (editItem) {
        setEditItem(false)
        handleEditItems(section.includes('env'))
      } else {
        section === 'volumes'
          ? handleSetSelectedVolume(item)
          : setSelectedItem(item)

        setEditItem(true)
      }
    },
    [
      editItem,
      handleEditItems,
      handleSetSelectedVolume,
      section,
      setSelectedItem
    ]
  )

  const handleDelete = useCallback(
    item => {
      handleDeleteItems(item, section.includes('env'))
    },
    [handleDeleteItems, section]
  )

  const generateActionsMenu = useCallback(
    rowItem => [
      {
        label: 'Edit',
        icon: <Edit />,
        onClick: param => handleEdit(param)
      },
      {
        label: 'Remove',
        icon: <Delete />,
        visible: !rowItem.isDefault,
        onClick: selectedItem => {
          handleDelete(selectedItem)
        }
      }
    ],
    [handleDelete, handleEdit]
  )

  return (
    <JobsPanelTableView
      addNewItem={addNewItem}
      children={children}
      className={className}
      content={content}
      editItem={editItem}
      generateActionsMenu={generateActionsMenu}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      headers={headers}
      inputOnChange={inputOnChange}
      match={match}
      matches={matches}
      section={section}
      selectDropdownList={selectDropdownList}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      selectOnChange={selectOnChange}
    />
  )
}

JobsPanelTable.defaultProps = {
  className: '',
  headers: [],
  handleDeleteItems: null,
  handleSetSelectedVolume: null,
  inputOnChange: () => {},
  matches: [],
  selectDropdownList: [],
  selectOnChange: () => {}
}

JobsPanelTable.propTypes = {
  addNewItem: PropTypes.bool.isRequired,
  className: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]).isRequired,
  handleDeleteItems: PropTypes.func,
  handleEditItems: PropTypes.func.isRequired,
  handleSetSelectedVolume: PropTypes.func,
  headers: PropTypes.arrayOf(PropTypes.shape({})),
  inputOnChange: PropTypes.func,
  match: PropTypes.shape({}).isRequired,
  matches: PropTypes.arrayOf(PropTypes.shape({})),
  section: PropTypes.string.isRequired,
  selectDropdownList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedItem: PropTypes.shape({}).isRequired,
  selectOnChange: PropTypes.func,
  setSelectedItem: PropTypes.func.isRequired
}

export default JobsPanelTable
