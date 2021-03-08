pipeline {
    agent any
    stages {
        stage('build project') {
            steps {
                sh '''
                oc login -u narawit -p ocp2020 -n amq-dev
                oc new-app --docker-image=narawitrt/amq-workshop --name=amq-workshop
                '''
            }
        }
    }
}