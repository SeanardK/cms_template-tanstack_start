pipeline {
  agent any

  stages {
    stage('Prepare .env') {
      steps {
        withCredentials([file(credentialsId: 'seanard-portfolio_cms-env', variable: 'ENV_FILE')]) {
          sh 'cp $ENV_FILE .env'
        }
      }
    }

    stage('Docker Deploy') {
      steps {
        sh 'docker compose down && docker compose up -d --build'
      }
    }
  }

  post {
    success { echo 'Pipeline completed successfully.' }
    failure { echo 'Pipeline failed.' }
  }
}
