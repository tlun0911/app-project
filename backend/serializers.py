from rest_framework import serializers
from .models import Meal, Ingredient

class MealSerializer(serializers.ModelSerializer):

    # Create a Meta class
    class Meta:
        model = Meal
        fields = ('name', 'type', 'id')


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ['name', 'quantity', 'unit']