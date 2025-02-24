pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.1-noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('NPM Install') {
            steps {
                echo 'Iniciando instalação das dependências do Node.js'
                sh 'npm install'
            }
        }
        stage('Node.js Deps') {
            steps {
                echo 'Iniciando instalação das dependências do Node.js'
                sh 'npm install'
            }
        }
        stage('Testes E2E') {
            steps {
                echo 'Executando os testes E2E'
                sh 'npx playwright test'
            }
        }
    }
}