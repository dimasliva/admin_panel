pipeline {
    agent none
    options { skipDefaultCheckout(true) }
    stages {
        stage('Checkout repository') { 
            agent any
            steps {
                checkout scm
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:14.16.1-alpine'
                }
            }
            steps {
                sh 'npm install'
                sh 'CI= npm run build:production '
            }
        }
        stage('Docker build') {
            agent any
            steps {
                sh 'docker build -t thekking-cms:latest .'
            }
        }
        stage('Docker run') {
            agent any
            steps {
                sh 'docker ps -f name=nginx-react -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=nginx-react -q | xargs -r docker container rm'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh 'docker run -d --name nginx-react -p 80:80 thekking-cms:latest'
            }
        }
    }
}