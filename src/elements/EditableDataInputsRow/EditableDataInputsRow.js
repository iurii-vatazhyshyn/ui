import React from 'react'
import PropTypes from 'prop-types'

import Input from '../../common/Input/Input'
import Combobox from '../../common/Combobox/Combobox'

import { ReactComponent as Checkmark } from '../../images/checkmark.svg'

const EditableDataInputsRow = ({
  handleEdit,
  inputOnChange,
  matches,
  selectDropdownList,
  selectedDataInput,
  selectOnChange,
  setSelectedDataInput
}) => {
  const value = selectDropdownList.filter(
    item => item.id === selectedDataInput.data.path.split('://')[0] + '://'
  )

  return (
    <div className="table__row edit-row">
      {selectedDataInput.isDefault ? (
        <div className="table__cell table__cell_disabled">
          <div className="data-ellipsis">{selectedDataInput.data.name}</div>
        </div>
      ) : (
        <div className="table__cell table__cell_edit">
          <Input
            onChange={name =>
              setSelectedDataInput({
                ...selectedDataInput,
                newDataInputName: name
              })
            }
            type="text"
            value={
              selectedDataInput.newDataInputName || selectedDataInput.data.name
            }
          />
        </div>
      )}
      <div className="table__cell table__cell_edit">
        <div className="combobox-input-edit">
          <Combobox
            comboboxClassName="input-row__item"
            matches={matches}
            inputDefaultValue={selectedDataInput.data.path.split('://')[1]}
            inputOnChange={inputOnChange}
            selectDropdownList={selectDropdownList}
            selectOnChange={selectOnChange}
            setSelectedValue={value[0]}
            setDataChanges={data =>
              setSelectedDataInput({
                ...selectedDataInput,
                data: { ...selectedDataInput.data, path: data }
              })
            }
          />
        </div>
      </div>
      <div className="table__cell table__cell-actions">
        <button
          className="apply-edit-btn"
          onClick={() => handleEdit(selectedDataInput, true)}
        >
          <Checkmark />
        </button>
      </div>
    </div>
  )
}

EditableDataInputsRow.defaultProps = {
  inputOnChange: () => {},
  matches: [],
  selectDropdownList: [],
  selectOnChange: () => {}
}

EditableDataInputsRow.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  inputOnChange: PropTypes.func,
  matches: PropTypes.arrayOf(PropTypes.shape({})),
  selectDropdownList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedDataInput: PropTypes.shape({}).isRequired,
  setSelectedDataInput: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func
}

export default EditableDataInputsRow
