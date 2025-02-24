pipeline {
    agent any

    stages {
        stage('Node.js Deps') {
            steps {
                echo 'Iniciando instalação das dependências do Node.js'
                sh 'npm install'
            }
        }
        stage('Testes E2E') {
            steps {
                echo 'Executando os testes E2E'
                sh 'npx plaiwrigth test'
            }
        }
    }
}