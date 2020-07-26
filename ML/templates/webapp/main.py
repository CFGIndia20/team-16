import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask import jsonify
from flask import flash, request

app = Flask(__name__)
 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/ngo'
db = SQLAlchemy(app)
model = pickle.load(open('count_vect.pkl', 'rb'))
model1 = pickle.load(open('text_model.pkl', 'rb'))

class Category(db.Model):
   
    S_no = db.Column(db.Integer, primary_key=True)
    user_text = db.Column(db.String(80), nullable=False)
    categ = db.Column(db.String(12), nullable=False)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict',methods=['GET', 'POST'])
def predict():
    
    int_features = [str(x) for x in request.form.values()]
    #final_features = [np.array(int_features)]
    prediction = model.transform(int_features)
    pred = str(model1.predict(prediction))

    if(request.method=='POST'):
        '''Add entry to the database'''
        user_text = request.form.get('user_text')
        categ = str(pred)
        entry = Category(user_text= user_text,categ=categ )
        db.session.add(entry)
        db.session.commit()
		
    return render_template('index.html', prediction_text='  Issue Category {}'.format(pred))



   
@app.route('/results',methods=['POST'])
def results():

    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    return jsonify(prediction)


   

if __name__ == "__main__":
    app.run(debug=True)
