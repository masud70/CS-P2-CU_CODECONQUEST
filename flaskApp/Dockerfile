FROM python:3.11.0

WORKDIR /mlApp

COPY requirements.txt .

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD [ "flask", "run", "--host=0.0.0.0", "--port=8080" ]