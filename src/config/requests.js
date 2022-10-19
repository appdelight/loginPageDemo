import Axios from "axios";
import * as config from "./config";
import { getLocalStorage } from "./session";

const getUrl = (endpoint) => {
  return config.API_HOST + endpoint;
};


export const Post = async (endpoint, data) => {
  return Axios.post(getUrl(endpoint),{...data },{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const Get = async (endpoint) => {
  return Axios.get(getUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      // 'language': LANG || 'en'
    },
  });
};


export const Put = async (endpoint, data) => {
  return Axios.put(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const Patch = async (endpoint, data) => {
  return Axios.patch(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const Delete = async (endpoint, data) => {
  return Axios.delete(getUrl(endpoint),{
      headers: {
        "Content-Type": "application/json",
        data
      },
    }
  );
};

// -------------with token----------------------


export const PostWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.post(getUrl(endpoint),{ ...data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const GetWithToken = async (endpoint) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.get(getUrl(endpoint),{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const PutWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.post(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const PatchWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.patch(
    getUrl(endpoint),
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


export const DeleteWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.delete(getUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      // 'language': LANG || 'en'
      data,
    },
  });
};

//   -----------------------------------------------------

Axios.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    // request.headers['language'] = LANG || 'en'
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
  { synchronous: true }
);

Axios.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    return Promise.resolve(response);
  },
  function (error) {
    if (!error || !error.response) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
      alert("authentication Fail");
      // return (window.location.href = "/");
    }
    return Promise.reject(error);
  }
);
