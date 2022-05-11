pipeline {
  agent any

  environment {
    dockerHome = tool 'myDocker'
    PATH = "$dockerHome/bin:$PATH"
  }
  stages {
    stage('Checkout') {
      steps {
        sh 'docker version'
        echo "Build"
        echo "PATH - $PATH"
        echo "BUILD_NUMBER - $env.BUILD_NUMBER"
        echo "BUILD_ID - $env.BUILD_ID"
        echo "JOB_NAME - $env.JOB_NAME"
        echo "BUILD_TAG - $env.BUILD_TAG"
        echo "BUILD_URL - $env.BUILD_URL"
      }

    }
    stage("Compile") {
      steps {
        sh "npm run build"
      }
    }
    stage("Unit Test") {
      steps {
        sh "npm run test"
      }
    }
    stage("Integration Test") {
      steps {
        echo 'Integration Test'
      }
    }
  }
  
}