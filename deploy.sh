cd client
npm run build
cd ..
git add .
git commit -m 'deploy'
git checkout main
git merge fuksipassi-react
git push heroku main
git checkout fuksipassi-react