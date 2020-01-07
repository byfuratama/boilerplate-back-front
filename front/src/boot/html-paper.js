// import something here

// "async" is optional
export default async ({ Vue }) => {
  console.log('window',window)
  console.log('document',document)
  Vue.prototype.$htmlPrint = (el,cb = () => true) => {
    console.log('windowx',window)
    console.log('documentx',document)
    let name = '_blank'
    let specs = ['fullscreen=yes','titlebar=yes', 'scrollbars=yes']
    let replace = true
    specs = !!specs.length ? specs.join(',') : '';

    const element = document.getElementById(el);

    if(!element) {
      alert(`Element to print #${el} not found!`);
      return;
    }

    const url = '';
    const win = window.open(url, name, specs, replace);

    win.document.write(`
      <html>
        <head>
          <title>${document.title}</title>
        </head>
        <body>
          ${element.innerHTML}
        </body>
      </html>
    `);

    setTimeout(() => {
      win.document.close();
      win.focus();
      win.print();
      win.close();
      cb();
    }, 100);          
    return true;
  }
};
