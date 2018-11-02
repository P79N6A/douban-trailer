class Boy {
  @speak
  run() {
    console.log('I can run')
  }
}

function speak(target) {
  console.log(target)
}

const luke = new Boy()

luke.run()
