import axiosImport from 'axios'

const isLocalHost = window.location.hostname === 'localhost'

const axios = axiosImport.create({
  baseURL: isLocalHost ? '/masari/api/public/api/' : '/api/public/api/'
})

const request = (context,props,method) => {
  return new Promise((resolve, reject) => {
    context.commit("loadingStart")
    axios(props.url, {
      method: method,
      headers: {
        'Authorization' : 'Bearer ' + context.getters.getToken,
      },
      params: props.params,
      data: props.inputs,
      ...props
    }).then((response) => {
      const body = response.data
      if (body.status === "success") {
        resolve(body.data)
      } else if (body.status === "fail") {
        resolve(body.data)
      } else {
        reject(response)
      }
    }).catch((error) => {
      console.log(error)
      reject(error)
    }).finally(() => {
      context.commit("loadingEnd")
    })
  })
}

const fetch = (context, props) => {
  props = typeof props === 'string' ? {url : props} : props
  return new Promise((resolve, reject) => {
    request(context, props, 'get').then((response) => {
      resolve(response)
    }).catch(() => {
      request(context, props, 'get').then((response) => {
        resolve(response)
      }).catch(() => {
        request(context, props, 'get').then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }) 
}

const store = (context, props) => {
  props = typeof props === 'string' ? {url : props} : props
  return request(context, props, 'post')
}

const update = (context, props) => {
  props = typeof props === 'string' ? {url : props} : props
  return request(context, props, 'put')
}

const destroy = (context, props) => {
  props = typeof props === 'string' ? {url : props} : props
  return request(context, props, 'delete')
}

const fetchPaginate = (context,{url,pagination,params}) => {
  return fetch(context, {
    url:url, 
    params: {
      paginate: pagination.rowsPerPage || 9, 
      page: pagination.page || 1,
      sortBy: pagination.sortBy || '',
      descending: pagination.descending,
      ...params
    }
  })
}

const fetchSingle = (context, {url,id}) => {
  return fetch(context, {url:url + `/${id}`})
}

const destroySingle = (context, {url, id}) => {
  return destroy(context, {url:url + `/${id}`})
}

const updateSingle = (context, {url,id,inputs}) => {
  return update(context, {url:url + `/${id}`, inputs})
}

const getXLS = (context, {url,params,filename}) => {
  context.commit("loadingStart")
  axios({
    url,
    params: params,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Authorization' : 'Bearer ' + context.getters.getToken,
    }
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename + '.xlsx');
    document.body.appendChild(link);
    link.click();
  }).catch((error) => {
    console.log(error)
  }).finally(() => {
    context.commit("loadingEnd")
  })
}

const getValue = async(context,key) => {
  const result = await fetchSingle(context, {url: '/hashtable',id: key})
  return JSON.parse(result.data.value)
}

const fetchOptions = async(context, payload) => {
  const url = typeof payload === 'string' ? payload : payload.url
  const label = typeof payload === 'string' || !payload.hasOwnProperty('label') ? 'nama' : payload.label
  const value = typeof payload === 'string' || !payload.hasOwnProperty('value') ? 'id' : payload.value
  const result = await fetch(context, {url, params: payload.params})
  return result.data.map(v => {
    return {
      ...v,
      label: v[label],
      value: v[value]
    }
  })
}

export default ({ Vue }) => {
  Vue.prototype.$axios = axios  
  Vue.prototype.$axRequest = request
  Vue.prototype.$axFetch = fetch
  Vue.prototype.$axStore = store
  Vue.prototype.$axUpdate = update
  Vue.prototype.$axDestroy = destroy
  Vue.prototype.$axFetchPaginate = fetchPaginate
  Vue.prototype.$axDestroySingle = destroySingle
  Vue.prototype.$axUpdateSingle = updateSingle
  Vue.prototype.$axGetXLS = getXLS
  Vue.prototype.$axGetValue = getValue
  Vue.prototype.$axFetchOptions = fetchOptions
}

export { 
  axios, 
  request,
  fetch,
  store,
  update,
  destroy,
  fetchPaginate,
  destroySingle,
  updateSingle,
  getXLS,
  getValue,
  fetchOptions
}