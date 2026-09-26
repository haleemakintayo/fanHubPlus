@echo off
cd FanHubPlus_backend
call venv\Scripts\activate
python manage.py runserver
cmd