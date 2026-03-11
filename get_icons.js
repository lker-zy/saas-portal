const icons = require('simple-icons');

const brands = ['siFacebook', 'siGoogle', 'siSinaweibo', 'siWechat'];

brands.forEach(name => {
  const icon = icons[name];
  if (icon) {
    console.log(`\n// ${icon.title}`);
    console.log(`Path: ${icon.path}`);
    console.log(`Hex: #${icon.hex}`);
  } else {
    console.log(`\n// ${name} not found`);
  }
});

