pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/jhhg04/devops-lab-jhhg04.git'
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker version'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t backend-app ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend-app ./frontend'
            }
        }

        stage('Create Env File') {
            steps {
                sh '''
                echo "MONGO_URI=mongodb://mongo:27017/devopsdb" > .env
                echo "PORT=5000" >> .env
                '''
            }
        }

        stage('Run App') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose up -d
                '''
            }
        }
    }
}