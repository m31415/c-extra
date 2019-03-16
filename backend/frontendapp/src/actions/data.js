export function getData(timedelta) {
  return (dispatch) => {
    const headers = {
      method: 'GET',
      'Content-Type': 'application/json',
    };

    return fetch(`api/data/?timedelta=${timedelta}`, { headers})
      .then((response) => {
        return response.json().then((data) => {
          return {
            status: response.status,
            data,
          };
        });
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: 'GET_DATA', data: response.data });
        }
      });
  };
}
