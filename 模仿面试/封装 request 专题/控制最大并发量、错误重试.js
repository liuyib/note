/** 默认参数 */
const DEFAULT_OPTIONS = {
  /** 错误最大重试次数 */
  retryCount: 3,
  /** 错误重试前等待的时间 */
  retryWaitTime: 1000 * 3,
  /** 最大并发数量 */
  concurrentCount: 5,
  /** 并发过程中的回调（用于获取请求进度） */
  onProgress: () => {}
};

async function sleep(time) {
  return await new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 重试函数包装器
 * @param {Function} fn 要重试的函数
 * @param {number} options.retryCount 错误最大重试次数
 * @param {number} options.retryWaitTime 错误重试前等待的时间
 * @returns result | errorMsg
 */
async function retryWrapper(fn, options = {}) {
  const { retryCount, retryWaitTime } = { ...DEFAULT_OPTIONS, ...options };
  let count = retryCount;

  while (count > 0) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      console.log(
        `${fn.name} 函数请求出错，将在 ${retryWaitTime} 毫秒后重试，剩余重试次数 ${count} 次`
      );
      count--;
      await sleep(retryWaitTime);
    }
  }

  const msg = `${fn.name} 函数请求结束，已超出失败最大重试次数`;

  console.log(msg);
  throw msg;
}

/**
 * 并发控制
 * @param {Promise[]} tasks 需要并发控制的请求任务
 * @param {number} options.concurrentCount 最大并发数量
 * @param {number} options.onProgress 并发过程中的回调（用于获取请求进度）
 * @param {*} rest 同 retryWrapper 函数的参数
 * @returns [results, errors]
 */
async function concurrent(tasks, options = {}) {
  const { concurrentCount, onProgress, retryCount, retryWaitTime } = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  // 任务池（原始任务、重试任务）
  const tasksPool = new Set();
  const results = [];
  const errors = [];

  for (const [index, task] of tasks.entries()) {
    const promise = retryWrapper(task, { retryCount, retryWaitTime })
      .then((data) => (results[index] = data))
      .catch((error) => (errors[index] = { task, error }))
      .finally(() => tasksPool.delete(promise));

    tasksPool.add(promise);
    onProgress(index, task);

    // 达到上限后，等待任意一个任务执行完成
    if (tasksPool.size >= concurrentCount) {
      await Promise.race(tasksPool);
    }
  }

  // 等待其中所有任务做完（做完指：完成或失败）
  await Promise.allSettled(tasksPool);

  return [results, errors];
}

// -------- test case --------

const loadData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.25) {
        resolve(`success ${Date.now()}`);
      } else {
        reject(`fail ${Date.now()}`);
      }
    }, 2000);
  });
};

const tasks = Array(20).fill(loadData);
async function run() {
  const [results, errors] = await concurrent(tasks, {
    onProgress: (index) => {
      console.log(`onProgress 处理中，当前索引：${index}`);
    }
  });

  console.log(`results -->`, results);
  console.log(`errors -->`, errors);
}

run();
