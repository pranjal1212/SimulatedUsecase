from flask import Flask, request, jsonify
import boto3
from flask_cors import CORS
 

app = Flask(__name__)
CORS(app)

def connection():
   # Connect to DynamoDB
   dynamodb = boto3.resource('dynamodb', region_name='ap-south-1', aws_access_key_id='AKIAXYKJVS2ZY5TFNOQZ', aws_secret_access_key='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',endpoint_url='https://dynamodb.ap-south-1.amazonaws.com')
   table_name = 'master'
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
   
   # response = table.scan(
   #     FilterExpression='first_name = :fName and last_name = :lName and birth_dt = :dob and pincode = :pincode',
   #     ExpressionAttributeValues={
   #         ':fName': first_name,
   #         ':lName': last_name,
   #         ':dob': birth_dt,
   #         ':pincode': pincode
   #     }
   # )  
   # Define your filter expression and attribute values
   filter_expression = "first_name = :first_name_val AND last_name = :last_name_val AND birth_dt = :birth_val AND pincode = :pincode_val"
   #expression_attribute_names = {'#s': 'state'}
   expression_attribute_values = {
      ":first_name_val": first_name,
      ":last_name_val": last_name,
      ":birth_val": birth_dt,
      ":pincode_val": pincode
   }
   # Initialize an empty list to store all items
   all_items = []
   # Perform the initial scan operation
   response = table.scan(
      FilterExpression=filter_expression,
      #ExpressionAttributeNames=expression_attribute_names,
      ExpressionAttributeValues=expression_attribute_values
   )
   # Add the items from the first page to the list
   all_items.extend(response['Items'])
   # Continue scanning through pages until there are no more pages left
   while 'LastEvaluatedKey' in response:
      response = table.scan(
         FilterExpression=filter_expression,
         #ExpressionAttributeNames=expression_attribute_names,
         ExpressionAttributeValues=expression_attribute_values,
         ExclusiveStartKey=response['LastEvaluatedKey']
      )
   all_items.extend(response['Items'])

   if 'Items in response' and len(all_items) == 1:
      return jsonify({'success': True, 'message': 'Login successfull'})
   
   elif len(all_items)>1:
      return jsonify({'success':False, 'message':'Duplicate data found'})

   else:
       return jsonify({'success': False, 'message': 'User not found or incorrect details'})
 
if __name__ == '__main__':
   app.run(debug=True)
