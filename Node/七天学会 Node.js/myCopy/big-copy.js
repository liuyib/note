var fs = require('fs');

function copy(source, target) {
  fs.createReadStream(source).pipe(fs.createWriteStream(target));
}

function main(src) {
  copy(src[0], src[1]);
}

main(process.argv.slice(2));

// 在命令行中执行命令 node big-copy.js /opt/aaa.pdf /tmp/test/bbb.pdf 
// 即可将 /opt/aaa.pdf 复制到 /tmp/test/bbb.pdf 中。（复制的时候会自动创建 bbb.pdf 文件）
// 这个复制操作适用于大文件的拷贝