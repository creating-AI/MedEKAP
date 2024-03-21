FROM python:3.12  

RUN mkdir -p /app/backend
WORKDIR /app/backend 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1  

RUN pip install --upgrade pip  

COPY . /app/backend 

RUN pip install -r requirements.txt  

EXPOSE 8000  

CMD python manage.py runserver  
