var fs = require('fs');

/**
 * 复制文件
 * @param {String} source 复制源文件
 * @param {String} target 复制目标文件
 */
function copy(source, target) {
  fs.writeFileSync(target, fs.readFileSync(source));
}

/**
 * 接收一个路径数组，进行复制文件
 * @param {Array} src 复制文件的路径
 */
function main(src) {
  copy(src[0], src[1]);
}

// process 是一个全局的变量。process.argv 用于获取命令行中的参数
main(process.argv.slice(2));

// 命令行中执行 node small-copy.js /opt/aaa.txt /tmp/bbb.txt
// 然后 /opt/aaa.txt 文件里的内容就会被复制到 /tmp/bbb.txt 里。（复制的时候会自动创建 bbb.txt 文件）
// 这个复制操作只适用于小文件的拷贝