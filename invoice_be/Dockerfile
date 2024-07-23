FROM python:3.10.6-slim-buster

RUN apt-get update && apt install -y build-essential libpq-dev python3-dev
RUN apt-get -y install tk-dev fontconfig xfonts-base xfonts-75dpi wget wkhtmltopdf


COPY requirements.txt /tmp/
# COPY latest_packages_2.txt /tmp/

# upgrade pip and install required python packages
RUN pip install -U pip
RUN pip install psycopg2-binary

# RUN pip install -r /tmp/requirements_for_docker.txt
RUN pip install -r /tmp/requirements.txt
# RUN pip install -r /tmp/latest_packages_2.txt

# RUN pip install flask-jwt-extended
# RUN pip install Werkzeug==2.1.2

# copy over our app code
#COPY . .

# set an environmental variable, MESSAGE,
# which the app will use and display

#RUN mkdir -p /home/app/profile_pics

EXPOSE 8000
WORKDIR /home/app

#CMD ["python", "manage.py", "runserver",  "0.0.0.0:8000"]
#CMD ["sleep", "infinity"]
ENTRYPOINT ["bash", "entrypoint.sh"]
#CMD ["flask","run", "--host=0.0.0.0", "--port=5000"]
#CMD ["python3","app.py"]

