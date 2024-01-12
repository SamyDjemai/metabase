git reset HEAD~1
rm ./backport.sh
git cherry-pick dc4cc6aedda5af6621aa6b2ef797b3120aea4b2a
echo 'Resolve conflicts and force push this branch'
