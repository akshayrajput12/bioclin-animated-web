@echo off
cd /d "f:\web devs\bioclinpharm redesigned"
git merge --abort
git reset --hard HEAD
git clean -fd
git status
