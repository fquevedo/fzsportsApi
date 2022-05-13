pipeline {
  agent any

  environment {
    dockerHome = tool 'myDocker'
    nodeHome = tool 'myNode'
    PATH = "$dockerHome/bin:$nodeHome/bin:$PATH"
    registryName = "timining"
    registryUrl = "timining.azurecr.io"
    registryCredential = "ACR"

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
    stage("Build App") {
      steps {
        echo 'installing dependencies..'
        sh "npm install"
        echo 'preparing some necesary stuffs (db)'
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
    stage("Build Docker Image") {
      steps {
        echo "Build Docker Image fquevedo/fzsports:${env.BUILD_TAG}"
        script {
          dockerImage = docker.build("fquevedo/fzsports:${env.BUILD_TAG}")
        }
      }
    }
    stage("Push Docker Image") {
      steps {
        echo 'Push Docker Image'

        script {
          docker.withRegistry( "http://${registryUrl}", registryCredential)
          dockerImage.push()
        }
      }
    }
  }
  
}