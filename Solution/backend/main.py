from flask import Flask, request, jsonify
import boto3
from flask_cors import CORS
 

app = Flask(__name__)
CORS(app)

def connection():
   # Connect to DynamoDB
   dynamodb = boto3.resource('dynamodb', region_name='ap-south-1', aws_access_key_id='AKIAXYKJVS2ZY5TFNOQZ', aws_secret_access_key='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',endpoint_url='https://dynamodb.ap-south-1.amazonaws.com')
   table_name = 'updated_table'
   table = dynamodb.Table(table_name)
   return table


@app.route('/login', methods=['POST'])
def login():
   table = connection()
   data = request.get_json()
   first_name = data.get('firstName')
   last_name = data.get('lastName')
   birth_dt = data.get('dob')
   pincode = data.get('pincode')
   
   response = table.scan(
       FilterExpression='first_name = :fName and last_name = :lName and birth_dt = :dob and pincode = :pincode',
       ExpressionAttributeValues={
           ':fName': first_name,
           ':lName': last_name,
           ':dob': birth_dt,
           ':pincode': pincode
       }
   )  

   gymIds=[]
   for item in response['Items']:
      gymIds.append(item['gym_id'])

   count = response['Count']
   
   if 'Items in response' and count>0:
      return jsonify({'success': True, 'message': 'Login successfull','gymIds':gymIds})

   else:
       return jsonify({'success': False, 'message': 'User not found or incorrect details'})
 
if __name__ == '__main__':
   app.run(debug=True)
