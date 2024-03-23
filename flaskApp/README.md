# FLask App Initialization

## Environment Setup
Go to this [page](https://flask.palletsprojects.com/en/latest/installation/#virtual-environments) and install a virtual environment following the instructions first, in your local machine. However, the instructions are listed below:
1. Creating the virtual environment for a python project:
    * Run `py -m venv .<virtual environment name>`. Usually we run this command like: `py -m venv .venv` through which a folder named __*.venv*__ will be created with necessary files for a virtual environment. In case you want to know why we use virtual environment, go through this [page](https://virtualenv.pypa.io/en/stable).
2. Activate the virtual environment:
    * Run `./.<virtual environment name>/Scripts/activate` to activate the virtual environment in windows. In linux or MacOS run `. .<virtual environment name>/bin/activate`. Usually we run like: `./.venv/Scripts/activate`. 
    * Sometimes you may fail to activate. In that you just change the directory to __*Scripts*__ folder and then run the __*activate.bat*__ file. To change the directory run: `cd ./.venv/Scripts`.
    * Hopefully your virtual environment is now activated in the terminal. Don't close it since we will be using this terminal to work further.
3. Now install the dependencies in your virtual environment.
    * Run `pip install -r requirements.txt`. 
    * In case this fails run, `py -m pip install -r requirements.txt`. 
    * In case you still fail to run it, check the current directory and change it to the flaskApp project folder if not so and then try again.
4. Install Flask:
    * Run `pip install Flask`
5. Run the Flask App:
    * Since we are using __app.py__ as our root file we can easily run the app by running `flask run`.
    * In case the rooot file isn't named with __app.py__, run  `flask --app <file_name> run` and your app will run at the default port (`5000`).

## Note
> Please Note that sometimes the app will not get refreshed any changes you make in a file. It is because you didn't start the app in a development server. To enable the development mood, flask allows us to run with __debug__ option. There are [multiple options](https://flask.palletsprojects.com/en/latest/quickstart/#debug-mode) to run the app in debugging mood. But the simplest is to run the app with a flag: `flask run --debug` or `flask --app <file_name> run --debug`.
#
#
#
>>>Thank you
