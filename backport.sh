git reset HEAD~1
rm ./backport.sh
git cherry-pick a504c8b87a8906c38c6342a537afb140f1a39ae9
echo 'Resolve conflicts and force push this branch'
