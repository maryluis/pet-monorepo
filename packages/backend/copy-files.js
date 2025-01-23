const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');

ncp.limit = 16;

const foldersToCopy = [
  { source: path.join(__dirname, '../api-urls'), dest: path.join(__dirname, 'src/common/api-urls') },
  { source: path.join(__dirname, '../constants'), dest: path.join(__dirname, 'src/common/constants') },
  { source: path.join(__dirname, '../types'), dest: path.join(__dirname, 'src/common/types') }
];

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

foldersToCopy.forEach(({ source, dest }) => {
  ensureDirSync(dest);

  ncp(source, dest, function (err) {
    if (err) {
      return console.error(`Error copying ${source}:`, err);
    }
    console.log(`Successfully copied from ${source} to ${dest}`);
  });
});
