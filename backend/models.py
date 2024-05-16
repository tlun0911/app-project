from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Meal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    MEAL_CHOICES = [
        ('BREAKFAST', 'Breakfast'),
        ('LUNCH', 'Lunch'),
        ('DINNER', 'Dinner'),
        ('SNACK', 'Snack'),
    ]
    type = models.CharField(choices=MEAL_CHOICES, max_length=100, default='DINNER')
    created = models.DateTimeField(auto_now=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __self__(self):
        return self.name
    

class Ingredient(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=100, blank=True)
    UNIT_CHOICES = [
        ('PKG', 'pkg'),
        ('LB', 'lb'),
        ('OZ', 'oz'),
        ('GAL', 'gal'),
        ('UNITS', 'units'),
    ]
    unit = models.CharField(max_length=50, choices=UNIT_CHOICES, default='UNITS')

    def __self__(self):
        return self.name

 
