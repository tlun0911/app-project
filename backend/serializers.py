from rest_framework import serializers
from .models import Meal

class MealSerializer(serializers.ModelSerializer):

    # Create a Meta class
    class Meta:
        model = Meal
        fields = ('name', 'type', 'id')