pipeline {
    agent any
    stages {
    stage ('Get token via Plugins') {
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