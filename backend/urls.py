from django.contrib import admin
from django.urls import path
from . import views

app_name='backend'
urlpatterns = [

    path(route='register/', view=views.registration, name='registration'),
    path(route='login/', view=views.login_user, name='login'),
    path(route='logout/', view=views.logout_request, name='logout'),
    path(route='meal_list/', view=views.meal_list, name='meal_list'),
    path(route='submit_meals/', view=views.submit_meals, name='submit_meals'),
    path(route='meal/<int:meal_id>', view=views.meal_detail, name='meal_detail'),
    
]