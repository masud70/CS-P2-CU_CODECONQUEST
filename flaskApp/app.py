from flask import Flask, request, render_template, jsonify
from utilities import prediction

app = Flask(__name__)

# Route to handle GET requests for prediction
@app.route('/predict', methods=['GET'])
def predict():
    input_value = 10
    try:
        input_value = float(request.args.get('input'))
    except ValueError:
        return jsonify({'error': 'Invalid input value. Must be a number.'}), 400
    
    return jsonify(prediction(input_value))

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

@app.route("/",methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print('POST')
    else:
        print("GET")

    return "<h1>Hello, CU_CODECONQUEST!</h1>"



# @app.route("/testWithData/<data>")
# def new(data):
#     print(data)
#     return "<h2>Testing This</h2>"



# @app.get('/testWithData')
# def testWithDataGet():
#     return "How are you?"


# @app.route('/hello/<name>')
# def hello(name=None):
#     return render_template('hello.html', name=name)

if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)