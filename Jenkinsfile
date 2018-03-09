node("android") {
  stage("Checkout") {
    checkout scm
  }

  stage("Build") {
    sh 'chmod +x ./gradlew'
    sh './gradlew clean assembleDebug' // builds app/build/outputs/apk/app-debug.apk
  }

  stage("Archive") {
    archiveArtifacts artifacts: 'app/build/outputs/apk/debug/app-debug.apk'
    stash name: 'apk', includes: 'app/build/outputs/apk/debug/app-debug.apk'
  }
}

node("appium") {
  stage("Checkout") {
    checkout scm
    unstash name: 'apk'
  }

  stage("Test") {
    dir('test') {
      try {
        sh 'appium &'
        sh 'sleep 10'
        sh 'npm install'
        sh 'npm start'
      } finally {
        sh 'lsof -i tcp:4723 | grep LISTEN | awk \'{print $2}\' | xargs kill'
      }
    }
  }
}