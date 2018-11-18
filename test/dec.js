class Boy {
  @speak('zhongwen')
  run() {
    console.log('I can run')
    console.log(this.language)
  }
}

function speak(language) {
  return function(target, key, decorator) {
    console.log(target)
    console.log(key)
    console.log(decorator)
    target.language = language
    return decorator
  }
}

const luke = new Boy()

luke.run()
