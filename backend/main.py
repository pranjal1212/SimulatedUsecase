from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1', aws_access_key_id='AKIAXYKJVS2ZY5TFNOQZ', aws_secret_access_key='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',endpoint_url='https://dynamodb.ap-south-1.amazonaws.com')
table_name = 'updated_table'
table = dynamodb.Table(table_name)
gyms_table=dynamodb.Table(table_name)

@app.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   first_name = data.get('firstName')
   last_name = data.get('lastName')
   birth_dt = data.get('dob')
   pincode = data.get('pincode')

   gym_id=[]
   last_evaluated_key = None
   while True:
      scan_params = {
         'FilterExpression':'first_name = :fName and last_name = :lName and birth_dt = :dob and pincode = :pincode',
         'ExpressionAttributeValues':{
            ':fName': first_name,
            ':lName': last_name,
            ':dob': birth_dt,
            ':pincode': pincode
         }
      }
      if last_evaluated_key:
         scan_params['ExclusiveStartKey']=last_evaluated_key
      
      response = table.scan(**scan_params)

   #print(response)
      for item in response['Items']:
         gym_id.append(item['gym_id'])
      last_evaluated_key=response.get('LastEvaluatedKey')
      if not last_evaluated_key:
         break
   count=response['Count']

   if 'Items in response' and count > 0:
      return jsonify({'success': True, 'message': 'Login successfull','gym_id':gym_id})
   
   # elif count>1:
   #    return jsonify({'success':False, 'message':'Duplicate data found'})
   else:
       return jsonify({'success': False, 'message': 'User not found or incorrect details'}), 404
     

if __name__ == '__main__':
   app.run(debug=True)