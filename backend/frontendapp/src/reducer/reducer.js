const initialState = {

};

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function transformTimes(data) {
  const transformedData = data.map((record) => {
    const transformedRecord = record;
    transformedRecord.time_close = new Date(record.time_close).getHours();
    return transformedRecord;
  });
  return transformedData;
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
  case 'GET_DATA':
    return updateObject(state, {
      data: transformTimes(action.data),
    });

  case 'LOGIN_SUCCESSFUL':
    return Object.assign({}, state, {
      user: action.data,
      errors: null,
    });

  case 'LOGIN_ERROR':
    return Object.assign({}, state, {
      errors: action.data,
      user: null,
    });

  default:
    return state;
  }
}
