// import something here

// "async" is optional
export default async ({Vue}) => {
  Vue.prototype.$array_duplicate = (arr,valComp = null) => {
    let object = {};
    let result = [];
    
    let vc = valComp

    if (valComp == null) {
      vc = (item) => item
    }

    arr.forEach((item) => {
      let val = vc(item)
      if(!object[val])
        object[val] = 0;
      object[val] += 1;
    })

    for (var prop in object) {
      if(object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result;
  }

  Vue.prototype.$array_filter = (arr, val, label = "label") => {
    const needle = val.toLowerCase()
    return arr.filter(v => v[label].toLowerCase().indexOf(needle) > -1)
  }

  Vue.prototype.$array_group = (objectArray, property) => {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  Vue.prototype.$async_sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  Vue.prototype.$test_kapal = ['KM. Mulia Sejahtra', 'KM. Segara Ayu', 'KM. Baruna Swaha','KM. Tangguh Perkasa', 'KM. Tirta Mutiara']
  Vue.prototype.$test_asal = ['Banjarmasin','Tanjung Priok','Surabaya','Kalimantan Selatan']
  Vue.prototype.$test_pemilik = ['PT. Japri','PT. Yosha','PT. Kazusa','PT. Momo']
  Vue.prototype.$test_barang = ['Semen Conch@40kg','Semen Tiga Roda@40kg', 'Semen Holcim@40kg']
  Vue.prototype.$array_rand = (array) => array[Math.floor(Math.random() * array.length)];
  Vue.prototype.$array_select = (arr) => arr.map(v => {return {label: v, value: v}})

}
