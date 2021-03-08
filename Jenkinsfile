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
                    docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Push image') {
            steps {
                script {
                docker.withRegistry('https://registry.hub.docker.com', 'git') {
                    app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
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