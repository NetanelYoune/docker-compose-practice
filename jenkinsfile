pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh 'cd frontend && npm install'
                sh 'cd frontend && npm run build'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t netanelyihune/frontend:v2 ./frontend'
                sh 'docker build -t netanelyihune/backend:v3 ./backend'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh 'echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                    sh 'docker push netanelyihune/frontend:v2'
                    sh 'docker push netanelyihune/backend:v3'
                }
            }
        }
    }
}
