from django.shortcuts import render
import json
from django.contrib.auth.models import User
from .serializers import MealSerializer, IngredientSerializer
from .models import Meal, Ingredient
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse

# Create your views here.

@csrf_exempt
def meal_detail(request, meal_id):
    meal = Meal.objects.get(id=meal_id)
    if (request.method == 'GET'):
        ingredients = meal.ingredient_set.all()
        serialized_meal = MealSerializer(meal)
        serialized_ingr = IngredientSerializer(ingredients, many=True)
        return JsonResponse({'status': '200', 'meal': serialized_meal.data, 'ingredients': serialized_ingr.data})
    elif (request.method == 'DELETE'):
        meal.delete()
        return JsonResponse({'status': '205'})

        

@csrf_exempt
def submit_meals(request):
    if (request.method == 'POST'):
        user = request.user
        data = json.loads(request.body)
        name = data['name']
        meal_type= data['type']
        ingredients = data['ingredients']
        new_meal = Meal.objects.create(user=user, name=name, type=meal_type)
        for ingredient in ingredients:
            if (ingredient[0] != ""):
                ing_name = ingredient[0]
                ing_quantity = ingredient[1]
                ing_unit = ingredient[2]
                new_ingredient = Ingredient.objects.create(meal=new_meal, name=ing_name, quantity=ing_quantity, unit=ing_unit)
                new_ingredient.save()
                
        return JsonResponse({'status': '201'})
    else:
        return JsonResponse({'error': '405 Method not allowed'})

@csrf_exempt
def meal_list(request):
    if (request.method == 'GET'):
        meals = Meal.objects.all()
        serialized = MealSerializer(meals, many=True)

    return JsonResponse(serialized.data, safe=False)

@csrf_exempt
def registration(request):
    if (request.method == 'POST'):
        data = json.loads(request.body)
        username = data['userName']
        password = data['password']
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        username_exist = False

    try:
        # Check is this user already exists
        User.objects.get(username=username)
        username_exist = True
    except Exception as e:
        # If it doesn't exist, log that it is a new user
        print(f"Error: {e}")

    # If it is a new user
    if not username_exist:
        # Create new user in auth_user table
        user = User.objects.create_user(username=username,
                                        first_name=first_name,
                                        last_name=last_name,
                                        password=password,
                                        email=email)
        # Login user and redirect to the list page
        login(request, user)
        data = {'userName': username, 'status': 'Authenticated'}
        return JsonResponse(data)
    else:
        data = {'userName': username, 'error': 'Already Registered'}
        return JsonResponse(data)
    

@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)

def logout_request(request):
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)