import {date} from 'quasar'
import numeral from 'numeral'

export const initColumns = function(cols) {
  return cols.map((col) => {
    if (!col.name) {
      return {
        ...col,
        name: '__' + col.type,
        label: '',
        field: '__' + col.type,
        style: col.style || {
          width: '20px'
        }
      }
    }
    return {
      ...col,
      align: col.align || (col.type == 'integer' || col.type == 'decimal' || col.type == 'date' ? 'right' : 'left'),
      label: col.label || col.name.toUpperCase(),
      field: col.field || col.name,
      filter: col.filter || (col.type == 'boolean' ? 1 : ''),
      format: (val, row) => {
        if (col.format) {
          return col.format(val,row)
        } else if (col.type === 'integer' || col.type === 'decimal') {
          return numeral(val).value()
        } else if (col.type === 'date') {
          return date.formatDate(val, 'DD/MMMM/YYYY')
        }
        return val
      }
    }
  })
}

export const manipulateBody = function(data, payload, index) {
  console.log('data',JSON.parse(JSON.stringify(data)))
  if (payload === 'delete') {
    data.splice(index,1)
  } else {
    data[index] = payload
  }
  console.log('dataafter',JSON.parse(JSON.stringify(data)))
}

export const visibleColumns = function(cols) {
  let colus = cols.filter((col) => !col.type || col.type !== 'hidden')
  return colus.map((col) => col.name)
}