pipeline {
    agent any
    
    environment {
        BRANCH = "${BRANCH}"
        HOST_NAME = "${HOST_NAME}"
        PROFILE = "${PROFILE}"
        GIT_PATH = 'https://gitlab.filadev.com/erp/fh/cm/fila-cm-web.git'
        REMOTE_PATH = '/app/deploy/cm-vue'
    }
    
    stages {
        stage('Git Clone') {
            steps {
                cleanWs()
                git branch: "$BRANCH", credentialsId: 'fila_ERP_AA', url: "$GIT_PATH"
            }
        }
        
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: '18') {
                    sh """
                        echo BUILD START
                        cd $WORKSPACE
                        npm cache verify
                        npm install
                        npm run build-$PROFILE
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                sh """
                    echo DEPLOY START
                    cd $WORKSPACE
                    tar -cvf dist.tar dist
                """
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$HOST_NAME",
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: """
                                                    cd $REMOTE_PATH
                                                    rm -rf dist
                                                    tar -xvf dist.tar
                                                    mv dist_* backup/ 
                                                    mv dist.tar "dist_\$(date '+%Y%m%d%H%M%S').tar"
                                                    cd backup/
                                                    ls -t | tail -n +6 | xargs rm
                                                """,
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: "/$REMOTE_PATH",
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: 'dist.tar'
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: true
                        )
                    ]
                )
            }
        }
    }
    
    post {
        success {
            echo "========pipeline executed successfully ========"
        }
        failure {
            echo "========pipeline executed failed ========"
        }
    }
}
