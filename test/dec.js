class Boy {
  @speak('zhongwen')
  run() {
    console.log('I can run')
    console.log(this.language)
  }
}

function speak(language) {
  return function(target, key, decorator) {
    target.language = language
    return decorator
  }
}

const luke = new Boy()

luke.run()
