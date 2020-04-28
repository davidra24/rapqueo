import { apiUrl } from './constants';

export const getApi = async (service, params = {}) => {
  var info = {};
  await fetch(`${apiUrl}/${service}`, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      info.data = response;
    })
    .catch((err) => {
      info.err = err;
    });

  return info;
};

export const getOneOrManyApi = async (service, id, params = {}) => {
  var info = {};
  await fetch(`${apiUrl}/${service}/${id}`, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      info.data = response;
    })
    .catch((err) => {
      info.err = err;
    });

  return info;
};

export const postApi = async (service, body) => {
  var info = {};
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
    //mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  await fetch(`${apiUrl}/${service}`, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      info.data = response;
    })
    .catch((err) => {
      info.err = err;
    });

  return info;
};

export const putApi = async (service, id, body) => {
  var info = {};
  const params = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await fetch(`${apiUrl}/${service}/${id}`, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      info.data = response;
    })
    .catch((err) => {
      info.err = err;
    });

  return info;
};

export const deleteApi = async (service, id) => {
  var info = {};
  const params = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  await fetch(`${apiUrl}/${service}/${id}`, params)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      info.data = response;
    })
    .catch((err) => {
      info.err = err;
    });

  return info;
};
