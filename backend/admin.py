from django.contrib import admin
from .models import Meal, Ingredient


class IngredientInline(admin.StackedInline):
    model = Ingredient

class MealAdmin(admin.ModelAdmin):
    inlines = [IngredientInline]


admin.site.register(Meal, MealAdmin)
