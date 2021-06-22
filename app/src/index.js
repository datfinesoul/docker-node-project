const axios = require('axios')
const sleep = t => new Promise(resolve => setTimeout(resolve, t))
const jsonlog = v => console.log(JSON.stringify({
  ...{_ts: (new Date()).getTime()}, ...v
}, null, 0))

/*
 * Concurrency control method
 */
const doWork = async ({ numWorkers = 1, assignments, plan }) => {
  // loads assignments into an iterable
  const workload = Array.from(assignments).entries()
  // - create an array with sized based on the number of available workers
  // - each array element has the same iterator with the workload iterator
  const results = new Array(assignments.length)
  const work = Array(numWorkers).fill(workload).map(async (tasks, worker) => {
    for (const [index, task] of tasks) {
      results[index] = await plan(task, worker, index)
    }
  })
  await Promise.all(work)
  return results
}

/*
 * Method applied to workload
 */
const sleepAndLog = async (task, worker, index) => {
  const now = new Date()
  const payload = encodeURIComponent(task)
  const result = await axios(`http://web:7778/echo/?v=${payload}`)
  const {v: item} = result.data
  // if ([5, 10, 17].includes(index)) {
  //  throw new Error('test');
  // }
  jsonlog({
    worker, index, item, duration: (new Date()) - now
  })
  return item
}

/*
 * Main
 */
(async () => {
  const data = 'Falsches Üben von Xylophonmusik quält jeden größeren Zwerg';
  const result = await doWork({
    numWorkers: 3,
    assignments: data,
    plan: sleepAndLog
  })
  jsonlog({result: result.join('')})
})()
