# project level migrations
python manage.py makemigrations
python manage.py migrate 

#app level migration
python manage.py makemigrations invoice_app
python manage.py migrate invoice_app

#server run cmd
python manage.py runserver 0.0.0.0:8000

