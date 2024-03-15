from rest_framework import serializers
from .models import Inventory, Products, Location, Emergency, Medication

''' Serializers allow complex data such as querysets and model instances 
    to be converted to native Python datatypes that can then be easily 
    rendered into JSON, XML or other content types 
'''

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id', 'name', 'quantity_min', 'quantity_max', 'quantity_stock')

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('id', 'product', 'quantity', 'expiration_date')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id', 'location')

class EmergencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Emergency
        fields = ('id', 'title', 'default', 'custom')

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ('id', 'emergency', 'medicine')      