pipeline {
    
    environment {
        registry = "narawitrt/amq-workshop"
        registryCredential = 'dockerhub'
    } 

     agent any

    stages {
        stage('Building image') {
            steps{
                script {
                    withEnv(["PATH+OC=${tool 'docker'}"]) {
                    app = docker.build registry + ":latest"
                    }
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                    withEnv(["PATH+OC=${tool 'docker'}"]) {
                docker.withRegistry('https://registry.hub.docker.com', '') {
                    app.push()
                }
                    }
                }
            }
        }
        stage('Get token via Plugins') {
            steps {
                script {
                    withEnv(["PATH+OC=${tool 'oc'}"]) {
                        openshift.withCluster("sirisoft-openshift") {
                            openshift.withProject("amq-dev") {
                                openshift.raw("login", "--token='' --username=narawit --password=ocp2020")

                                def token = openshift.raw("whoami", "--token='' -t")
                                echo "token == ${token.out}"
                            }
                        }
                    }
                }
            }
        }
    }
}