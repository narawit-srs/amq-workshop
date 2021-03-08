pipeline {
    agent any
    stages {
        stage('build project') {
            steps {
                openshift.withCluster("sirisoft-openshift")
            }
        }
    }
}