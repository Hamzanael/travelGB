const userSubscriber = () => {
    eventEmitter.on('test', (test) => {
        console.log('called from emitter ' + test.name)
    })
}

module.exports = userSubscriber