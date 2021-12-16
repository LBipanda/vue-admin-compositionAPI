const files = require.context('.', false, /\.js$/);
// console.log('file--------',files);
const modules = {};
files.keys().forEach((key) => {
    if (key === './index.js') return;
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});
// console.log('module--------', modules);
export default modules;
