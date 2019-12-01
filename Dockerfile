FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /website
WORKDIR /website
RUN pip install --upgrade pip
COPY . .
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN find . -type f -name *.pyc -delete