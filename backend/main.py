from flask import Flask, request
import boto3
import random
from flask_cors import CORS
 

app = Flask(__name__)
CORS(app)

def connection():
   # Connect to DynamoDB
   dynamodb = boto3.resource('dynamodb', region_name='ap-south-1', aws_access_key_id='', aws_secret_access_key='',endpoint_url='https://dynamodb.ap-south-1.amazonaws.com')
   table_name = 'master_gym'
   table = dynamodb.Table(table_name)
   return table


@app.route('/getall')
def home():
   # Get table data
   table = connection()
   response = table.scan()
   items = response['Items']
   # Print table data
   for item in items:
       print(item)
   return {"response" : items}

@app.route("/register" , methods = ['POST'])
def register():
   if(request.data):
      
      customer_id = random.randint(100000, 999999)
      print(customer_id)
      response = request.get_json()
      print(response)
      response["customer_id"] = f"{customer_id}"
      table = connection()
      table.put_item(Item = response)
      return {"response" : response}
   else:
      return {"response" : "No Data Found"}

   
@app.route("/getbyid")
def getById():
   table = connection()
   customerId = request.args.get('Customer_ID') 
   response = table.get_item(Key = {"customer_id": customerId})
   return {"response" : response["Item"]}

   
                  
if __name__ == '__main__':
   app.run(debug=True)
