const memo = {};

const request = async function (url, { method, params, data, ...options }) {
  const getUid = () => {
    const paramsStr = JSON.stringify(params);
    const dataStr = JSON.stringify(data);

    return `url=${url}&method=${method}&params=${paramsStr}&data=${dataStr}`;
  };

  const uid = getUid();

  if (memo[uid]) {
    return new Promise((resolve, reject) => {
      memo[uid].push({
        resolve,
        reject
      });
    });
  }

  memo[uid] = [];

  return fetch(url, {
    method,
    params,
    body: data,
    ...options
  })
    .then((res) => res.json())
    .then((res) => {
      for (const { resolve } of memo[uid]) {
        resolve(res);
      }

      return res;
    })
    .catch((err) => {
      for (const { reject } of memo[uid]) {
        reject(err);
      }
    });
};

for (let i = 0; i < 5; i++) {
  // 这里需要自行建个 JSON 文件，然后起个静态资源服务器，然后把整个文件的代码粘贴到浏览器控制台，即可看到 Network 中发送的请求数量
  request('http://127.0.0.1:8080/test.json', {
    method: 'GET',
    params: { foo: 1, bar: 2 }
  }).then((res) => {
    console.log('res -->', res);
  });
}
