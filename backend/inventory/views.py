from django.db.models import Sum
from rest_framework import generics
from .models import Inventory, Products, Location, Emergency, Medication
from .serializer import InventorySerializer, ProductsSerializer, LocationSerializer, EmergencySerializer, MedicationSerializer

# Create a product list with updated quantity in stock data (calculated from inventory)
class ProductsList(generics.ListCreateAPIView):
    serializer_class = ProductsSerializer
    # Use get_queryset to circumvent cache issues
    def get_queryset(self):
        # Update all quantity in stock entries on product list load
        stock = Inventory.objects.values('product').annotate(quantity=Sum('quantity')).order_by('product')
        # Before updating set all quantity_stock to zero, in case a product has no inventory -> thus wouldn't be updated 
        Products.objects.all().update(quantity_stock=0)
        for data in stock:
            Products.objects.filter(id=data['product']).update(quantity_stock=data['quantity'])
        return Products.objects.all()

# Get, update and delete a specific product type
class ProductsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

# Create a complete inventory items list
class InventoryList(generics.ListCreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

# Create an inventory items list filtered by product type
class InventoryListById(generics.ListCreateAPIView):
    serializer_class = InventorySerializer
    def get_queryset(self):
        id = self.kwargs['pk']
        return Inventory.objects.filter(product=id)

# Get, update and delete a specific inventory item
class InventoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer



# Create the initial Medi Kit location (one-time use)
class MediKitLocation(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

# Get and update the Medi Kit location
class MediKitLocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer    



# Create a list holding all emergency cases
class EmergencyList(generics.ListCreateAPIView):
    queryset = Emergency.objects.all()
    serializer_class = EmergencySerializer

# Get and update a specific emergency case
class EmergencyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Emergency.objects.all()
    serializer_class = EmergencySerializer

# Create a list holding medication for all emergency cases
class MedicationList(generics.ListCreateAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

# Get, update and delete a specific emergency case medication
class MedicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

# Create a list holding specific medication for one emergency case
class MedicationListById(generics.ListCreateAPIView):
    serializer_class = MedicationSerializer
    def get_queryset(self):
        id = self.kwargs['pk']
        return Medication.objects.filter(emergency=id)