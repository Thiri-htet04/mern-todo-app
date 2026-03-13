pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh '''
          set -e
          cd TODO/todo_backend
          npm install

          cd ../todo_frontend
          npm install
          npm run build

          cd ../todo_backend
          mkdir -p static
          rm -rf static/build
          cp -r ../todo_frontend/build static/
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          set -e
          test -f TODO/todo_backend/server.js
          test -f TODO/todo_backend/models/Todo.js
          test -d TODO/todo_backend/static/build
          echo "Smoke checks passed"
        '''
      }
    }

    stage('Containerise') {
      steps {
        sh '''
          docker build -t finead-todo-app:latest .
        '''
      }
    }

    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          sh '''
            echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
            docker tag finead-todo-app:latest "$DOCKERHUB_USER/finead-todo-app:latest"
            docker push "$DOCKERHUB_USER/finead-todo-app:latest"
          '''
        }
      }
    }
  }
}