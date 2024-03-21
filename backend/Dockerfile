FROM python:3.12  

RUN mkdir -p /backend
WORKDIR /backend 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

RUN pip install --upgrade pip  

COPY requirements.txt /backend/ 

RUN pip install -r requirements.txt  

COPY . /backend/ 

EXPOSE 8000  

CMD python manage.py makemigrations \
    && python manage.py migrate \
    && python manage.py runserver 0.0.0.0:8000
