from flask import Flask, request, jsonify
import boto3
import random
from flask_cors import CORS
 

app = Flask(__name__)
CORS(app)

def connection():
   # Connect to DynamoDB
   dynamodb = boto3.resource('dynamodb', region_name='ap-south-1', aws_access_key_id='AKIAXYKJVS2ZY5TFNOQZ', aws_secret_access_key='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',endpoint_url='https://dynamodb.ap-south-1.amazonaws.com')
   table_name = 'master'
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


@app.route("/duplicate")
def getDuplicate():
   table = connection()
   firstName = request.args.get('First_name')
   lastName = request.args.get('Last_name')
   birthDate = request.args.get('Birth_Date')
   categoryType = request.args.get('Category_Type')
   gymId = request.args.get('Gym_ID')
   city = request.args.get('City')
   stateVal = request.args.get('State')
   country = request.args.get('Country')
   pincode = request.args.get('Pincode')
   response = table.scan(
      FilterExpression="first_name = :first_name_val AND last_name = :last_name_val AND birth_dt = :birth_val AND category_type = :category_val AND gym_id = :gym_val AND city = :city_val AND #s =:state_val AND country =:country_val AND pincode = :pincode_val",
      ExpressionAttributeNames={
         '#s' : 'state'
      },
      ExpressionAttributeValues={
         ":first_name_val": firstName,
         ":last_name_val": lastName,
         ":birth_val" : birthDate,
         ":category_val" : categoryType,
         ":gym_val" : gymId,
         ":city_val" : city,
         ":state_val": stateVal,
         ":country_val": country,
         ":pincode_val": pincode
      }
   )
   if response["Count"] > 0:
      return response
   else:
      return "None"
   
@app.route("/duplicateCustomer")
def getDuplicateCus():
   table = connection()
   firstName = request.args.get('First_name')
   lastName = request.args.get('Last_name')
   birthDate = request.args.get('Birth_Date')
   categoryType = request.args.get('Category_Type')
   gymId = request.args.get('Gym_ID')
   city = request.args.get('City')
   stateVal = request.args.get('State')
   country = request.args.get('Country')
   pincode = request.args.get('Pincode')
   response = table.scan(
      FilterExpression="first_name = :first_name_val AND last_name = :last_name_val AND birth_dt = :birth_val AND  city = :city_val AND #s =:state_val AND country =:country_val AND pincode = :pincode_val",
      ExpressionAttributeNames={
         '#s' : 'state'
      },
      ExpressionAttributeValues={
         ":first_name_val": firstName,
         ":last_name_val": lastName,
         ":birth_val" : birthDate,
         ":city_val" : city,
         ":state_val": stateVal,
         ":country_val": country,
         ":pincode_val": pincode
      }
   )
   if response["Count"] > 0:
      return response["Items"][0]["customer_id"]
   else:
      return "None"
   

def checkDuplicate(table, firstName, lastName, birthDate, categoryType, gymId, city, stateVal, country, pincode):
   response = table.scan(
      FilterExpression="first_name = :first_name_val AND last_name = :last_name_val AND birth_dt = :birth_val AND category_type = :category_val AND gym_id = :gym_val AND city = :city_val AND #s =:state_val AND country =:country_val AND pincode = :pincode_val",
      ExpressionAttributeNames={
         '#s' : 'state'
      },
      ExpressionAttributeValues={
         ":first_name_val": firstName,
         ":last_name_val": lastName,
         ":birth_val" : birthDate,
         ":category_val" : categoryType,
         ":gym_val" : gymId,
         ":city_val" : city,
         ":state_val": stateVal,
         ":country_val": country,
         ":pincode_val": pincode
      }
   )
   print(response)
   if response["Count"] > 0:
      return True
   else:
      return False

@app.route("/register" , methods = ['POST'])
def register():
   if(request.data):
      table = connection()
      response = request.get_json()
      print(response)
      result = checkDuplicate(table, response["first_name"] , response["last_name"], response["birth_dt"], response["category_type"], response["gym_id"], response["city"], response["state"], response["country"], response["pincode"])

      if result == False:
         customer_id = str(random.randint(100000, 999999))
         # customer_id = "969650"
         print(customer_id)
         while True:
            response1 = table.get_item(Key = {"customer_id": customer_id})
            if 'Item' in response1:
               customer_id = str(random.randint(100000, 999999))
            else:
               break
         print(customer_id)
         
         response["customer_id"] = f"{customer_id}"
         table.put_item(Item = response)
         return {"response" : response}
      else:
         return {"response" : "Duplicate"}
   else:
      return {"response" : "No Data Found"}

   
@app.route("/getbyid")
def getById():
   table = connection()
   customerId = request.args.get('Customer_ID') 
   print(type(customerId))
   response = table.get_item(Key = {"customer_id": customerId})
   return {"response" : response["Item"]}

@app.route('/login', methods=['POST'])
def login():
   table = connection()
   data = request.get_json()
   first_name = data.get('firstName')
   last_name = data.get('lastName')
   birth_dt = data.get('dob')
   pincode = data.get('pincode')

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
