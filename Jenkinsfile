pipeline {
    agent any
    stages {
        stage('Get token via Plugins') {
            steps {
                app = docker.build("narawitrt/amq-workshop")
            }
        }
        stage('Push image') {
            steps {
                docker.withRegistry('https://registry.hub.docker.com', 'git') {
                    app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
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