from model import Todo

# MongoDB driver
import motor.motor_asyncio

# client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://root:password@localhost:27017')

database = client.TodoList
collection = database.todo

# Get One
async def fetch_one_todo(title):
    document = await collection.find_one({"title":title})
    return document

# Get All
async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

# Create
async def create_todo(todo):
    result = await collection.insert_one(todo)
    return result

# Update
async def update_todo(title, desc):
    await collection.update_one({"title":title},{"$set":{
        "description":desc
    }})
    document = await collection.find_one({"title":title})
    return document

# Delete
async def remove_todo(title):
    await collection.delete_one({"title":title})
    return True