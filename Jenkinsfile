node {
  checkout scm
  stage 'Building image'
  def customImage = docker.build "fzsport/test"
  stage 'Push image'
  customImage.push('latest')
}